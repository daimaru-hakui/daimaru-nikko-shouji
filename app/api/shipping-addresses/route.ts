import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();

  const res = await prisma.shipping_addresses.findMany();
  const data = res.map((value) => {
    return {
      ...value,
      id: bigintToIntHandler(value.id)
    };
  });
  return Response.json({ data });
}
