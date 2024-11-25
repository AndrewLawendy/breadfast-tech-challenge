import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

export async function GET() {
  const cart = await redis.get("cart");
  return NextResponse.json(cart || []);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await redis.set("cart", body, { ex: 24 * 3600 }); // Expires in 24 hour
  return NextResponse.json({ success: true });
}
