// Import the jsonwebtoken library
import jwt from 'jsonwebtoken';

export function parseJwtToken(token: string) {
    try {
        const decodedToken = jwt.decode(token);
        // The decodedToken variable now contains the payload of the JWT
        // console.log(decodedToken);
        return decodedToken;
    } catch (error) {
        // Handle the error if the token is invalid or has expired
        console.error('JWT verification failed:', token);
    }
}
export function isTokenExpired(token: any) {
    if (!token || !token.exp) {
        // If the token or the expiration timestamp is not provided, consider it expired
        return true;
    }

    // Get the current timestamp in seconds
    const currentTime = Math.floor(Date.now() / 1000);

    // Compare the current time with the expiration time
    return currentTime > token.exp;
}