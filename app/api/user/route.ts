import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest, res: NextResponse){
  await dbConnect()
  try {
    const allUsers = await User.find({})
    return NextResponse.json({ status: 200, message: 'success', data: allUsers })
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'failure' })
  }
}
