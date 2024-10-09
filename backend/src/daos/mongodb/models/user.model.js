/* eslint-disable camelcase */
import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { ROLES, STANDARD } from "../../../constants/roles.constant.js";

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [ true, "El nombre es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El nombre debe tener al menos 3 caracteres" ],
        maxLength: [ 20, "El nombre debe tener como máximo 20 caracteres" ],
    },
    last_name: {
        type: String,
        required: [ true, "El apellido es obligatorio" ],
        uppercase: true,
        trim: true,
        minLength: [ 3, "El apellido debe tener al menos 3 caracteres" ],
        maxLength: [ 20, "El nombre debe tener como máximo 20 caracteres" ],
    },
    email: {
        type: String,
        required: [ true, "El email es obligatorio" ],
        lowercase: true,
        trim: true,
        unique: true,
        validate: {
            validator: async function (email) {
                const countDocuments = await this.model("users").countDocuments({
                    _id: { $ne: this._id },
                    email, // Atributo de verificación de duplicado
                });
                return countDocuments === 0;
            },
            message: "El email ya está registrado",
        },
    },
    password: {
        type: String,
        required: [ true, "La contraseña es obligatoria" ],
    },
    age: {
        type: Number,
        required: [ true, "La edad es obligatoria" ],
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref: "carts",
        default: [],
    },
    roles: {
        type: [String],
        uppercase: true,
        enum: {
            values: ROLES,
            message: "Rol no válido",
        },
        default: STANDARD,
    },
}, {
    timestamps: true,
    versionKey: false,
});

userSchema.plugin(paginate);

userSchema.pre(/^find/, function(next){

    this.populate("cart");
    next();
});

const User = model("users", userSchema);

export default User;