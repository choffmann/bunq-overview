import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { BunqApiContext } from "@/lib/bunq/api-context";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const api = new BunqApiContext();
  await api.initialize();

  const result = await api.account(process.env.BUNQ_IBAN!);

  if (result.error) {
    return NextResponse.json(result, { status: 500 });
  }
  if (!result.data) {
    return NextResponse.json({ error: "No MonetaryAccount found" }, { status: 404 });
  }

  return NextResponse.json(result);
}
