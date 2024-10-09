import jwt from "jsonwebtoken";
import passport from "passport";
import UserService from "../services/user.service.js";
import { JWT_TRANSLATIONS } from "../constants/messages.constant.js";

const userService = new UserService();

// Middleware para generar un token de acceso para un usuario autenticado
export const generateToken = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const userFound = await userService.findOneByEmailAndPassword(email, password);

        const token = jwt.sign({ id: userFound.id }, process.env.SECRET_KEY, { expiresIn: "2h" });
        req.token = token;

        res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000, httpOnly: true });

        next();
    } catch (error) {
        next(error);
    }
};

// Middleware para extraer el token JWT de la cookie
export const extractTokenFromCookie = (req, res, next) => {

    const { token } = req.body;
    if (token) {
        req.headers.authorization = `Bearer ${token}`;
    }
    next();
};

// Middleware para verificar la autenticación del usuario
export const checkAuth = async (req, res, next) => {

    const jwtStrategy = req.cookies["token"] ? "cookie-current" : "header-current";

    passport.authenticate(jwtStrategy, { session: false }, (error, user, info) => {
        if (error) return next(error);
        if (!user) return next(new Error(JWT_TRANSLATIONS[info.message] ?? info.message));

        req.user = user;
        req.roles = user.roles;

        next();
    })(req, res, next);
};