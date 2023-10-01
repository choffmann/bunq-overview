import {Response} from 'firebase-functions'
import {initializeApp} from "firebase-admin/app";
import {onRequest} from "firebase-functions/v2/https";
import {defineSecret, defineString} from "firebase-functions/params";
import {BunqApiContext} from "./BunqApiContext";
import {ApiResponse} from "./model/ApiResponse";
import {ErrorResponse} from "./model/BunqApiResponse";
import {SecretParam} from "firebase-functions/lib/params/types";
import {validateFirebaseIdToken} from "./express/validateFirebaseIdToken";

const sandboxApiKey = "sandbox_39949d0c10c82768dc69a8831754fa1c9333bde07f336d17e9c31122"
const apiKey = defineSecret("API_KEY")
const environment = defineString("ENVIRONMENT");
const iban = defineString("IBAN")


initializeApp()

const apiContext = new BunqApiContext()

const defaultErrorMessage: ErrorResponse = {
    error_description: "Something went wrong",
    error_description_translated: "Etwas ist schief gegangen"
}

async function ensureTokensAndSessionExists() {
    await apiContext.create()
    await apiContext.ensureSessionActive()
}

async function initOnRequest(apiKey: SecretParam) {
    apiContext.apiKey = environment.equals("dev").thenElse(sandboxApiKey, apiKey.value()).value()
    apiContext.apiUrl = environment.equals("dev").thenElse("https://public-api.sandbox.bunq.com/v1", "https://api.bunq.com/v1").value()
    await ensureTokensAndSessionExists()
}

function sendApiResponse<T>(res: Response, dto: ApiResponse<T>, defaultMessage?: string) {
    if (dto.error !== undefined) res.status(500).json(dto)
    if (dto.data !== undefined) res.status(200).json(dto)
    if (dto.data === undefined && dto.error === undefined) res.status(400).send(defaultMessage || defaultErrorMessage)
}

exports.bunqAccount = onRequest({cors: true, secrets: [apiKey]}, async (req, res) => {
    await validateFirebaseIdToken(req, res)
    await initOnRequest(apiKey)
    apiContext.account(iban.value())
        .then(response => sendApiResponse(res, response, "No MonetaryAccount found"))
})

exports.bunqPayments = onRequest({cors: true, secrets: [apiKey]}, async (req, res) => {
    await validateFirebaseIdToken(req, res)
    await initOnRequest(apiKey)
    apiContext.payments(req.body.data["monetaryId"])
        .then(response => sendApiResponse(res, response))
})