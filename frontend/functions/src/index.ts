import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from "body-parser";
import {BunqApiContext} from "./BunqApiContext";
//import {validateFirebaseIdToken} from "./express/validateFirebaseIdToken";
import {ensureTokensAndSessionExists} from "./express/ensureTokensAndSessionExists";
import {ApiResponse} from "./model/ApiResponse";

admin.initializeApp({
    databaseURL: "localhost:8080"
})

const apiKey = "sandbox_39949d0c10c82768dc69a8831754fa1c9333bde07f336d17e9c31122"

export const app = express()
export const apiContext = new BunqApiContext(apiKey)
const main = express()
main.use("/api/bunq/v1", app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false }));
app.use(ensureTokensAndSessionExists)
//app.use(validateFirebaseIdToken)


function sendApiResponse<T>(res: express.Response, dto: ApiResponse<T>, messageIfDataUndefined?: string) {
    if(dto.error !== undefined) res.status(500).json(dto)
    if(dto.data !== undefined) res.status(200).json(dto)
    if(dto.data === undefined && dto.error === undefined) res.status(400).send(messageIfDataUndefined || "Something went wrong :(")
}

app.get("/account/:iban", async (req: express.Request<{ iban: string}>, res)  => {
    const response = await apiContext.account(req.params.iban)
    sendApiResponse(res, response, "No MonetaryAccount found")
})

app.get("/payments/:monetaryId", async (req: express.Request<{monetaryId: string}>, res) => {
    const response = await apiContext.payments(req.params.monetaryId)
    sendApiResponse(res, response)
})

export const bunqApi = functions.https.onRequest(main);