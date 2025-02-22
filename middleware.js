import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secretKey = process.env.NEXT_PUBLIC_JWT_KEY;
const key = new TextEncoder().encode(secretKey);

async function decrypt(input) {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        if (error.code === 'JWTExpired') {
            return null;
        } else {
            return null;
        }
    }
}

export async function middleware(request) {
    // Retrieve the 'token' cookie
    const token = request.cookies.get("token")?.value;

    if (token) {
        try {
            // Decrypt token and log the payload
            const decrypted = await decrypt(token);

            if (!decrypted) {
                
                const url = request.nextUrl.clone();
                url.pathname = "/auth/signin"; 
                return NextResponse.redirect(url);

            } else {
                
            }

        } catch (error) {
            console.error("Error decrypting token:", error);
        }
    } else {
        // console.log("Token not found.");
    }

    const url = request.nextUrl.clone();

    // Redirect to login if token is missing
    if (!token) {
        url.pathname = "/auth/signin"; // Adjust to your login page path
        return NextResponse.redirect(url);
    }

    // Allow request to proceed if token exists and is not expired
    return NextResponse.next();
}

// Define the routes where the middleware should run
export const config = {
    matcher: ["/dashboard/:path*", "/checkout/:path*", "/callback/:path*", "/reader/:path*" ], 
};
