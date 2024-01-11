import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest, res: NextResponse){
    const { name, username, email, address } = await req.json();

    try {
      await dbConnect();

      const newUser = new User({ name, username, email, address });
      await newUser.save();
      return NextResponse.json({ message: 'success' })
    } catch (err) {
      return NextResponse.json({ message: 'failure' })
    }
}
