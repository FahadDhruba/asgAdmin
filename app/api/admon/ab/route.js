import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET(request) {
    // GET is to be used in getting active promocode data [array of json]
    try {
        const client = await clientPromise;
        const db = client.db();
        const bookDataCollection = db.collection('bookData');

        const books = await bookDataCollection.find().toArray();

        return NextResponse.json({
            status: 'success',
            message: 'All books fetched successfully',
            data: books
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
    }
}