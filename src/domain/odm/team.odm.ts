import { Team, ITeam, ITeamCreate } from "../entities/team.entity";
import { Document } from "mongoose";

const getAllTeams = async (page: number, limit: number): Promise<ITeam[]> => {
  return await Team.find()
    .limit(limit)
    .skip((page - 1) * limit);
};

const getTeamCount = async (): Promise<number> => {
  return await Team.countDocuments();
};

const getTeamById = async (id: string): Promise<Document<ITeam> | null> => {
  return await Team.findById(id);
};

const createTeam = async (classroomData: ITeamCreate): Promise<Document<ITeam>> => {
  const classroom = new Team(classroomData);
  const document: Document<ITeam> = (await classroom.save()) as any;

  return document;
};

const deleteTeam = async (id: string): Promise<Document<ITeam> | null> => {
  return await Team.findByIdAndDelete(id);
};

const updateTeam = async (id: string, classroomData: ITeamCreate): Promise<Document<ITeam> | null> => {
  return await Team.findByIdAndUpdate(id, classroomData, { new: true, runValidators: true });
};

export const teamOdm = {
  getAllTeams,
  getTeamCount,
  getTeamById,
  createTeam,
  deleteTeam,
  updateTeam,
};
