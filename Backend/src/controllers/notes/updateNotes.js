

// Update Notes
import NotesModel from "../../models/NotesModel.js";
const updateNotes = async (req, res) => {
    try {
    const updatedNotes = await NotesModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ message: "Task updated successfully", updatedNotes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default updateNotes;


