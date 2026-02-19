import { prisma } from "@/lib/prisma";
import type { BunqTokens, BunqSession } from "./types";

export const tokensRepository = {
  async get(): Promise<BunqTokens | null> {
    const record = await prisma.bunqTokens.findUnique({ where: { id: 1 } });
    if (!record) return null;
    return {
      privateKey: record.privateKey,
      publicKey: record.publicKey,
      installationToken: record.installationToken,
      deviceId: record.deviceId,
    };
  },

  async save(tokens: BunqTokens): Promise<void> {
    await prisma.bunqTokens.upsert({
      where: { id: 1 },
      update: {
        privateKey: tokens.privateKey,
        publicKey: tokens.publicKey,
        installationToken: tokens.installationToken,
        deviceId: tokens.deviceId,
      },
      create: {
        id: 1,
        privateKey: tokens.privateKey,
        publicKey: tokens.publicKey,
        installationToken: tokens.installationToken,
        deviceId: tokens.deviceId,
      },
    });
  },

  async delete(): Promise<void> {
    await prisma.bunqTokens.deleteMany();
  },

  async exists(): Promise<boolean> {
    const count = await prisma.bunqTokens.count();
    return count > 0;
  },
};

export const sessionRepository = {
  async get(): Promise<BunqSession | null> {
    const record = await prisma.bunqSession.findUnique({ where: { id: 1 } });
    if (!record) return null;
    return {
      sessionToken: record.sessionToken,
      userId: record.userId,
      expiryTime: record.expiryTime,
    };
  },

  async save(session: BunqSession): Promise<void> {
    await prisma.bunqSession.upsert({
      where: { id: 1 },
      update: {
        sessionToken: session.sessionToken,
        userId: session.userId,
        expiryTime: session.expiryTime,
      },
      create: {
        id: 1,
        sessionToken: session.sessionToken,
        userId: session.userId,
        expiryTime: session.expiryTime,
      },
    });
  },

  async delete(): Promise<void> {
    await prisma.bunqSession.deleteMany();
  },
};
