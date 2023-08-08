const jwtkey = {
    SECRET_KEY : process.env.SECRET_KEY,
    RESET_KEY : process.env.RESET_KEY,
    expiresIn : '21d',
}

module.exports = jwtkey;