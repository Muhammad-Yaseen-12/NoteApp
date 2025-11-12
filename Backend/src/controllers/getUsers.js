import UserModel from '../models/UserModel.js';
const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
}
export default getUsers;