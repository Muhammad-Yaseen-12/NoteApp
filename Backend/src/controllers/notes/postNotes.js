// Add Notes
import NotesModel from "../../models/NotesModel.js";
const postNotes = async (req, res) => {
   try {
    const notes = new NotesModel(req.body);
    await notes.save();
    res.json({ message: "Task added successfully", notes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default postNotes;


