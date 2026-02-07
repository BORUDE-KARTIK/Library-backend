const { json } = require("express");
const { BooksModel } = require("../Model/booksModel");

const booksModel = new BooksModel();

const getBooksController = async (req, res) => {
  try {
    const data = await booksModel.getBooks();
    console.log("Data In Controller :::", data);
    return res.status(200).json({
      success: true,
      message: "Books Data",
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "DB error",
    });
  }
};
const getTitleController = async (req, res) => {
  try {
    const { accession_no } = req.params;
    const data = await booksModel.getTitle(accession_no);
    return res.status(200).json({
      success: true,
      message: "Book Title And Available Copies",
      data,
    });
  } catch (error) {
    console.log("error in Books Controller ", err);
    return res.status(500).json({
      success: false,
      message: "DataBase Eror",
    });
  }
};

const getTotalBooksCountController = async (req, res) => {
  try {
    const data = await booksModel.getTotalBooksCount();
    console.log("Data In Controller :::", data);
    return res.status(200).json({
      success: true,
      message: "Total Count Of the Books",
      data: data[0].total,
    });
  } catch (error) {
    console.log("Error In the getTotalBooksCount() controller ", error);
    res.status(500).json({
      success: false,
      message: "Error In DB",
    });
  }
};

const getTotalIssuedBooksCountController = async (req, res) => {
  try {
    const data = await booksModel.getTotalIssuedBooksCount();
    return res.status(200).json({
      success: true,
      message: "Total Count Of the Issued Books",
      data,
    });
  } catch (error) {
    console.log("Error In the getTotalIssuedBooksCount() controller ", error);
    res.status(500).json({
      success: false,
      message: "Error In DB",
    });
  }
};
const getAllIssuedCountController = async (req, res) => {
  try {
    const data = await booksModel.getAllIssuedCount();
    res.status(200).json({
      success: true,
      message: "Total Issued Books Count",
      data,
    });
  } catch (error) {
    console.log("Error In the getTotalIssuedCountController()", error);
    res.status(500).json({
      success: false,
      message: "Error In DB",
    });
  }
};
const addBookController = async (req, res) => {
  try {
    if (
      !req.body.Accession_no ||
      !req.body.Title ||
      !req.body.Author ||
      !req.body.Edition ||
      !req.body.Publisher ||
      !req.body.Pub_location ||
      !req.body.Pages ||
      !req.body.Language_code ||
      !req.body.Department ||
      !req.body.Cost ||
      !req.body.Location ||
      !req.body.Total_copies ||
      !req.body.Available_copies ||
      !req.body.created_by
    ) {
      return res.status(400).json({
        success: false,
        message: "Books Data Needed To Be Provided",
      });
    }
    const data = await booksModel.addBook(req.body);
    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: data.message,
      });
    } else {
      return res.status(200).json({
        success: data.success,
        message: data.message,
      });
    }
  } catch (error) {
    console.log("Error in the addBook Controller ", error);
    return res.status(500).json({
      success: false,
      message: "DB Error",
    });
  }
};
const updateBookController = async (req, res) => {
  try {
    if (!req.body.Accession_no) {
      return res.status(400).json({
        success: false,
        message: "Accession Number Is Required",
      });
    }
    if (!req.body.id) {
      return res.status(400).json({
        success: false,
        message: "Id Is Required",
      });
    }
    if (!req.body.updated_by) {
      return res.status(400).json({
        success: false,
        message: "Updated By Is Required",
      });
    }
    const data = await booksModel.updateBook(req.body);
    if (!data.success) {
      return res.status(400).json({
        success: data.success,
        message: data.message,
      });
    } else {
      return res.status(200).json({
        success: data.success,
        message: data.message,
      });
    }
  } catch (error) {
    console.log("Error in the updateBook Controller ", error);
    return res.status(500).json({
      success: false,
      message: "DB Error",
    });
  }
};

const getOverdueBooksCountController = async (req, res) => {
  try {
    const result = await booksModel.getOverdueBooksCount();
    console.log("Result ", result);
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: "Overdue Books Count",
        count: result.count,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message,
      });
    }
  } catch (error) {
    console.log("Error In the getOverdueBooksCountController()", error);
    return res.status(500).json({
      success: false,
      message: "Error In DB",
    });
  }
};

//this Function For the Checking the Whether the Book exists or not used in the While
//Adding the Book To check for its existance
const isBookExistsController = async (req, res) => {
  try {
    const { accession_no } = req.params;
    console.log("Acc_no", accession_no);
    const { book } = await booksModel.isBookExists(accession_no);
    console.log("Data In Controller :::", book);

    if (!book) {
      return res.status(400).json({
        success: false,
        message: "Book Does Not Exists",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Book Exists",
      book,
    });
  } catch (error) {
    console.log("Error In isBookExistsController ", error);
    return res.status(500).json({
      success: false,
      message: "DB Error",
    });
  }
};

//This Controller is used to Return The Book Based On the Student_ID , Accession_ID , Book_ID
//Accession_No is used to Update the Books Avaliable Copies
const fileReturnBookController = async (req, res) => {
  try {
    const { ac_no, book_id, stu_id } = req.body;
    if (!ac_no) {
      return res.status(400).json({
        success: false,
        message: "Accession Number Is Required",
      });
    } else if (!book_id) {
      return res.status(400).json({
        success: false,
        message: "book_id Is Required",
      });
    } else if (!stu_id) {
      return res.status(400).json({
        success: false,
        message: "stu_id Is Required",
      });
    }
    const data = await booksModel.fileReturnBook(ac_no, book_id, stu_id);
    if (data.success) {
      return res.status(200).json({
        success: true,
        message: "Book Returned SuccessFully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: data.message,
      });
    }

    console.log("Data In Controller :", data);
  } catch (error) {
    console.log("Error IN fileReturnBookController", error);
    return res.status(500).json({
      success: false,
      message: "DB Error",
    });
  }
};

const issueBookController = async (req, res) => {
  const { book_id, stu_id, available_copies, issue_date, actual_return_date } =
    req.body;

  if (!book_id || !stu_id || !actual_return_date || !issue_date) {
    return res.status(400).json({
      success: false,
      message:
        "Missing Fields book_id , stu_id , issue_date , actual_return_date",
    });
  }
  if (available_copies == 0 || !available_copies) {
    return res.status(400).json({
      success: true,
      message: "Book Is Not Avalible",
    });
  }
  const result = await booksModel.issueBook(
    book_id,
    stu_id,
    available_copies,
    issue_date,
    actual_return_date,
  );
  console.log("DATA ::", result);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Falied To Issue Book",
    });
  } else {
    return res.status(200).json({
      success: true,
      message: "Book Issued Successfully",
    });
  }
};

//get all the issued book data to show on the return page in table form
//to show only the issued or the due books
const getAllIssuedBooksController = async (req, res) => {
  try {
    const data = await booksModel.getAllIssuedBooks();
    // console.log("Data in controller ",data);
    if (data.success) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Data Not Found",
      });
    }
  } catch (error) {
    console.log("Error In the getAllIssuedBooksController ", error);
    return res.status(500).json({
      success: false,
      message: "DB Error",
    });
  }
};
const getDataOfIssuedBooksController = async (req, res) => {
  try {
    const { accession_no } = req.params;
    const data = await booksModel.getDataOfIssuedBooks(accession_no);
    console.log("Data in controller ", data);
    if (data.success) {
      return res.status(200).json({
        data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Data Not Found",
      });
    }
  } catch (error) {
    console.log("Error In the getDataOfIssuedBooksController ", error);
    return res.status(500).json({
      success: false,
      message: "DB Error",
    });
  }
};

//Controller for searching books by term
const searchBooksController = async (req, res) => {
  try {
    const { term } = req.query;

    if (!term) {
      return res.status(400).json({
        success: false,
        message: "Search term is required",
      });
    }

    const data = await booksModel.searchBooks(term);

    if (data.success) {
      return res.status(200).json({
        success: true,
        message: "Books found",
        data: data.data,
        count: data.count,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: data.message,
      });
    }
  } catch (error) {
    console.log("Error In searchBooksController", error);
    return res.status(500).json({
      success: false,
      message: "DB Error",
    });
  }
};

// Controller for deleting a book
const deleteBookController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Book ID is required",
      });
    }

    const data = await booksModel.deleteBook(id);

    if (data.success) {
      return res.status(200).json({
        success: true,
        message: data.message,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: data.message,
      });
    }
  } catch (error) {
    console.log("Error In deleteBookController", error);
    return res.status(500).json({
      success: false,
      message: "DB Error",
    });
  }
};

module.exports = {
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
};
