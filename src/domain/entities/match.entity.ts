import { Document, Schema, model } from "mongoose";
import { Team, ITeam } from "./team.entity";

export interface IMatchCreate {
  NumMatch: string;
  Match: [ Team1: ITeam, Team2: ITeam];
}

export type IMatch = IMatchCreate & Document;

const matchSchema = new Schema<IMatchCreate>({
  NumMatch: {
    type: String,
    required: true,
  },
  Team1: {
    type: Schema.Types.ObjectId,
    ref: Team,
    required: true,
  },
  Team2: {
    type: Schema.Types.ObjectId,
    ref: Team,
    required: true,
  },
}, {
  timestamps: true,
});

export const Match = model<IMatchCreate>("Match", matchSchema);
