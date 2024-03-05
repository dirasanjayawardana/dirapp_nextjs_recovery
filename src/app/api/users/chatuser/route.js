import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../../../libs/mongodb'
import User from '../../../../models/user'

export async function GET(req) {

    const origin = req.headers.get('origin');
    await connectMongoDB();
    const messages = await User.find();

    // tidak menyertakan password dalam response
    const users = messages.map(user => ({
        id: user._id,
        name: user.name 
    }));
    return NextResponse.json({ messages: users }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
        }
    })
}
