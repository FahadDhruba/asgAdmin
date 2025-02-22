import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(request) {
    try {
        const { email, _id } = await request.json();

        // Validate incoming data
        if (!email || !_id) {
            return NextResponse.json({ message: 'Email and _id are required' }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db();

        const prevPurchaseReqCollection = db.collection('prevPurchaseReq');
        const tranxDataCollection = db.collection('tranxData');

        const data = {
            name: email,
            email: email,
            phone: "XXXXXXXXXXX",
            promoCode: "Manual",
            amount: "Manual",
            fee: "0.00",
            charged_amount: "0.00",
            invoiceNumber: "Manual",
            paymentMode: "Manual",
            "card-type": "Manual",
            "card-number": "Manual",
            trxID: "Manual",
            date: new Date().toLocaleString(),
            status: "VALID",
            productArray: [
                {
                    _id: {
                        $oid: "67aa26ff32e45561467d00df"
                    },
                    bookId: "1121238",
                    cover: "https://i.postimg.cc/Mpf0fTWP/aa.jpg",
                    title: "Compressed Note | Version 2",
                    author: [
                        "Iftekhar Reemon",
                        "Numeri Sattar Apar"
                    ],
                    price: 399,
                    mainPrice: 500,
                    tryReadSome: [
                        "https://ds.rokomari.store/rokomari110/LookInside20190827/57c2cb128_216500-1.jpg",
                        "https://ds.rokomari.store/rokomari110/LookInside20190827/e3a2544f6_216500-2.jpg"
                    ],
                    type: "bundle"
                }
            ]
        };

        // Insert transaction data
        const insertResult = await tranxDataCollection.insertOne(data);
        if (!insertResult.acknowledged) {
            throw new Error('Failed to insert transaction data');
        }

        if (_id !== "ccv") {
            // Update previous purchase request status
            await prevPurchaseReqCollection.updateOne(
                {
                    email: email,
                    _id: new ObjectId(_id)
                },
                {
                    $set: {
                        status: "SOLVED"
                    }
                }
            );
        } else {
            await prevPurchaseReqCollection.updateOne(
                {
                    email: email,
                    status: "PENDING"
                },
                {
                    $set: {
                        status: "SOLVED"
                    }
                }
            );
        }



        // Return success response
        return NextResponse.json({ message: 'Access granted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error granting access:', error);
        return NextResponse.json({ message: 'Failed to grant access', error: error.message }, { status: 500 });
    }
}