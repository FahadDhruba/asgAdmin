import { SignJWT, jwtVerify } from "jose";

const secretKey = process.env.NEXT_PUBLIC_JWT_KEY;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(key);
}

export async function decrypt(input) {
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

export async function loginJWT(authData) {
    const user = { email: authData.email, uid: authData.uid, name: authData.displayName, accessToken: authData.accessToken, photoURL: authData.photoURL };

    const expires = new Date(Date.now() + 100 * 1000);
    const token = await encrypt({ user, expires });

    return token;
}

export async function getAuthData(token) {
    // if (!token) return null;
    return await decrypt(token);
  }