const jwt = require('jsonwebtoken');
exports.authenticate = (req, res) => {
    const token = req.headers[authorization];
    if(!token) return 
    res.status(403).json({message:"token require"});
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(err) return
        res.status(401).json({message:"invalid token"});
        req.userId = decoded.indexOf;
        next();
    });
};