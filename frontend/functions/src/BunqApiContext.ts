import {
    BunqSession,
    BunqTokens,
    sessionConverter,
    tokensConverter
} from "./model/entity";
import * as crypto from "crypto"
import {BunqConfigRepository} from "./BunqConfigRepository";
import * as functions from 'firebase-functions'
import {InstallationResponse} from "./model/InstallationResponse";
import {DeviceServerResponse} from "./model/DeviceServerResponse";
import {BunqApiResponse, ErrorResponse} from "./model/BunqApiResponse";
import {Id, SessionResponse, Token, UserPerson} from "./model/SessionResponse";
import {SessionContext} from "./SessionContext";
import MonetaryAccountBank from "model-api-client/bunq/MonetaryAccountDto";
import {Payment}  from "model-api-client/bunq/Payment";
import {ApiResponse} from "./model/ApiResponse";

export const MILLISECONDS_IN_SECOND = 1000
const API_URL = "https://public-api.sandbox.bunq.com/v1"
const TIME_TO_SESSION_EXPIRY_MINIMUM_SECONDS = 30

const defaultBunqTokens: BunqTokens = {
    privateKey: "",
    publicKey: "",
    installationToken: "",
    deviceId: 0,
}

const defaultBunqSession: BunqSession = {
    sessionToken: "",
    userId: 0,
    expiryTime: new Date()
}

const defaultHeader = {
    "X-Bunq-Language": "de_DE",
    "X-Bunq-Region": "de_DE",
    "X-Bunq-Geolocation": "0 0 0 0 000",
    "User-Agent": "BunqOverviewApp",
    "Content-Type": "application/json",
    "Cache-Control": "no-cache"
}

export class BunqApiContext {
    protected apiKey: string
    protected tokensRepository: BunqConfigRepository<BunqTokens>
    protected sessionRepository: BunqConfigRepository<BunqSession>
    protected bunqConfig: BunqTokens
    protected bunqSession: BunqSession

    constructor(apiKey: string) {
        this.apiKey = apiKey
        this.bunqConfig = defaultBunqTokens
        this.bunqSession = defaultBunqSession
        this.tokensRepository = new BunqConfigRepository("tokens", tokensConverter)
        this.sessionRepository = new BunqConfigRepository("session", sessionConverter)
    }

    async create() {
        const authenticated = await this.tokensExist()
        authenticated ? await this.restore() : await this.authenticate()
        return this.bunqConfig
    }

    async restore() {
        await this.restoreTokensFromDB()
        await this.restoreSessionFromDB()
    }

    private async restoreTokensFromDB() {
        await this.tokensRepository.get().then(data => {
            this.bunqConfig = data.data() || defaultBunqTokens
        })
    }

    private async restoreSessionFromDB() {
        await this.sessionRepository.get().then(data => {
            this.bunqSession = data.data() || defaultBunqSession
            console.log("restoreSessionFromDB", this.bunqSession)
        })
    }

    async authenticate() {
        functions.logger.info("Starting BUNQ authentication")
        await this.crypto()
            .then(_ => this.installation())
            .then(_ => this.device())
            .then(_ => this.tokensRepository.save(this.bunqConfig))
        return this.bunqConfig
    }

    private async tokensExist() {
        const response = await this.tokensRepository.get()
        return response.exists
    }

    async ensureSessionActive() {
        const sessionIsActive = await this.isSessionActive()
        if (!sessionIsActive) {
            console.log("Session is not active, reset the session")
            await this.resetSession()
        } else {
            console.log("Session is active, no reset needed")
        }
    }

    private async isSessionActive() {
        await this.restoreSessionFromDB()
        if (this.bunqSession.expiryTime === undefined) return false
        else {
            const timeToSessionExpiryMilliseconds = this.bunqSession.expiryTime.getTime() - new Date().getTime()
            return (timeToSessionExpiryMilliseconds / MILLISECONDS_IN_SECOND) > TIME_TO_SESSION_EXPIRY_MINIMUM_SECONDS
        }
    }

    private async resetSession() {
        await this.session()
            .then(_ => {
                console.log("Save Session", this.bunqSession)
                this.sessionRepository.save(this.bunqSession)
            })
    }

    private async fetchData(path: string, options: RequestInit, callback: (data: BunqApiResponse) => void) {
        await fetch(API_URL + path, options)
            .then(res => res.json())
            .then(data => {
                functions.logger.info("Response from BUNQ api: " + JSON.stringify(data))
                callback(data)
            })
            .catch(error => functions.logger.error(error))
    }

    private async crypto() {
        functions.logger.info("Create private and public key")
        const {publicKey, privateKey} = crypto.generateKeyPairSync("rsa", {
            modulusLength: 2048,
            publicKeyEncoding: {
                type: "spki",
                format: "pem"
            }, privateKeyEncoding: {
                type: "pkcs8",
                format: "pem"
            }
        });
        this.bunqConfig = {...this.bunqConfig, publicKey, privateKey}
    }

    private async installation() {
        functions.logger.info("Request new installation on BUNQ")
        const options = {
            method: "POST", headers: {
                ...defaultHeader,
                "X-Bunq-Request-Id": String(Math.random() * 9),
            }, body: JSON.stringify({client_public_key: this.bunqConfig.publicKey})
        };
        await this.fetchData("/installation", options, (data => this.bunqConfig = {...this.bunqConfig, installationToken: (data.Response[1] as InstallationResponse).Token.token}));
    }

    private async device() {
        functions.logger.info("Register new device on BUNQ")
        const options = {
            method: "POST", headers: {
                ...defaultHeader,
                "X-Bunq-Client-Authentication": this.bunqConfig.installationToken
            }, body: JSON.stringify({
                description: "BunqOverviewApp", secret: this.apiKey, "permitted_ips": ["*"]
            })
        };
        await this.fetchData("/device-server", options, (data => this.bunqConfig = {...this.bunqConfig, deviceId: (data.Response[0] as DeviceServerResponse).Id.id}));
    }

    private async session() {
        const body = JSON.stringify({secret: this.apiKey});
        const sign = crypto.createSign("sha256");
        sign.update(body);
        const sig = sign.sign(this.bunqConfig.privateKey, "base64");
        const options = {
            method: "POST", headers: {
                ...defaultHeader,
                "X-Bunq-Client-Signature": sig,
                "X-Bunq-Client-Authentication": this.bunqConfig.installationToken
            }, body: body
        };
        await this.fetchData("/session-server", options, data => {
            const response: SessionResponse = {
                Id: (data.Response[0] as any).Id as Id,
                Token: (data.Response[1] as any).Token as Token,
                UserPerson: (data.Response[2] as any).UserPerson as UserPerson,
            }
            const sessionContext = new SessionContext(response)
            this.bunqSession = {
                sessionToken: sessionContext.token,
                userId: sessionContext.userId,
                expiryTime: sessionContext.expiryTime,
            }
        });
    }

    async account(iban: string): Promise<ApiResponse<MonetaryAccountBank>> {
        const options = {
            method: "GET", headers: {
                ...defaultHeader,
                "X-Bunq-Client-Authentication": this.bunqSession.sessionToken
            }
        };

        return await fetch(`${API_URL}/user/${this.bunqSession.userId}/monetary-account`, options)
            .then(res => res.json())
            .then((data: BunqApiResponse) => {
                if (data.Error !== undefined) throw data.Error
                const accountList = data.Response.map(value => (value as any).MonetaryAccountBank as MonetaryAccountBank)
                return {data: accountList.find(account => account.alias.filter(alias => alias.type === "IBAN" || alias.value === iban).length > 0)}
            })
            .catch((error: ErrorResponse) => ({error}))
    }

    async payments(monetaryId: string): Promise<ApiResponse<Payment[]>> {
        const countLimit = 150
        const options = {
            method: "GET", headers: {
                ...defaultHeader,
                "X-Bunq-Client-Authentication": this.bunqSession.sessionToken
            }
        };

        return await fetch(`${API_URL}/user/${this.bunqSession.userId}/monetary-account/${monetaryId}/payment?count=${countLimit}`, options)
            .then(res => res.json())
            .then((data: BunqApiResponse) => {
                if (data.Error !== undefined) throw data.Error
                const paymentList = data.Response.map(value => (value as any).Payment as Payment)
                return {data: paymentList}
            })
            .catch((error: ErrorResponse) => ({error}))
    }
}