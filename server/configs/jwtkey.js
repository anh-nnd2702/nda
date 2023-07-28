const jwtkey = {
    SECRET_KEY : process.env.SECRET_KEY,
    expiresIn : '1d'
}

module.exports = jwtkey;