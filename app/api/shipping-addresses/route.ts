import { PrismaClient } from "@prisma/client";

export async function GET() {
  const prisma = new PrismaClient();

  const response = await prisma.shipping_addresses.findMany();
  const data = response.map((value) => {
    const int = typeof value.id === "bigint" ? Number(value.id).toString() : value.id;
    return {
      ...value,
      id: int,
    };
  });
  return Response.json({ data });
}
