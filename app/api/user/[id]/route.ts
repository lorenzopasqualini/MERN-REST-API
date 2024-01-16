import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";

export async function GET(req: NextRequest, res: NextResponse) {
  await dbConnect();

  try {
    const userId = req.nextUrl.pathname.replace('/api/user/', '')
    const user = await User.findOne({ external_id: userId });
    if (user) {
      return NextResponse.json({ status: 200, success: true, data: user });
    } else {
      return NextResponse.json({ status: 404, success: false, message: 'User not found' });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, success: false });
  }
}

export async function PUT(req: NextRequest, res: NextResponse) {
    await dbConnect();

    const { name, username, email, address } = await req.json();

    try {
      const userId = req.nextUrl.pathname.replace('/api/user/', '')      

      const updateUser = await User.findOneAndUpdate({ external_id: userId }, { $set: { name, username, email, address } }, {
          new: true,
          runValidators: true,
        }
      );
      
      return NextResponse.json({ status: 200, success: true, data: updateUser });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ status: 500, success: false });
    }
}
