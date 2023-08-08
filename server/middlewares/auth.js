const jwt = require('jsonwebtoken');
const jwtkey = require('../configs/jwtkey.js');
const secretKey = jwtkey.SECRET_KEY;
const expiresIn = jwtkey.expiresIn;
const resetKey = jwtkey.RESET_KEY;

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
        if(decoded.isAdmin === null || decoded.isAdmin === 'null' || !decoded.isAdmin || decoded.isAdmin ===undefined){
            console.log('not a admin');
            return res.status(403).json({ message: 'Invalid permission'})
        }
        req.email = decoded.email;
        req.Id = decoded.Id;
        next();
    });
}

exports.authResetToken = (req, res, next) =>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Missing token' });
    }
    jwt.verify(token, resetKey, (err, decoded) => {
        if (err) {
            console.log(err);
            /*if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Yêu cầu cập nhật mật khẩu đã quá hạn' });
            }
            else{*/
                return res.status(403).json({ message: 'Token không chính xác' });
            //}
        }
        if(decoded.isReset === null || decoded.isReset === 'null' || !decoded.isReset || decoded.isReset ===undefined){
            return res.status(403).json({ message: 'Invalid permission'})
        }
        req.email = decoded.email;
        next();
    });
}
