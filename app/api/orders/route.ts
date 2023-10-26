import { PrismaClient } from "@prisma/client";

export async function POST(
  request: Request,
  { params }: { params: { id: number } }
) {
  const prisma = new PrismaClient();
  const response = await prisma.shipping_addresses.findUnique({
    where: {
      id:params.id,
    },
  });

  const data = {
    ...response,
    id:
      typeof response?.id === "bigint" ? response.id.toString() : response?.id,
  };
  return Response.json({ data });
}