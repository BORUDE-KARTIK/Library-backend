const express = require("express");
const authorizeLibrarian = require("../middleware/authorizeLibrarian");
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
  searchBooksController,
  deleteBookController,
  getOverdueBooksCountController,
} = require("../Controller/booksController");
const router = express.Router();

router.get("/getAllBooks", getBooksController);
router.get("/getTitle/:accession_no", authorizeLibrarian, getTitleController);
router.get("/getTotalBookCount", getTotalBooksCountController);
router.get("/getTotalIssuedBookCount", getTotalIssuedBooksCountController);
router.get("/getOverdueBooksCount", getOverdueBooksCountController);
router.get("/getAllIssuedCount", authorizeLibrarian, getAllIssuedCountController);
router.get("/isBookExists/:accession_no", isBookExistsController);
router.post("/addBook", authorizeLibrarian, addBookController);
router.post("/issueBook", issueBookController);
router.put("/fileReturn", fileReturnBookController);
router.put("/updateBook", authorizeLibrarian, updateBookController);
router.get("/getAllIssuedBooks", authorizeLibrarian, getAllIssuedBooksController);
router.get(
  "/getDataOfIssuedBooks/:accession_no",
  authorizeLibrarian, getDataOfIssuedBooksController,
);
router.get("/searchBooks", searchBooksController);
router.delete("/deleteBook/:id", authorizeLibrarian, deleteBookController);

module.exports = router;
