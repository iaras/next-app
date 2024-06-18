import { PrismaClient, Auctions } from "@prisma/client";

const prisma = new PrismaClient()

export default async function handle(req, res) {
  const auction = await prisma.auctions.findFirst()
  res.json(auction)
  console.log(auction)
}