import { NextResponse } from 'next/server';
import connectMongoDB from '../../../../libs/mongodb'
import Task from '../../../../models/task'

export async function DELETE(req, { params }) {
    const origin = req.headers.get('origin');

    const { id } = params;
    await connectMongoDB();
    await Task.findByIdAndDelete(id);
    return NextResponse.json({ message: "Task Deleted" }, {
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
    const { newTitle: title, newCategory: category, newDescription: description, newDeadline: deadline } = await req.json();
    await connectMongoDB();
    await Task.findByIdAndUpdate(id, { title, category, description, deadline });
    return NextResponse.json({ message: "Task Updated" }, {
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
    const messages = await Task.find({ userId: id });
    return NextResponse.json({ messages }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
        }
    })
}

