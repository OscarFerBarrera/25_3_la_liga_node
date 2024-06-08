import { Match, IMatch, IMatchCreate } from "../entities/match.entity";
import { Document } from "mongoose";

const getGameById = async (id: string): Promise<Document<IMatch> | null> => {
  return await Match.findById(id).populate(["teacher", "classroom"]);
};

const getMatchByClassroomId = async (classroomId: string): Promise<IMatch[]> => {
  return await Match.find({ classroom: classroomId });
};

const createGame = async (subjectData: IMatchCreate): Promise<Document<IMatch>> => {
  const subject = new Match(subjectData);
  const document: Document<IMatch> = (await subject.save()) as any;

  return document;
};

const deleteGame = async (id: string): Promise<Document<IMatch> | null> => {
  return await Match.findByIdAndDelete(id);
};

const updateGame = async (id: string, subjectData: IMatchCreate): Promise<Document<IMatch> | null> => {
  return await Match.findByIdAndUpdate(id, subjectData, { new: true, runValidators: true });
};

export const subjectOdm = {
  getAllMatch,
  getGameCount,
  getGameById,
  getMatchByClassroomId,
  createGame,
  deleteGame,
  updateGame,
};
