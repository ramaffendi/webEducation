// controllers/bookController.js
import Book from "../model/bookModel.js";

export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const postBook = async (req, res) => {
  try {
    const { name, price, category, image, title, videoUrl } = req.body;

    // Validasi data
    if (!name || !price || !category || !image || !title || !videoUrl) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Membuat objek Book baru
    const newBook = new Book({
      name,
      price,
      category,
      image,
      title,
      videoUrl, // Tambahkan URL video
    });

    // Simpan ke dalam database
    await newBook.save();

    // Kirim response berhasil
    res.status(201).json({ message: "Book added successfully", book: newBook });
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Error adding book", error });
  }
};

export const getBookById = async (req, res) => {
  const { id } = req.params; // Mengambil id dari URL parameter

  try {
    // Mencari buku berdasarkan id
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Mengembalikan data buku jika ditemukan
    res.status(200).json(book);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json({ message: "Error fetching book", error });
  }
};
