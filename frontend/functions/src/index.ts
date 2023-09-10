import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import * as express from 'express'
import * as bodyParser from "body-parser";
import {BunqApiContext} from "./BunqApiContext";
import {validateFirebaseIdToken} from "./validateFirebaseIdToken";

admin.initializeApp({
    databaseURL: "localhost:8080"
})


export const app = express()

const main = express()
main.use("/api/v1", app)
main.use(bodyParser.json())
main.use(bodyParser.urlencoded({ extended: false }));
app.use(validateFirebaseIdToken)

app.get("/users", async (req, res)  => {
    const sandboxKey = "sandbox_39949d0c10c82768dc69a8831754fa1c9333bde07f336d17e9c31122"
    const apiContext = new BunqApiContext(sandboxKey)
    const bunqConfig = await apiContext.create()
    await apiContext.ensureSessionActive()
    res.json(bunqConfig)
})

export const webApi = functions.https.onRequest(main);