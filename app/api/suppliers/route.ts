import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  const prisma = new PrismaClient();

  try {
    const response = await prisma.suppliers.findMany();
    const data = response.map((value) => {
      const int =
        typeof value.id === "bigint" ? Number(value.id.toString()) : value.id;
      return {
        ...value,
        id: int,
      };
    });
    return NextResponse.json({ data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 401 });
  } finally {
    prisma.$disconnect();
  }
}
