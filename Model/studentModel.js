const pool = require("../Config/dbConfig");

class BookModel {
  getStudentData = async (acc_no) => {
    let q = `
SELECT id, name, enrollment_no, Department, year
FROM students
WHERE enrollment_no = ?

`;

    console.log(acc_no);
    try {
      const [result] = await pool.query(q, [acc_no]);
      console.log("Data In The Book Model", result);
      if (result.length == 0) {
        return {
          success: false,
          message: "Student With This Accession Number Not Found",
        };
      }
      return {
        success: true,
        message: "Student Found",
        data: result[0],
      };
    } catch (error) {
      console.log("Error In Book Mdel", error);
      return {
        success: false,
        message: "Error In DB",
      };
    }
  };
  addStudent = async (student) => {
    let data = Object.values(student);

    // Fixed SQL syntax: VALUES needs parentheses around placeholders
    let q = `INSERT INTO \`students\` (name, enrollment_no, department, year, email, phone) VALUES (?,?,?,?,?,?)`;

    try {
      const [result] = await pool.query(q, data);

      return {
        success: true,
        message: "Student Added Successfully",
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || "Failed to add student from Student Model",
      };
    }
  };
  updateStudent = async (student) => {
  const q =
    "UPDATE students SET enrollment_no = ?, name = ?, email = ?, Department = ?, year = ?, phone = ? WHERE id = ?";

  try {
    const [result] = await pool.query(q, student);

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: "Student not found",
      };
    }

    return {
      success: true,
      message: "Student updated successfully",
    };
  } catch (error) {
    console.log("Error In updateStudent Model:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return {
        success: false,
        message: "Duplicate entry! Enrollment No or Email already exists.",
      };
    }

    return {
      success: false,
      message: error.message || "Failed to update student",
    };
  }
  };

  searchStudent = async (term) => {
    if (!term) {
      return {
        success: false,
        message: "Search term is required",
      };
    }

    const q = `SELECT * FROM students 
               WHERE name LIKE ? 
               OR enrollment_no LIKE ? 
               OR year LIKE ? 
               OR Department LIKE ? 
               OR email LIKE ? 
               OR phone LIKE ? 
               LIMIT 600`;
    const search = `%${term}%`;

    try {
      const [result] = await pool.query(q, [
        search,
        search,
        search,
        search,
        search,
        search,
      ]);

      if (result.length > 0) {
        return {
          success: true,
          message: "Students found",
          data: result,
        };
      } else {
        return {
          success: false,
          message: "No students found",
        };
      }
    } catch (error) {
      console.log("Error In searchStudent Model:", error);
      return {
        success: false,
        message: error.message || "Failed to search students",
      };
    }
  };

  deleteStudent = async (id) => {
    if (!id) {
      return {
        success: false,
        message: "Student ID is required",
      };
    }

    const q = `DELETE FROM students WHERE id = ?`;

    try {
      const [result] = await pool.query(q, [id]);

      if (result.affectedRows === 0) {
        return {
          success: false,
          message: "Student not found",
        };
      }

      return {
        success: true,
        message: "Student deleted successfully",
      };
    } catch (error) {
      console.log("Error In deleteStudent Model:", error);
      return {
        success: false,
        message: error.message || "Failed to delete student",
      };
    }
  };

  getTotalStudentsCount = async () => {
    const q = `SELECT COUNT(*) AS total FROM students`;

    try {
      const [result] = await pool.query(q);

      return {
        success: true,
        data: result[0].total,
      };
    } catch (error) {
      console.log("Error In getTotalStudents Model:", error);
      return {
        success: false,
        message: error.message || "Failed to get total students",
      };
    }
  };

  getOnlineStudentsCount = async () => {
    const q = `SELECT COUNT(*) AS total FROM users WHERE isOnline = 1 AND role = 'student'`;

    try {
      const [result] = await pool.query(q);

      return {
        success: true,
        data: result[0].total,
      };
    } catch (error) {
      console.log("Error In getOnlineStudents Model:", error);
      return {
        success: false,
        message: error.message || "Failed to get online students",
      };
    }
  };
  
}

module.exports = new BookModel();
