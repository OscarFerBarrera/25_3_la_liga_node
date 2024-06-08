import { Document, Schema, model } from "mongoose";
import { Team, ITeam } from "./team.entity";

export enum STATUS {
  "NOTINITIAL" = "NOTINITIAL",
  "INPROGRESS" = "INPROGRESS",
  "END" = "END",
}

export interface IMatchCreate {
  MatchDate: number;
  LocalTeam: ITeam;
  GoalsLocal?: number;
  VisitorTeam: ITeam;
  GoalsVisitor?: number;
  Status: STATUS;
  Date: Date;
  Winner?: ITeam;
}

export type IMatch = IMatchCreate & Document;

const matchSchema = new Schema<IMatchCreate>(
  {
    MatchDate: {
      type: Number,
      required: true,
    },
    LocalTeam: {
      type: Schema.Types.ObjectId,
      ref: Team,
      required: true,
    },
    GoalsLocal: {
      type: Number,
      required: false,
    },
    VisitorTeam: {
      type: Schema.Types.ObjectId,
      ref: Team,
      required: true,
    },
    GoalsVisitor: {
      type: Number,
      required: false,
    },
    Status: {
      type: String,
      enum: STATUS,
      required: false,
    },
    Date: {
      type: Date,
      required: true,
    },
    Winner: {
      type: Schema.Types.ObjectId,
      ref: Team,
      required: false,
    }
  },
  {
    timestamps: true,
  }
);

export const Match = model<IMatchCreate>("Match", matchSchema);
