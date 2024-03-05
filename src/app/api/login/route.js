import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import connectMongoDB from '../../../libs/mongodb'
import User from '../../../models/user'
import UserLog from '../../../models/userLog'

const tokenExpiration = "2h";

export async function POST(req) {
    const origin = req.headers.get('origin');
    const { email, password } = await req.json();

    await connectMongoDB();

    //------------ find email is exist and verified --------------//
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        await UserLog.create({
            name: "not found",
            email: email,
            role: "not found",
            isSuccess: false
        });
        return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    if (!(findUser.isVerified)) {
        await UserLog.create({
            name: "not verified",
            email: email,
            role: "not verified",
            isSuccess: false
        });
        return NextResponse.json({ message: 'User not verified' }, { status: 401 });
    }

    //----------- check password is mastch or not ------------//
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
        await UserLog.create({
            name: findUser.name,
            email: findUser.email,
            role: findUser.role,
            isSuccess: false
        });
        return NextResponse.json({ message: 'Wrong password' }, { status: 403 });
    }

    //------------------ add login log ---------------------//
    await UserLog.create({
        name: findUser.name,
        email: findUser.email,
        role: findUser.role,
        isSuccess: isMatch
    });

    //----------- parse data to be a token and send response to user ------------//
    const token = jwt.sign(
        {
            id: findUser._id,
            name: findUser.name,
            email: findUser.email,
            role: findUser.role,
            isVerified: findUser.isVerified,
            isConnected: isMatch
        },
        process.env.PRIVATE_KEY,
        { expiresIn: tokenExpiration }
    )

    //------ using cookie ------//
    const cookieValue = `Bearer ${token}`;
    const cookieName = 'token';

    const responseHeaders = {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
        'Content-Type': 'application/json',
        'Set-Cookie': `${cookieName}=${cookieValue}; Max-Age=${tokenExpiration}; Path=/`,
    };

    return NextResponse.json(
        {
            message: "Success",
            token: "Bearer " + token
        },
        {
            status: 200,
            headers: responseHeaders,
        }
    );
}





// //------ using cookie config more secure ------//
// const cookieValue = `Bearer ${token}`;
// const cookieName = 'token';

// const responseHeaders = {
//     'Access-Control-Allow-Origin': origin || '*',
//     'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE',
//     'Content-Type': 'application/json',
//     'Set-Cookie': `${cookieName}=${cookieValue}; HttpOnly; Max-Age=${tokenExpiration}; Path=/; Secure; SameSite=Strict`,
// };

// return NextResponse.json(
//     {
//         message: "Success",
//         token: "Bearer " + token
//     },
//     {
//         status: 200,
//         headers: responseHeaders,
//     }
// );