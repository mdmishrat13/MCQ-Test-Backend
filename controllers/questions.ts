import { Request, Response } from "express";

const Question = require("./../models/questions");


const createQuestion = async (req: Request, res: Response) => {
  try {
    const { question, options, ans, chapterId, courseId, userId } = req.body;
    if (!question) {
      return res.status(500).json({ errorMessage: "Question is required!" });
    }
    if (!courseId) {
      return res.status(500).json({ errorMessage: "Course id is required!" });
    }
    if (!chapterId) {
      return res.status(500).json({ errorMessage: "Chapter id is required!" });
    }
    if (!options.length) {
      return res.status(500).json({ errorMessage: "Options is required!" });
    }
    if (!ans.length) {
      return res.status(500).json({ errorMessage: "Ans is required!" });
    }
    const questions = await Question.find()
    const index = questions.length + 1
    const newQuestion = new Question({
      chapterId,
      courseId,
      question,
      ans,
      userId,
      options,
      index
    });
    const saveQuestion = await newQuestion.save();

    res.send({ status: 'Created Successfully!', data: saveQuestion });
  } catch (error: any) {
    console.log(error.message)
    return res.json(error);
  }
};


const getAllQuestions = async (req: Request, res: Response) => {
  try {
    const question = await Question.find({});
    if (!question) {
      res.status(404).json({ errorMessage: "No question found!" });
    }
    res.status(200).json(question)
  } catch (error) {
    res.status(404).json({ errorMessage: "No question found!" });
  }
};


const getQuestions = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const courses = await Question.find({ chapterId: id })
    if (!courses) {
      res.status(404).json({ errorMessage: "No course found!" })
    }
    res.status(200).json(courses)
  } catch (error) {
    res.status(404).json({ errorMessage: "No course found!" })
  }
}

module.exports = {
  createQuestion,
  getAllQuestions,
  getQuestions,
};