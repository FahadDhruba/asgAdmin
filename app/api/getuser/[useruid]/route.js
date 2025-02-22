import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

const HTTP_STATUS = {
    OK: 200,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

export async function GET(request, { params }) {
    try {

        const { useruid } = await params;
        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ uid: useruid });

        return NextResponse.json(
            {
                status: 'success',
                message: 'User data retrieved successfully.',
                data: user,
            },
            { status: HTTP_STATUS.OK }
        );
    } catch (error) {
        console.error('Error retrieving book data:', error);
        return NextResponse.json(
            {
                status: 'error',
                message: 'An error occurred while retrieving book data.',
                error: error.message,
            },
            { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
        );
    }
}