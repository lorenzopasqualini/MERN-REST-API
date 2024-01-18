import { NextRequest, NextResponse } from 'next/server';
import User from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import axios from 'axios';

// Este endpoint debe iniciar una sincronización de usuarios. Consumiendo la siguiente API pública https://jsonplaceholder.typicode.com/users se obtiene un listado de usuarios, estos, deberán ser almacenados en la base de datos siguiendo el esquema indicado al final de la prueba.

// El método deberá estar preparado para que, si el usuario no existe en la base de datos lo cree como nuevo, y si ya existe actualice sus datos.

export async function POST(req: NextRequest, res: NextResponse){
  await dbConnect()
  try {
    const body = await req.json();    
    console.log("API BODY", body);
    

    for (const user of body) {
      const existingUser = await User.findOne({ external_id: user.id });
      if (!existingUser) {
        try {
          const newUser = new User({ external_id: user.id, ...user });
          await newUser.save();
        } catch (error) {
          console.error(error);
        }
      } else {
        const isDataChanged = JSON.stringify(existingUser.toObject()) !== JSON.stringify(user);
        if (isDataChanged) {
          try {
            await User.findOneAndUpdate({ external_id: user.id }, user);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }

    const allUsers = await User.find({});
    return NextResponse.json({ status: 200, success: true, data: allUsers })
  } catch (error) {
    return NextResponse.json({ status: 500, success: false })
  }
}