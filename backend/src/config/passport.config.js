import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import UserService from "../services/user.service.js";
import dotenv from "dotenv";
// import UserManager from "../managers/user.manager.js";

dotenv.config({ path: ".env.dev" });

const userService = new UserService();

const jwtHeaderOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_KEY,
};

const jwtCookieOptions = {
    jwtFromRequest: (req) => req.cookies ? req.cookies["token"] : null,
    secretOrKey: process.env.SECRET_KEY,
};

const handleLogin = async (payload, done) => {
    try {
        const user = await userService.findOneById(payload.id);
        return done(null, user);
    } catch (error) {
        return done(null, false, { message: error.message });
    }
};

export const config = (server) => {

    passport.use("header-current", new JwtStrategy(jwtHeaderOptions, handleLogin));
    passport.use("cookie-current", new JwtStrategy(jwtCookieOptions, handleLogin));

    server.use(passport.initialize()); // Middleware para inicializa Passport

};