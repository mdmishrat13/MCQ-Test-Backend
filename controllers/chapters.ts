import {Request, Response } from "express";

const Chapter = require("./../models/chapters");


const createChapter = async (req: Request, res: Response) => {
  try {
    const { chapterName,courseId} = req.body;
    if (!chapterName) {
      return res.status(500).json({ errorMessage: "Chapter Name is required!" });
    }
    if (!courseId) {
      return res.status(500).json({ errorMessage: "Chapter is required!" });
    }
      const chapters = await Chapter.find()
      const index = chapters.length+1
    const newCourse = new Chapter({
        chapterName,
        courseId,
        index
    });
    const saveCourse = await newCourse.save();

    res.send({ status: 'Created Successfully!', data: saveCourse });
  } catch (error: any) {
    console.log(error.message)
    return res.json(error);
  }
};


const getChapter = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const chapter = await Chapter.findOne({_id:id});
    if (!chapter) {
      res.status(404).json({ errorMessage: "No chapter found!" });
    }
    res.status(200).json(chapter)
  } catch (error) {
    res.status(404).json({ errorMessage: "No chapter found!" });
  }
};


const getChapters = async (req: Request, res: Response) => {
    try {
    const id = req.params.id;
    const courses = await Chapter.find({courseId:id})
    if (!courses) {
      res.status(404).json({ errorMessage: "No course found!" })
    }
    res.status(200).json(courses)
  } catch (error) {
    res.status(404).json({ errorMessage: "No course found!" })
  }
}

module.exports = {
    createChapter,
    getChapter,
    getChapters,
};