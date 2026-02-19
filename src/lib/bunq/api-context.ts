import crypto from "crypto";
import { tokensRepository, sessionRepository } from "./config-repository";
import { createSessionFromResponse } from "./session-context";
import type {
  BunqTokens,
  BunqSession,
  BunqApiResponse,
  ApiResponse,
  InstallationResponse,
  DeviceServerResponse,
  SessionResponse,
  BunqErrorResponse,
} from "./types";
import type { MonetaryAccountBank } from "@/types/monetary-account";
import type { Payment } from "@/types/payment";

const MILLISECONDS_IN_SECOND = 1000;
const TIME_TO_SESSION_EXPIRY_MINIMUM_SECONDS = 30;

const DEFAULT_TOKENS: BunqTokens = {
  privateKey: "",
  publicKey: "",
  installationToken: "",
  deviceId: 0,
};

const DEFAULT_SESSION: BunqSession = {
  sessionToken: "",
  userId: 0,
  expiryTime: new Date(),
};

const DEFAULT_HEADERS = {
  "X-Bunq-Language": "de_DE",
  "X-Bunq-Region": "de_DE",
  "X-Bunq-Geolocation": "0 0 0 0 000",
  "User-Agent": "BunqOverviewApp",
  "Content-Type": "application/json",
  "Cache-Control": "no-cache",
};

export class BunqApiContext {
  private apiKey: string;
  private apiUrl: string;
  private tokens: BunqTokens = DEFAULT_TOKENS;
  private session: BunqSession = DEFAULT_SESSION;

  constructor() {
    this.apiKey = process.env.BUNQ_API_KEY!;
    this.apiUrl = process.env.BUNQ_API_URL!;
  }

  async initialize(): Promise<void> {
    const hasTokens = await tokensRepository.exists();
    if (hasTokens) {
      await this.restore();
    } else {
      await this.authenticate();
    }
    await this.ensureSessionActive();
  }

  private async restore(): Promise<void> {
    const tokens = await tokensRepository.get();
    this.tokens = tokens || DEFAULT_TOKENS;

    const session = await sessionRepository.get();
    this.session = session || DEFAULT_SESSION;
  }

  private async authenticate(): Promise<void> {
    console.log("Starting bunq authentication");
    this.generateKeyPair();
    await this.installation();
    await this.device();
    await tokensRepository.save(this.tokens);
  }

  private async ensureSessionActive(): Promise<void> {
    const session = await sessionRepository.get();
    if (!session || !session.expiryTime) {
      console.log("No session found, creating new one");
      await this.createSession();
      return;
    }

    const timeToExpiryMs = session.expiryTime.getTime() - Date.now();
    const isActive = timeToExpiryMs / MILLISECONDS_IN_SECOND > TIME_TO_SESSION_EXPIRY_MINIMUM_SECONDS;

    if (!isActive) {
      console.log("Session expired, creating new one");
      await this.createSession();
    } else {
      console.log("Session is active");
      this.session = session;
    }
  }

  private async createSession(): Promise<void> {
    await this.sessionRequest();
    await sessionRepository.save(this.session);
  }

  private sign(body: string): string {
    const sign = crypto.createSign("sha256");
    sign.update(body);
    return sign.sign(this.tokens.privateKey, "base64");
  }

  private async fetchBunq(path: string, options: RequestInit): Promise<BunqApiResponse> {
    const res = await fetch(this.apiUrl + path, options);
    const data: BunqApiResponse = await res.json();
    if (data.Error) {
      console.error(`bunq API error on ${path}:`, data.Error.error_description);
      throw new Error(`bunq API: ${data.Error.error_description}`);
    }
    return data;
  }

  private async fetchAuthenticated(path: string): Promise<BunqApiResponse> {
    const body = "";
    return this.fetchBunq(path, {
      method: "GET",
      headers: {
        ...DEFAULT_HEADERS,
        "X-Bunq-Client-Authentication": this.session.sessionToken,
        "X-Bunq-Client-Signature": this.sign(body),
      },
    });
  }

  private generateKeyPair(): void {
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
      modulusLength: 2048,
      publicKeyEncoding: { type: "spki", format: "pem" },
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
    });
    this.tokens = { ...this.tokens, publicKey, privateKey };
  }

  private async installation(): Promise<void> {
    const data = await this.fetchBunq("/installation", {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS,
        "X-Bunq-Request-Id": String(Math.random() * 9),
      },
      body: JSON.stringify({ client_public_key: this.tokens.publicKey }),
    });
    const token = (data.Response[1] as InstallationResponse).Token.token;
    this.tokens = { ...this.tokens, installationToken: token };
  }

  private async device(): Promise<void> {
    const data = await this.fetchBunq("/device-server", {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS,
        "X-Bunq-Client-Authentication": this.tokens.installationToken,
      },
      body: JSON.stringify({
        description: "BunqOverviewApp",
        secret: this.apiKey,
        permitted_ips: ["*"],
      }),
    });
    const deviceId = (data.Response[0] as DeviceServerResponse).Id.id;
    this.tokens = { ...this.tokens, deviceId };
  }

  private async sessionRequest(): Promise<void> {
    const body = JSON.stringify({ secret: this.apiKey });

    const data = await this.fetchBunq("/session-server", {
      method: "POST",
      headers: {
        ...DEFAULT_HEADERS,
        "X-Bunq-Client-Signature": this.sign(body),
        "X-Bunq-Client-Authentication": this.tokens.installationToken,
      },
      body,
    });

    const response: SessionResponse = {
      Id: (data.Response[0] as any).Id,
      Token: (data.Response[1] as any).Token,
      UserPerson: (data.Response[2] as any).UserPerson,
    };
    this.session = createSessionFromResponse(response);
  }

  async account(iban: string): Promise<ApiResponse<MonetaryAccountBank>> {
    try {
      const data = await this.fetchAuthenticated(
        `/user/${this.session.userId}/monetary-account`
      );

      const accounts = data.Response
        .filter((v: any) => v.hasOwnProperty("MonetaryAccountBank"))
        .map((v: any) => v.MonetaryAccountBank as MonetaryAccountBank);

      const account = accounts.find((a) =>
        a.alias.some((alias) => alias.value === iban)
      );

      return { data: account };
    } catch (error) {
      console.error("Error fetching account:", error);
      return { error: error as BunqErrorResponse };
    }
  }

  async payments(monetaryId: string): Promise<ApiResponse<Payment[]>> {
    try {
      const data = await this.fetchAuthenticated(
        `/user/${this.session.userId}/monetary-account/${monetaryId}/payment?count=50`
      );

      const payments = data.Response.map((v: any) => v.Payment as Payment);
      return { data: payments };
    } catch (error) {
      console.error("Error fetching payments:", error);
      return { error: error as BunqErrorResponse };
    }
  }
}
