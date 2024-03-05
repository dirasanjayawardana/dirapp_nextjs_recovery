import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb'
import Note from '../../../../models/note'

export async function DELETE(req, { params }) {
    const origin = req.headers.get('origin');

    const { id } = params;
    await connectMongoDB();
    await Note.findByIdAndDelete(id);
    return NextResponse.json({ message: "Note Deleted" }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
            'Content-Type': 'application/json',
        }
    })
}

export async function PUT(req, { params }) {
    const origin = req.headers.get('origin');

    const { id } = params;
    const { newTitle: title, newDescription: description } = await req.json();
    await connectMongoDB();
    await Note.findByIdAndUpdate(id, { title, description });
    return NextResponse.json({ message: "Note Updated" }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
        }
    })
}

export async function GET(req, { params }) {
    const origin = req.headers.get('origin');

    const { id } = params;
    await connectMongoDB();
    const messages = await Note.find({ userId: id });
    return NextResponse.json({ messages }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
        }
    })
}

