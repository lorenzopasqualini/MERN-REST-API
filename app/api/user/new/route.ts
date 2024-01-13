import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function POST(req: NextRequest, res: NextResponse){
    const { name, username, email, address } = await req.json();

    try {
      await dbConnect();
      const tpUserId = await User.findOne().sort({ external_id: -1 });

      const newUser = new User({
        name,
        username,
        email,
        address,
        external_id: tpUserId?.external_id + 1,
      });
      await newUser.save();
      return NextResponse.json({ message: 'success' })
    } catch (err) {
      return NextResponse.json({ message: 'failure' })
    }
}
