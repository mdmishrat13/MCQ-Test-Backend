import {Request, Response } from "express";

const Course = require("./../models/courses");


const createCourse = async (req: Request, res: Response) => {
  try {
    const { title,description } = req.body;
    if (!title) {
      return res.status(500).json({ errorMessage: "Title Name is required!" });
    }
    if (!description) {
      return res.status(500).json({ errorMessage: "Description is required!" });
    }
   
    const newCourse = new Course({
      title,
      description,
    });
    const saveCourse = await newCourse.save();

    res.send({ status: 'Created Successfully!', data: saveCourse });
  } catch (error: any) {
    console.log(error.message)
    return res.json(error);
  }
};


const getCourse = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const course = await Course.findById(id);
    if (!course) {
      res.status(404).json({ errorMessage: "No course found!" });
    }
    res.status(200).json(course)
  } catch (error) {
    res.status(404).json({ errorMessage: "No course found!" });
  }
};


const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find()
    if (!courses) {
      res.status(404).json({ errorMessage: "No course found!" })
    }
    res.status(200).json(courses)
  } catch (error) {
    res.status(404).json({ errorMessage: "No course found!" })
  }
}

module.exports = {
  createCourse,
  getCourse,
  getCourses,
};