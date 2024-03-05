import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../../libs/mongodb'
import Note from '../../../../../models/note'

export async function GET(req, { params }) {
    const origin = req.headers.get('origin');

    const { id } = params;
    await connectMongoDB();
    const messages = await Note.findOne({ _id: id });
    return NextResponse.json({ messages }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
        }
    })
}