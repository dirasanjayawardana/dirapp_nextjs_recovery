import { NextResponse } from 'next/server';
import connectMongoDB from '../../../libs/mongodb'
import Task from '../../../models/task'

export async function POST(req) {
    const origin = req.headers.get('origin')
    const { title, userId, category, description, deadline } = await req.json();
    await connectMongoDB();
    await Task.create({ title, userId, category, description, deadline });
    return NextResponse.json({ message: "Task Created" }, {
        status: 201,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
            'Content-Type': 'application/json',
        }
    });
}


// // Get All Data /////////////////
// export async function GET(req) {
//     const origin = req.headers.get('origin')
    
//     await connectMongoDB();
//     const messages = await Task.find();
//     return NextResponse.json({ messages }, {
//         headers: {
//             'Access-Control-Allow-Origin': origin || '*',
//             'Content-Type': 'application/json',
//         }
//     })
// }