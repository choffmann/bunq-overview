import {ErrorResponse} from "./BunqApiResponse";

export interface ApiResponse<T> {
    data?: T
    error?: ErrorResponse
}