import bcrypt from 'bcrypt';
import User from '../models/UserModel.js';
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // console.log(email);
        
        
        
        // fields validation
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        
        const normalizedEmail = email.trim().toLowerCase();

        // Check if user already exists
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully', user: newUser });


    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}
export default registerUser;