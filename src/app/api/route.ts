//import { PrismaClient, Auctions } from "@prisma/client";
//import { NextResponse } from "next/server";
//
//const prisma = new PrismaClient()
//
//export async function GET() {
//  const auction = await prisma.auctions.findFirst()
//  console.log(auction)
//  return Response.json({auction})
//}

//export async function db () {
//  const auction = await prisma.auctions.findFirst()
//  console.log(auction)
//  return {props:{auction}}
//}
//db()
//  .then(async () => {
//    await prisma.$disconnect()
//  })
//  .catch(async (e) => {
//    console.error(e)
//    await prisma.$disconnect()
//    process.exit(1)
//  })