import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export interface AuthUser {
    id: string;
    fullName: string;
    email: string;
    role: 'ADMIN' | 'EMPLOYEE';
}

export interface AuthRequest extends Request {
    user?: AuthUser;
}

export const authenticate = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = verifyToken(token) as AuthUser | null;
    if (!decoded) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    req.user = decoded;
    next();
};

export const authorize = (roles: string[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    };
};
