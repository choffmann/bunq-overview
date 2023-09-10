import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from "body-parser";
import {BunqApiContext} from "./BunqApiContext";
//import {validateFirebaseIdToken} from "./express/validateFirebaseIdToken";
import {ensureTokensAndSessionExists} from "./express/ensureTokensAndSessionExists";

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

app.get("/account", async (req, res)  => {
    const monetaryAccount = await apiContext.account("NL47BUNQ2061979629")
    console.log("Get Monetary account in index", monetaryAccount)
    monetaryAccount !== undefined ?
        res.status(200).json(monetaryAccount) :
        res.status(404).send("No MonetaryAccount found")
})

export const bunqApi = functions.https.onRequest(main);