const studentModel = require("../Model/studentModel");

class StudentController {
  constructor() {
    this.ALLOWED_DEPARTMENTS = [
      "CO",
      "EE",
      "ME",
      "DDGM",
      "AUTO",
      "ELE",
      "CIV",
    ];

    this.ALLOWED_YEARS = [1, 2, 3];
  }

  getStudentDataController = async (req, res) => {
    let { roll_no } = req.params;

    if (!roll_no || roll_no === "") {
      return res.status(400).json({
        success: false,
        message: "Accession Number Is Required",
      });
    }

    try {
      const result = await studentModel.getStudentData(roll_no);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.log("Error In getStudentDataController", error);
      return res.status(500).json({
        success: false,
        message: "DB Failed",
      });
    }
  };

  addStudentDataController = async (req, res) => {
    let student = req.body;

    if (!student) {
      return res.status(400).json({
        success: false,
        message: "Student Data Is Required",
      });
    }

    if (!student.phone || student.phone === "") {
      return res.status(400).json({
        success: false,
        message: "Student Phone Number Is Required",
      });
    }

    if (!student.email || student.email === "") {
      return res.status(400).json({
        success: false,
        message: "Student Email Is Required",
      });
    }

    if (
      !student.year ||
      !this.ALLOWED_YEARS.includes(student.year)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Student Year",
      });
    }

if (
  !student.Department ||
  !this.ALLOWED_DEPARTMENTS.includes(student.Department)
) {
  return res.status(400).json({
    success: false,
    message: `Invalid Student Department. Valid values are: ${this.ALLOWED_DEPARTMENTS.join(
      ", "
    )}`,
  });
}


    if (!student.name || student.name === "") {
      return res.status(400).json({
        success: false,
        message: "Student Name Is Required",
      });
    }

    if (!student.enrollment_no || student.enrollment_no === "") {
      return res.status(400).json({
        success: false,
        message: "Student Enrollment Is Required",
      });
    }

    try {
      const result = await studentModel.addStudent(student);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.log("Error In addStudentDataController", error);
      return res.status(500).json({
        success: false,
        message: "DB Failed",
      });
    }
  };

updateStudentController = async (req, res) => {
  try {
    const student = req.body;

    if (!student.id) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    const result = await studentModel.updateStudent(student);

    if (!result.success) {
      return res.status(400).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    console.log("Error In The updateStudentController", error);

    return res.status(500).json({
      success: false,
      message: error.message || "DB Error",
    });
  }
};

  searchStudentController = async (req, res) => {
    const { term } = req.params;

    if (!term || term === "") {
      return res.status(400).json({
        success: false,
        message: "Search term is required",
      });
    }

    try {
      const result = await studentModel.searchStudent(term);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.log("Error In searchStudentController", error);
      return res.status(500).json({
        success: false,
        message: "DB Failed",
      });
    }
  };

  deleteStudentController = async (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Student ID is required",
      });
    }

    try {
      const result = await studentModel.deleteStudent(id);

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.log("Error In deleteStudentController", error);
      return res.status(500).json({
        success: false,
        message: "DB Failed",
      });
    }
  };

  getTotalStudentsController = async (req, res) => {
    try {
      const result = await studentModel.getTotalStudentsCount();

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.log("Error In getTotalStudentsController", error);
      return res.status(500).json({
        success: false,
        message: "DB Failed",
      });
    }
  };

  getOnlineStudentsController = async (req, res) => {
    try {
      const result = await studentModel.getOnlineStudentsCount();

      if (result.success) {
        return res.status(200).json(result);
      } else {
        return res.status(400).json(result);
      }
    } catch (error) {
      console.log("Error In getOnlineStudentsController", error);
      return res.status(500).json({
        success: false,
        message: "DB Failed",
      });
    }
  };
}

module.exports = new StudentController();
