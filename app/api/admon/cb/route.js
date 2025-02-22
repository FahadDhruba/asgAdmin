import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { ObjectId } from 'mongodb';

function generateSixDigitRandomNumber() {
    return Math.floor(Math.random() * 900000) + 100000;
}

async function getConfigDataById(collection, id) {
    const data = await collection.findOne({ _id: new ObjectId(id) });
    return [data.engName, data.banName, data._id.toString()];
}

async function getChaptersData(collection, chapters) {
    return Promise.all(
        chapters.map(async (chapId) => {
            let chapBit = await collection.findOne({ _id: new ObjectId(chapId) });
            chapBit.id = chapBit._id.toString();
            let { _id, ...newchapBit } = chapBit;
            return newchapBit;
        })
    );
}

async function generateUniqueBookId(collection) {
    let bookId;
    let existingBook;
    do {
        bookId = generateSixDigitRandomNumber().toString();
        existingBook = await collection.findOne({ bookId });
    } while (existingBook);
    return bookId;
}

export async function POST(request) {
    try {
        const data = await request.json();
        const client = await clientPromise;
        const db = client.db();
        const booksCollection = db.collection('bookData');
        const bookBlobDataCollection = db.collection('bookBlobData');
        const configCollection = db.collection('configData');

        const AuthorsArr = data.authors.split(',').map((author) => author.trim());
        const levelArr = await getConfigDataById(configCollection, data.level);
        const categoryArr = await getConfigDataById(configCollection, data.category);
        const subjectArr = await getConfigDataById(configCollection, data.subject);
        const paperArr = await getConfigDataById(configCollection, data.paper);
        const chapArr = await getChaptersData(configCollection, data.chapters);

        const newBook = {
            bookId: await generateUniqueBookId(booksCollection),
            cover: data.cover,
            title: data.bookTitle,
            subjectId: subjectArr[2].toString(),
            paperId: paperArr[2].toString(),
            author: AuthorsArr,
            price: Number(data.price),
            mainPrice: data.mainPrice,
            tryReadSome: data.tryRead,
            levelId: levelArr[2].toString(),
            categoryId: categoryArr[2].toString(),
            category: categoryArr,
            level: levelArr,
            subject: subjectArr,
            paper: paperArr,
            chapter: chapArr,
            type: "book",
        };


        await booksCollection.insertOne(newBook);

        let blobData = {
            bookId: newBook.bookId,
            linka: data.bookCDNLink
        };

        await bookBlobDataCollection.insertOne(blobData);

        return NextResponse.json({
            status: 'success',
            message: 'Book created successfully',
            newBook
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: 'Error creating book', error }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        const data = await request.json();
        const client = await clientPromise;
        const db = client.db();
        const booksCollection = db.collection('bookData');
        const bookBlobDataCollection = db.collection('bookBlobData');
        const configCollection = db.collection('configData');

        const AuthorsArr = data.authors.split(',').map((author) => author.trim());
        const levelArr = await getConfigDataById(configCollection, data.level);
        const categoryArr = await getConfigDataById(configCollection, data.category);
        const subjectArr = await getConfigDataById(configCollection, data.subject);
        const paperArr = await getConfigDataById(configCollection, data.paper);
        const chapArr = await getChaptersData(configCollection, data.chapters);

        const updatedBook = {
            cover: data.cover,
            title: data.bookTitle,
            subjectId: subjectArr[2].toString(),
            paperId: paperArr[2].toString(),
            author: AuthorsArr,
            price: Number(data.price),
            mainPrice: data.mainPrice,
            tryReadSome: data.tryRead,
            levelId: levelArr[2].toString(),
            categoryId: categoryArr[2].toString(),
            category: categoryArr,
            level: levelArr,
            subject: subjectArr,
            paper: paperArr,
            chapter: chapArr,
            type: "book",
        };

        await booksCollection.updateOne({ bookId: data.bookId }, { $set: updatedBook });

        let blobData = {
            bookId: data.bookId,
            linka: data.bookCDNLink
        };

        await bookBlobDataCollection.updateOne({ bookId: data.bookId }, { $set: blobData });

        return NextResponse.json({
            status: 'success',
            message: 'Book updated successfully',
            updatedBook
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Error updating book', error }, { status: 500 });
    }
}


export async function GET(request) {
    try {
        const client = await clientPromise;
        const db = client.db();
        const booksCollection = db.collection('bookData');

        let books = await booksCollection.find({
            type: "book"
        }, {
            projection: {
                title: 1,
                cover: 1,
                bookId: 1,
                _id: 0
            }
        }).sort({
            categoryId: 1
        }).toArray();

        books.map((book) => {

            book.value = book.bookId;
            book.label = book.title;

        })

        return NextResponse.json({
            status: 'success',
            message: 'All book fetched successfully',
            data: books
        }, { status: 200 });
    } catch (error) {

        return NextResponse.json({
            status: 'error',
            message: 'Something Went Wrong',
            error
        }, { status: 200 });
    }
}