import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from "body-parser";
import {BunqApiContext} from "./BunqApiContext";
import {validateFirebaseIdToken} from "./express/validateFirebaseIdToken";
import {ensureTokensAndSessionExists} from "./express/ensureTokensAndSessionExists";
import {ApiResponse} from "./model/ApiResponse";

const develop = false
const apiKey = "sandbox_39949d0c10c82768dc69a8831754fa1c9333bde07f336d17e9c31122"
const iban = "NL47BUNQ2061979629"

admin.initializeApp(develop ? {databaseURL: "localhost:8080"} : functions.config().firestore)

export const app = express()
export const apiContext = new BunqApiContext(apiKey)
const main = express()
main.use("/api/v1", app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({extended: false}));
develop ? app.use(cors({origin: "*"})) : app.use(cors({origin: true}))
app.use(ensureTokensAndSessionExists)
app.use(validateFirebaseIdToken)


function sendApiResponse<T>(res: express.Response, dto: ApiResponse<T>, messageIfDataUndefined?: string) {
    if (dto.error !== undefined) res.status(500).json(dto)
    if (dto.data !== undefined) res.status(200).json(dto)
    if (dto.data === undefined && dto.error === undefined) res.status(400).send(messageIfDataUndefined || "Something went wrong :(")
}

app.post("/account", async (req, res) => {
    const response = await apiContext.account(iban)
    sendApiResponse(res, response, "No MonetaryAccount found")
})

app.post("/payments/:monetaryId", async (req: express.Request<{ monetaryId: string }>, res) => {
    const response = await apiContext.payments(req.params.monetaryId)
    sendApiResponse(res, response)
})

export const bunq = functions.https.onRequest(main);