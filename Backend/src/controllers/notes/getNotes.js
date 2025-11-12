import NotesModel from "../../models/NotesModel.js";
// Get all Notes
const getNotes = async(req, res) => {
 try {
    const notes = await NotesModel.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default getNotes;


