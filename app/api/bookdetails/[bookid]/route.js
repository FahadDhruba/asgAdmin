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
        const { bookid } = await params;

        const client = await clientPromise;
        const db = client.db();
        const bookDataCollection = db.collection('bookData');
        const purchaseLogCollection = db.collection('purchaseLog');

        const book = await bookDataCollection.findOne({ bookId: bookid });

        const purchaseLogArray = await purchaseLogCollection.find({ id: bookid }).toArray();

        book.tillNowSell = purchaseLogArray.length;

        return NextResponse.json(
            {
                status: 'success',
                message: 'Book data retrieved successfully.',
                data: book,
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