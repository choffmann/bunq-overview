import {SessionResponse} from "./model/SessionResponse";
import {MILLISECONDS_IN_SECOND} from "./BunqApiContext";

export class SessionContext {
    private readonly _token: string
    private readonly _expiryTime: Date
    private readonly _userId: number

    get token(): string {
        console.log("SessionContext._token", this._token)
        return this._token
    }

    get expiryTime(): Date {
        console.log("SessionContext._expiryTime", this._expiryTime)
        return this._expiryTime
    }

    get userId(): number {
        console.log("SessionContext._userId", this._userId)
        return this._userId
    }


    constructor(sessionResponse: SessionResponse) {
        console.log("SessionContext::sessionResponse", sessionResponse)
        this._token = sessionResponse.Token.token
        this._expiryTime = this.calculateExpiryTime(sessionResponse)
        this._userId = sessionResponse.UserPerson.id
    }

    private calculateExpiryTime(sessionResponse: SessionResponse) {
        const expiryTime = new Date()
        const sessionTimeoutMilliseconds = sessionResponse.UserPerson.session_timeout * MILLISECONDS_IN_SECOND
        expiryTime.setTime(expiryTime.getTime() + sessionTimeoutMilliseconds)
        return expiryTime
    }
}