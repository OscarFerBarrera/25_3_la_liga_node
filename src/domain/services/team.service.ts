import { Request, Response, NextFunction } from "express";
import { teamOdm } from "../odm/team.odm";
import { userOdm } from "../odm/user.odm";
import { subjectOdm } from "../odm/subject.odm";

export const getClassrooms = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Only for admins and teachers
    if (req.user.rol !== "ADMIN" && req.user.rol !== "TEACHER") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    // Ternario que se queda con el parametro si llega
    const page = req.query.page ? parseInt(req.query.page as string) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;

    const classrooms = await teamOdm.getAllTeams(page, limit);

    // Num total de elementos
    const totalElements = await teamOdm.getTeamCount();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: classrooms,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getClassroomById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const classroomIdToShow = req.params.id;

    // Only for admins and teachers
    if (req.user.rol !== "ADMIN" && req.user.rol !== "TEACHER") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    const classroom = await teamOdm.getTeamById(classroomIdToShow);

    if (classroom) {
      const classroomToSend = classroom.toObject();

      const students = await userOdm.getStudentsByClassroomId(classroom.id);
      const subjects = await subjectOdm.getSubjectsByClassroomId(classroom.id);

      classroomToSend.students = students;
      classroomToSend.subjects = subjects;

      res.json(classroomToSend);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const createClassroom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Only for admins
    if (req.user.rol !== "ADMIN") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    const createdClassroom = await teamOdm.createTeam(req.body);
    res.status(201).json(createdClassroom);
  } catch (error) {
    next(error);
  }
};

export const deleteClassroom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Only for admins
    if (req.user.rol !== "ADMIN") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    const id = req.params.id;
    const classroomDeleted = await teamOdm.deleteTeam(id);
    if (classroomDeleted) {
      res.json(classroomDeleted);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const updateClassroom = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Only for admins
    if (req.user.rol !== "ADMIN") {
      res.status(401).json({ error: "No tienes autorización para hacer esto" });
      return;
    }

    const id = req.params.id;
    const classroomToUpdate = await teamOdm.getTeamById(id);
    if (classroomToUpdate) {
      Object.assign(classroomToUpdate, req.body);
      const classroomSaved = await classroomToUpdate.save();
      res.json(classroomSaved);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    next(error);
  }
};

export const teamService = {
  getClassrooms,
  getClassroomById,
  createClassroom,
  deleteClassroom,
  updateClassroom,
};
