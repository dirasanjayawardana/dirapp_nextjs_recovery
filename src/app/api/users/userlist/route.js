import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectMongoDB from '../../../../libs/mongodb'
import User from '../../../../models/user'

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
    const messages = await User.find();

    // tidak menyertakan password dalam response
    const users = messages.map(user => ({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }));
    return NextResponse.json({ messages: users }, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': origin || '*',
            'Content-Type': 'application/json',
        }
    })
}
