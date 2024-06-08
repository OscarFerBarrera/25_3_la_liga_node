import express from "express";
import { teamService } from "../domain/services/team.service";
import { isAuth } from "../utils/auth.middleware";

// Router propio de usuarios
export const classroomRouter = express.Router();

classroomRouter.get("/", isAuth, teamService.getClassrooms);
classroomRouter.get("/:id", isAuth, teamService.getClassroomById);
classroomRouter.post("/", isAuth, teamService.createClassroom);
classroomRouter.delete("/:id", isAuth, teamService.deleteClassroom);
classroomRouter.put("/:id", isAuth, teamService.updateClassroom);
