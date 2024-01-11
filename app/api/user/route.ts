import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import axios from 'axios';

export async function GET(req: NextRequest, res: NextResponse){
  await dbConnect()
  try {
    const dbUsers = await User.find({})

    const fetchApi = await axios.get('https://jsonplaceholder.typicode.com/users');
    const tpUsers = fetchApi.data;

    const allUsers = [...tpUsers, ...dbUsers];
    return NextResponse.json({ status: 200, message: 'success', data: allUsers })
  } catch (error) {
    return NextResponse.json({ status: 500, message: 'failure' })
  }
}
