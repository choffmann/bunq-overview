import {Response} from 'firebase-functions'
import {initializeApp} from "firebase-admin/app";
import {onRequest} from "firebase-functions/v2/https";
import {defineSecret, defineString} from "firebase-functions/params";
import {BunqApiContext} from "./BunqApiContext";
import {ApiResponse} from "./model/ApiResponse";
import {ErrorResponse} from "./model/BunqApiResponse";

const apiKey = defineSecret("API_KEY")
const apiUrl = process.env.API_URL
const environment = defineString("ENVIRONMENT");
const iban = defineString("IBAN")
const develop = environment.equals("dev")

initializeApp(develop && {databaseURL: "localhost:8080"})

const apiContext = new BunqApiContext(apiUrl)

const defaultErrorMessage: ErrorResponse = {
    error_description: "Something went wrong",
    error_description_translated: "Etwas ist schief gegangen"
}

async function ensureTokensAndSessionExists() {
    await apiContext.create()
    await apiContext.ensureSessionActive()
}

function sendApiResponse<T>(res: Response, dto: ApiResponse<T>, defaultMessage?: string) {
    if (dto.error !== undefined) res.status(500).json(dto)
    if (dto.data !== undefined) res.status(200).json(dto)
    if (dto.data === undefined && dto.error === undefined) res.status(400).send(defaultMessage || defaultErrorMessage)
}

exports.bunqAccount = onRequest({cors: true, secrets: [apiKey]}, async (req, res) => {
    apiContext.apiKey = apiKey.value()
    await ensureTokensAndSessionExists()
    apiContext.account(iban.value())
        .then(response => sendApiResponse(res, response, "No MonetaryAccount found"))
})

exports.bunqPayments = onRequest({cors: true, secrets: [apiKey]}, async (req, res) => {
    apiContext.apiKey = apiKey.value()
    await ensureTokensAndSessionExists()
    apiContext.payments(req.body.data["monetaryId"])
        .then(response => sendApiResponse(res, response))
})