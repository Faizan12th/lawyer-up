import jwt from 'jsonwebtoken';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export interface TokenPayload {
    userId: string;
    role: string;
}

export const signToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

export const verifyToken = (token: string): TokenPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRET) as TokenPayload;
    } catch (error) {
        return null;
    }
};

export const getDataFromToken = (request: NextRequest): TokenPayload | null => {
    try {
        const token = request.cookies.get('token')?.value || '';
        if (!token) return null;
        return verifyToken(token);
    } catch (error: any) {
        return null;
    }
};
