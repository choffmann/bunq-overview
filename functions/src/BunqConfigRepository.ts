import {getFirestore, Firestore, FirestoreDataConverter} from "firebase-admin/firestore";

export class BunqConfigRepository<T> {
    protected db: Firestore
    protected docName: string
    protected colName: string = "bunq.config"
    protected converter: FirestoreDataConverter<T>

    constructor(docName: string, converter: FirestoreDataConverter<T>) {
        this.db = getFirestore()
        this.docName = docName
        this.converter = converter
    }

    private dbQuery() {
        return this.db.collection(this.colName).doc(this.docName).withConverter(this.converter)
    }

    async save(entity: T) {
        console.log("Saving object", JSON.stringify(entity))
        await this.dbQuery().set(entity)
    }

    async get() {
        return this.dbQuery().get()
    }
}