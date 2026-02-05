const express = require("express");
const router = express.Router() ;
const studentsController = require("../Controller/studentsController")

router.get("/getStudentData/:roll_no",studentsController.getStudentDataController)
router.post("/addStudentData",studentsController.addStudentDataController)
router.put("/updateStudent",studentsController.updateStudentController)
router.get("/searchStudent/:term",studentsController.searchStudentController)
router.get("/getTotalStudents",studentsController.getTotalStudentsController)
router.get("/getOnlineStudents",studentsController.getOnlineStudentsController)
router.delete("/deleteStudent/:id",studentsController.deleteStudentController)


module.exports = router;