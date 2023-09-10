import {Pagination} from "model-api-client/bunq/Pagination";

export interface BunqApiResponse {
    Response: object[]
    Error?: ErrorResponse
    Pagination?: Pagination
}

export interface ErrorResponse {
    error_description: string,
    error_description_translated: string
}