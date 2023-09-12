import {FirestoreDataConverter, Timestamp} from "firebase-admin/firestore";
import {MILLISECONDS_IN_SECOND} from "../../BunqApiContext";

export interface BunqTokens {
    privateKey: string
    publicKey: string
    installationToken: string
    deviceId: number
}

export interface BunqSession {
    sessionToken: string
    userId: number,
    expiryTime: Date
}

export interface BunqTokensEntity extends BunqTokens {
}

export interface BunqSessionEntity {
    sessionToken: string
    userId: number,
    expiryTime: Timestamp
}

export const tokensConverter: FirestoreDataConverter<BunqTokens> = {
    toFirestore({privateKey, publicKey, installationToken, deviceId}: BunqTokens): BunqTokensEntity {
        return {privateKey, publicKey, installationToken, deviceId};
    },
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): BunqTokens {
        const {privateKey, publicKey, installationToken, deviceId} = snapshot.data() as BunqTokensEntity
        return {privateKey, publicKey, installationToken, deviceId}
    }
}

export const sessionConverter: FirestoreDataConverter<BunqSession> = {
    toFirestore({sessionToken, userId, expiryTime}: BunqSession): BunqSessionEntity {
        return {sessionToken, userId, expiryTime: Timestamp.fromDate(expiryTime)}
    },
    fromFirestore(snapshot: FirebaseFirestore.QueryDocumentSnapshot): BunqSession {
        const {sessionToken, userId, expiryTime} = snapshot.data() as BunqSessionEntity
        return {sessionToken, userId, expiryTime: new Date(expiryTime.seconds * MILLISECONDS_IN_SECOND)}
    }
}