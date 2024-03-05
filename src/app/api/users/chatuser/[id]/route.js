import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb'
import User from '../../../../../models/user'

export async function GET(req, { params }) {
    const { id } = params;

    const origin = req.headers.get('origin');
    await connectMongoDB();
    const message = await User.findOne({ _id: id });

    const user = {
        id: message._id,
        name: message.name
    };
    return NextResponse.json({ message: user }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
        }
    })
}
