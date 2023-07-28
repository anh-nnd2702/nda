const jwt = require('jsonwebtoken');
const jwtkey = require('../configs/jwtkey.js');
const secretKey = jwtkey.SECRET_KEY;
const expiresIn = jwtkey.expiresIn;

exports.authenToken = (req, res, next) => {
    //const token = req.cookies.token;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.email = decoded.email;
        req.Id = decoded.Id;
        next();
    });
};

exports.authenHrToken = (req, res, next) => {
    //const token = req.cookies.token;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //console.log('ran to this')
    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        if(decoded.isHr === null || decoded.isHr === 'null' || !decoded.isHr || decoded.isHr ===undefined){
            console.log('not a HR');
            return res.status(403).json({ message: 'Invalid permission'})
        }
        req.email = decoded.email;
        req.Id = decoded.Id;
        next();
    });
}

exports.authenAdminToken = (req, res, next) => {
    //const token = req.cookies.token;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    //console.log('ran to this')
    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({ message: 'Invalid token' });
        }
        if(decoded.isAd === null || decoded.isAd === 'null' || !decoded.isAd || decoded.isAd ===undefined){
            console.log('not a HR');
            return res.status(403).json({ message: 'Invalid permission'})
        }
        req.email = decoded.email;
        req.Id = decoded.Id;
        next();
    });
}

