const express = require("express");
const {
  getBooksController,
  getTitleController,
  getTotalBooksCountController,
  getTotalIssuedBooksCountController,
  getAllIssuedCountController,
  addBookController,
  updateBookController,
  isBookExistsController,
  fileReturnBookController,
  issueBookController,
  getAllIssuedBooksController,
  getDataOfIssuedBooksController,
  searchBooksController
} = require("../Controller/booksController");
const router = express.Router();

router.get("/getAllBooks", getBooksController);
router.get("/getTitle/:accession_no", getTitleController);
router.get("/getTotalBookCount", getTotalBooksCountController);
router.get("/getTotalIssuedBookCount", getTotalIssuedBooksCountController);
router.get("/getAllIssuedCount", getAllIssuedCountController);
router.get("/isBookExists/:accession_no", isBookExistsController);
router.post("/addBook", addBookController);
router.post("/issueBook", issueBookController);
router.put("/fileReturn", fileReturnBookController);
router.put("/updateBook", updateBookController);
router.get("/getAllIssuedBooks", getAllIssuedBooksController);
router.get("/getDataOfIssuedBooks/:accession_no", getDataOfIssuedBooksController);
router.get("/searchBooks", searchBooksController);

module.exports = router;

