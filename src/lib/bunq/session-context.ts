import type { SessionResponse, BunqSession } from "./types";

const MILLISECONDS_IN_SECOND = 1000;

export function createSessionFromResponse(response: SessionResponse): BunqSession {
  const expiryTime = new Date();
  const sessionTimeoutMs = response.UserPerson.session_timeout * MILLISECONDS_IN_SECOND;
  expiryTime.setTime(expiryTime.getTime() + sessionTimeoutMs);

  return {
    sessionToken: response.Token.token,
    userId: response.UserPerson.id,
    expiryTime,
  };
}
