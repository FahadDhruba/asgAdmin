import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function POST(request) {
    try {
        const userData = await request.json();

        // Validate required fields
        if (!userData.email || !userData.metadata) {
            return NextResponse.json({
                status: 'error',
                message: 'Email and metadata are required fields.',
            }, { status: 400 }); // Status code 400 for bad request
        }

        const client = await clientPromise;
        const db = client.db();
        const usersCollection = db.collection('users');

        // Check if a user with the given `email` exists
        const existingUser = await usersCollection.findOne({ email: userData.email });

        if (existingUser) {
            // User exists, update their metadata
            const updateResult = await usersCollection.updateOne(
                { email: userData.email },
                { $set: { metadata: userData.metadata } }
            );

            if (updateResult.modifiedCount === 0) {
                // No changes were made (metadata might be the same)
                return NextResponse.json({
                    status: 'success',
                    message: 'No changes detected. Metadata is already up to date.',
                    data: updateResult,
                }, { status: 200 });
            }

            return NextResponse.json({
                status: 'success',
                message: 'User metadata updated successfully.',
                data: updateResult,
            }, { status: 200 });
        } else {
            // User does not exist, insert user data
            const insertResult = await usersCollection.insertOne(userData);

            return NextResponse.json({
                status: 'success',
                message: 'User inserted successfully.',
                data: insertResult,
            }, { status: 201 });
        }
    } catch (error) {
        console.error('Error processing request:', error); // Log the error for debugging
        return NextResponse.json({
            status: 'error',
            message: 'An error occurred while processing the request.',
            error: error.message,
        }, { status: 500 });
    }
}