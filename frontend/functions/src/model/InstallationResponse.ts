export interface InstallationResponse {
    Id: { id: number }
    Token: {
        id: number
        created: string
        updated: string
        token: string
    }
    ServerPublicKey: { server_public_key: string }
}