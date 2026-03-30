const jwt = require('jsonwebtoken');

async function authartist(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "no token found" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "use artist account to access this resource" });
        }
        req.user = decoded; // Attach decoded user info to the request object
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });  
    }
}

async function authuser(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "no token found" });
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if(decoded.role !== "user"){
            return res.status(403).json({ message: "use user account to access this resource" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });

    }
}

module.exports = {authartist, authuser};