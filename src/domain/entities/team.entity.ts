import { Document, Schema, model } from "mongoose";

export interface ITeamCreate {
  name: string;
}

export type ITeam = ITeamCreate & Document;

const teamSchema = new Schema<ITeamCreate>({
  name: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    minlength: [5, "El nombre de la clase debe tener al menos 5 caracteres, por ejemplo 2 ESO, 1 BACH... etc"]
  },
}, {
  timestamps: true,
});

export const Team = model<ITeamCreate>("Team", teamSchema);
