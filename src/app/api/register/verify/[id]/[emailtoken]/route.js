import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../../libs/mongodb";
import User from "../../../../../../models/user";
import EmailToken from "../../../../../../models/emailToken";

export async function GET(req, { params }) {
    try {
        const origin = req.headers.get('origin');
        const { id, emailtoken } = params;

        await connectMongoDB();

        const user = await User.findOne({ _id: id });
        if (!user) return NextResponse.json({ message: 'Invalid link' }, { status: 400 });

        const emailToken = await EmailToken.findOne({
            userId: user._id,
            token: emailtoken,
        });
        if (!emailToken) return NextResponse.json({ message: 'Invalid link' }, { status: 400 });

        await User.updateOne({ _id: user._id }, { $set: { isVerified: true } });
        await EmailToken.findByIdAndDelete(emailToken._id);

        return NextResponse.json({ message: "Email verified successfully" }, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': origin || '*',
                'Content-Type': 'application/json',
            }
        })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}