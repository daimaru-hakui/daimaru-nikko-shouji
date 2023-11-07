import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const prisma = new PrismaClient();

  const getUser = async () => {
    const data = await prisma.users.findUnique({
      where: {
        id,
      },
    });
    return data;
  };
  try {
    const data = await getUser();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  } finally {
    prisma.$disconnect()
  }
}
