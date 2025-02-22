import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function POST(request) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const userCollection = db.collection('users');
        const tranxDataCollection = db.collection('tranxData');

        const { email } = await request.json();

        let user = await userCollection.findOne({ email }, {
            projection: {
                email: 1,
                name: 1,
                uid: 1,
                _id: 0
            }
        });

        if (!user) {
            return NextResponse.json({
                status: 'error',
                message: 'User not found'
            }, { status: 404 });
        }

        const isPurchased = await tranxDataCollection.find({
            "email": user.email,
            "status": "VALID",
            "productArray": {
                $elemMatch: {
                    "bookId": "1121238"
                }
            }
        }).toArray();

        if (isPurchased.length < 1) {
            user.pur = "havent";
        }

        return NextResponse.json({
            status: 'success',
            message: 'User data fetched successfully',
            data: user
        }, { status: 200 });
    } catch (error) {
        console.error('Error fetching data:', error);
        return NextResponse.json({
            status: 'error',
            message: 'Error fetching data',
            error: error.message
        }, { status: 500 });
    }
}
