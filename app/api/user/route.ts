import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import axios from 'axios';

export async function GET(req: NextRequest, res: NextResponse){
  await dbConnect()
  try {
    const fetchApi = await axios.get('https://jsonplaceholder.typicode.com/users');
    const tpUsers = fetchApi.data;

    for (const user of tpUsers) {
      const existingUser = await User.findOne({ external_id: user.id });
      if (!existingUser) {
        try {
          const newUser = new User({ external_id: user.id, ...user });
          await newUser.save();
        } catch (error) {
          console.error(error);
        }
      }
    }

    const allUsers = await User.find({});
    return NextResponse.json({ status: 200, message: 'success', data: allUsers })
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'failure' })
  }
}
