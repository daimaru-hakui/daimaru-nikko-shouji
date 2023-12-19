import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number; }; }
) {
  const prisma = new PrismaClient();
  const res = await prisma.shippingAddresses.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if(!res) return
  const data = {
    ...res,
    id:bigintToIntHandler(Number(res.id))
  };
  return NextResponse.json(data, { status: 200 });
}
