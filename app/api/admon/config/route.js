import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const configDataCollection = db.collection('configData');

        const configData = await configDataCollection.find({}).toArray();

        return NextResponse.json({
            status: 'success',
            message: 'Config data fetched successfully',
            data: configData
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating book', error }, { status: 500 });
    }
}
