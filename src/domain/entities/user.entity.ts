import { Document, Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import { Team, ITeam } from "./team.entity";

export enum ROL {
  "USER" = "USER",
  "DELEGATE" = "DELEGATE",
  "ADMIN" = "ADMIN",
}

export interface IUserCreate {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  Team?: ITeam;
  rol: ROL;
  image: string;
}

export type IUser = IUserCreate & Document;

const userSchema = new Schema<IUserCreate>(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      validate: {
        validator: (text: string) => validator.isEmail(text),
        message: "Email incorrecto",
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: 4,
      select: false,
    },
    firstName: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
      minLength: 3,
    },
    Team: {
      type: Schema.Types.ObjectId,
      ref: Team,
      required: false,
    },
    rol: {
      type: String,
      required: true,
      enum: ROL,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  try {
    // Si la contraseña ya estaba encriptada, no la encriptamos de nuevo
    if (this.isModified("password")) {
      const saltRounds = 10;
      const passwordEncrypted = await bcrypt.hash(this.password, saltRounds);
      this.password = passwordEncrypted;
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

export const User = model<IUserCreate>("User", userSchema);
