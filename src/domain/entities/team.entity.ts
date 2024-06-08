import { Document, Schema, model } from "mongoose";

export interface ITeamCreate {
  name: string;
  logo: string;
  acronym: string;
}

export type ITeam = ITeamCreate & Document;

const teamSchema = new Schema<ITeamCreate>({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: [5, "El nombre del equipo debe tener al menos 5 caracteres"]
  },
  logo: {
    type: String,
    required: true,
  },
  acronym: {
    type: String,
    trim: true,
    unique: true,
    minlength: [3, "El minimo debe ser de 3 caracteres"],
    maxlength: [5, "el máximo debe ser de 5 caracteres."],
  },
}, {
  timestamps: true,
});

export const Team = model<ITeamCreate>("Team", teamSchema);
