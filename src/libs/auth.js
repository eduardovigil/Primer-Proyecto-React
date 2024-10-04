import jwt from 'jsonwebtoken';

export function verifytoken(req, res, next){
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode.user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' }); 
    }
}