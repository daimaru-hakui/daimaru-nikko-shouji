import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();

  const res = await prisma.shipping_addresses.findMany();
  const data = res.map((value) => {
    return {
      ...value,
      id: bigintToIntHandler(Number(value.id))
    };
  });
  return NextResponse.json(data, { status: 200 });
}
