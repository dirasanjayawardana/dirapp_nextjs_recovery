import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../../../libs/mongodb';
import UserLog from '../../../../models/userLog';

export async function GET(req) {
    // Middleware Autentikasi
    const authorizationHeader = req.headers.get('Authorization');
    if (!authorizationHeader) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    const token = authorizationHeader.replace('Bearer ', '');
    try {
        // cek apakah token masih berlaku atau tidak dan secret key sesuai atau tidak
        const decoded = jwt.verify(token, process.env.PRIVATE_KEY); // Ganti dengan secret key yang sesuai

        // Pengecekan role sebagai admin dan ownner
        if (decoded.role !== process.env.ADMIN_ROLE) {
            return new NextResponse('Forbidden', { status: 403 });
        }
        if (decoded.id !== process.env.ADMIN_ID) {
            return new NextResponse('Forbidden', { status: 403 });
        }
    } catch (error) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    // Lanjutkan eksekusi response
    const origin = req.headers.get('origin');
    await connectMongoDB();
    const messages = await UserLog.find();
    return NextResponse.json({ messages }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
        }
    })
}