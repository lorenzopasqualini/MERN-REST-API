import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import toast from 'react-hot-toast';

export async function POST(req: NextRequest, res: NextResponse){
    const { name, username, email, address } = await req.json();

    try {
      await dbConnect();
      const tpUserId = await User.findOne().sort({ external_id: -1 });

      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
        return NextResponse.json({ message: 'Username already exists', success: false });
      }
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        return NextResponse.json({ message: 'Mail already exists', success: false });
      }

      const newUser = new User({
        name,
        username,
        email,
        address,
        external_id: tpUserId?.external_id + 1,
      });
      await newUser.save();

      return NextResponse.json({ status: 200, success: true })
    } catch (err) {
      return NextResponse.json({ status: 500, success: false })
    }
}
