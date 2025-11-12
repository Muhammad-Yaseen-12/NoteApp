import NotesModel from "../../models/NotesModel.js";
// Delete Notes
const deleteNotes = async(req, res) => {
   try {
    await NotesModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export default deleteNotes;


