import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request) {
    // GET is to be used in getting active promocode data [array of json]
    try {
        const client = await clientPromise;
        const db = client.db();
        const couponCodeCollection = db.collection('couponCode');
        const tranxDataCollection = db.collection('tranxData');

        let allCoup = await tranxDataCollection.find({}, {
            projection: {
                promoCode: 1, _id: 0
            }
        }).toArray();

        let allPromo = allCoup.map(item => item.promoCode.toLowerCase());

        let promoCodes = await couponCodeCollection.find({ status: 'active' }).toArray();

        promoCodes.forEach(promo => {
            let count = allPromo.filter(x => x === promo.code).length;
            promo.count = count;
        });

        return NextResponse.json({
            status: 'success',
            message: 'Promo codes fetched successfully',
            data: promoCodes
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching data', error }, { status: 500 });
    }
}

export async function POST(request) {
    // POST is to be used in creating Promo code
    try {
        let data = await request.json();

        const client = await clientPromise;
        const db = client.db();
        const couponCodeCollection = db.collection('couponCode');

        const insertResult = await couponCodeCollection.insertOne({ ...data, status: 'active' });

        const tranxDataCollection = db.collection('tranxData');

        let allCoup = await tranxDataCollection.find({}, {
            projection: {
                promoCode: 1, _id: 0
            }
        }).toArray();

        let allPromo = allCoup.map(item => item.promoCode.toLowerCase());

        let promoCodes = await couponCodeCollection.find({ status: 'active' }).toArray();

        promoCodes.forEach(promo => {
            let count = allPromo.filter(x => x === promo.code).length;
            promo.count = count;
        });


        return NextResponse.json({
            status: 'success',
            message: 'Promo code added successfully',
            data: promoCodes
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'An error occurred while processing the request.',
            error: error.message,
        }, { status: 500 });
    }
}

export async function DELETE(request) {
    // DELETE is to be used in disabling a Promo code
    try {
        const { id } = await request.json();

        const client = await clientPromise;
        const db = client.db();
        const couponCodeCollection = db.collection('couponCode');

        const updateResult = await couponCodeCollection.updateOne({ _id: new ObjectId(id) }, { $set: { status: 'disabled' } });

        const tranxDataCollection = db.collection('tranxData');

        let allCoup = await tranxDataCollection.find({}, {
            projection: {
                promoCode: 1, _id: 0
            }
        }).toArray();

        let allPromo = allCoup.map(item => item.promoCode.toLowerCase());

        let promoCodes = await couponCodeCollection.find({ status: 'active' }).toArray();

        promoCodes.forEach(promo => {
            let count = allPromo.filter(x => x === promo.code).length;
            promo.count = count;
        });


        return NextResponse.json({
            status: 'success',
            message: 'Promo code disabled successfully',
            data: promoCodes
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({
            status: 'error',
            message: 'An error occurred while processing the request.',
            error: error.message,
        }, { status: 500 });
    }
}