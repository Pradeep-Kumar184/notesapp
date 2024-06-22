import notesModel from "../models/notesModel.js";

// create notes
export const createNotesController = async (req, res) => {
  try {
    const { title, description } = req.body;
    // validation
    if (!title || !description) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    // Create new note
    const newNote = await new notesModel({
      title,
      description,
      userId: req.userId,
    });

    await newNote.save();
    return res.status(201).send({
      success: true,
      message: "note created successfully",
      newNote,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while creating notes",
      error,
    });
  }
};
// get notes
export const getAllNotesController = async (req, res) => {
  try {
    const notes = await notesModel.find({ userId: req.userId });
    if (!notes || notes.length === 0) {
      return res.status(200).send({
        success: false,
        message: "No notes found",
      });
    }
    return res.status(200).send({
      success: true,
      NotesCount: notes.length,
      message: "All notes found",
      Total: notes.length,
      notes,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while getting notes",
      error,
    });
  }
};

// update notes
export const updateNotesController = async (req, res) => {
  try {
    const notesId = req.params.id;
    if (!notesId) {
      return res.status(404).send({
        success: false,
        message: "no notes id found",
      });
    }
    const notes = await notesModel.findById(notesId);
    if (!notes) {
      return res.status(404).send({
        success: false,
        message: "Notes not Found",
      });
    }
    const { title, description } = req.body;
    const updatedNotes = await notesModel.findByIdAndUpdate(
      notesId,
      { title, description, userId: req.userId },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Notes updated successfully",
      updatedNotes,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "",
      error,
    });
  }
};
// delete notes
export const deleteNotesController = async (req, res) => {
  try {
    await notesModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Notes deleted successfully",
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "",
      error,
    });
  }
};
export const getSingleNotes = async (req, res) => {
  try {
    const notes = await notesModel.findOne({ _id: req.params.id });
    if (!notes) {
      return res.status(200).send({
        success: false,
        message: "No note found",
      });
    }
    return res.status(200).send({
      success: true,
      NotesCount: notes.length,
      message: "user  note found",
      Total: notes.length,
      notes,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Error while getting note",
      error,
    });
  }
};
// search product
export const searchNotesController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const result = await notesModel.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { title: { $regex: keyword, $options: "i" } },
      ],
    });
    res.json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: "Error in search notes",
      error,
    });
  }
};
