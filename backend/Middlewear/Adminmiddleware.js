import jwt from 'jsonwebtoken';
import UserModel from '../model/userModel/UserModel.js'; 
const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECREAT_KEY);
    const user = await UserModel.findById(decoded.id);

    console.log('Decoded User:', decoded);
    console.log('Fetched User:', user);

    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("adminMiddleware error:", err);
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
};

export default adminMiddleware;
