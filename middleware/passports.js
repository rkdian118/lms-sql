const passport = require('passport');

const jwtStratigy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

module.exports = function (passport) {
    passport.use(new jwtStratigy({
        secretOrKey: process.env.SECRET_KEY,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
        function (jwt_payload, cb) {
            cb(null, false)
        }
    ))
}