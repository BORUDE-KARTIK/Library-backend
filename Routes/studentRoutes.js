const express = require("express");
const router = express.Router();
const studentsController = require("../Controller/studentsController");
const authorizeLibrarian = require("../middleware/authorizeLibrarian");

router.get("/getStudentData/:roll_no", authorizeLibrarian, studentsController.getStudentDataController)
router.post("/addStudentData", authorizeLibrarian, studentsController.addStudentDataController)
router.put("/updateStudent", authorizeLibrarian, studentsController.updateStudentController)
router.get("/searchStudent/:term", authorizeLibrarian, studentsController.searchStudentController)
router.get("/getTotalStudents", authorizeLibrarian, studentsController.getTotalStudentsController)
router.get("/getOnlineStudents", authorizeLibrarian, studentsController.getOnlineStudentsController)
router.delete("/deleteStudent/:id", authorizeLibrarian, studentsController.deleteStudentController)


module.exports = router;