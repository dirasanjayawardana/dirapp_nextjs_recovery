import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import connectMongoDB from '../../../libs/mongodb'
import User from '../../../models/user'
import EmailToken from '../../../models/emailToken'
import sendEmail from '../../../utils/sendEmail'

export async function POST(req) {
    const origin = req.headers.get('origin')
    const { name, email, password } = await req.json();

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!name || !email || !password || email.includes(" ") || password.includes(" ")) {
        return new NextResponse('Missing fields', { status: 400 });

    } else {
        await connectMongoDB();

        const findEmail = await User.findOne({ email: email });

        if (findEmail) {
            return new NextResponse('Email already use', { status: 400 })

        } else {
            const user = await User.create({
                name,
                email,
                password: hashedPassword,
                role: "USER",
                isVerified: false
            });

            const emailToken = await new EmailToken({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();

            const url = `https://dirapp.vercel.app/register/verify/${user.id}/${emailToken.token}`;
            await sendEmail(user.email, "DirApp - Verify Email", `Click the link below to verify your account on DirApp - ${url}`);

            return NextResponse.json({ message: "success" }, {
                status: 201,
                headers: {
                    'Access-Control-Allow-Origin': origin || '*',
                    'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
                    'Content-Type': 'application/json',
                }
            });
        }
    }
}