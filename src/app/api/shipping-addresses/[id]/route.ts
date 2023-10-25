import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

type ResponseData = {
  message: string;
};

export default async function GET(request: Request, { params }: { params: { id: number } }) {

  console.log(params.id)
  const prisma = new PrismaClient();
  const data = await prisma?.shipping_addresses.findUnique({ where: { id: params.id } });
  console.log(data)
  // if (!data) return;
  return new Response(JSON.stringify(data));
}