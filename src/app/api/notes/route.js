import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb'
import Note from '../../../models/note'

export async function POST(req) {
    const origin = req.headers.get('origin')
    const { title, userId, description } = await req.json();
    await connectMongoDB();
    await Note.create({ title, userId, description });
    return NextResponse.json({ message: "Note Created" }, {
        status: 201,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
            'Content-Type': 'application/json',
        }
    });
}

// // Get All Data Note // //

// export async function GET(req) {
//     const origin = req.headers.get('origin')
    
//     await connectMongoDB();
//     const messages = await Note.find();
//     return NextResponse.json({ messages }, {
//         headers: {
//             'Access-Control-Allow-Origin': origin || '*',
//             'Content-Type': 'application/json',
//         }
//     })
// }


// untuk request yang menggunakan id, berikut alternatif menggunakan serachParams dan tidak menggunakan route /id

// export async function DELETE(req) {
//     const id = req.nextUrl.searchParams.get("id");
//     await connectMongoDB();
//     await Note.findByIdAndDelete(id);
//     return NextResponse.json({ message: "Note Deleted" }, { status: 200 })
// }