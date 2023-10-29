import { bigintToIntHandler } from "@/utils/functions";
import { PrismaClient } from "@prisma/client";

export async function GET(
  request: Request,
  { params }: { params: { id: number; }; }
) {
  const prisma = new PrismaClient();
  const res = await prisma.shipping_addresses.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if(!res) return
  const data = {
    ...res,
    id:bigintToIntHandler(res.id)
  };
  return Response.json({ data });
}
