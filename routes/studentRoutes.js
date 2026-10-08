const express = require("express");
const router = express.Router();

const students = require("../data/students");

// GET /api/students
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: students.length,
    data: students
  });
});

// GET /api/students/:id
router.get("/:id", (req, res) => {
  const studentId = Number(req.params.id);

  const student = students.find((item) => item.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  res.status(200).json({
    success: true,
    data: student
  });
});

// POST /api/students
router.post("/", (req, res) => {
  const { name, age, course } = req.body;

  if (!name || !age || !course) {
    return res.status(400).json({
      success: false,
      message: "Name, age, and course are required"
    });
  }

  const newStudent = {
    id: students.length > 0 ? students[students.length - 1].id + 1 : 1,
    name,
    age,
    course
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    data: newStudent
  });
});

// PUT /api/students/:id
router.put("/:id", (req, res) => {
  const studentId = Number(req.params.id);
  const { name, age, course } = req.body;

  const student = students.find((item) => item.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  if (!name || !age || !course) {
    return res.status(400).json({
      success: false,
      message: "Name, age, and course are required"
    });
  }

  student.name = name;
  student.age = age;
  student.course = course;

  res.status(200).json({
    success: true,
    message: "Student updated successfully",
    data: student
  });
});

// DELETE /api/students/:id
router.delete("/:id", (req, res) => {
  const studentId = Number(req.params.id);

  const studentIndex = students.findIndex((item) => item.id === studentId);

  if (studentIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  const deletedStudent = students.splice(studentIndex, 1);

  res.status(200).json({
    success: true,
    message: "Student deleted successfully",
    data: deletedStudent[0]
  });
});

module.exports = router;