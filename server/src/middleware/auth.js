import jwt from 'jsonwebtoken';

const getJwtSecret = () => process.env.JWT_SECRET || 'stackyr_secret_key_2026_super_secure';

export function generateToken(user) {
  return jwt.sign(
    { id: user._id || user.id, email: user.email, role: user.role || 'admin' },
    getJwtSecret(),
    { expiresIn: '30d' }
  );
}

export function protect(req, res, next) {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, no token provided' });
  }

  try {
    const decoded = jwt.verify(token, getJwtSecret());
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, session invalid or expired' });
  }
}
