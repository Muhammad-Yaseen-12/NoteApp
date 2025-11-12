const logOutUser = (req, res) => {
    try {


        console.log("logout user=>",req.user);

        res.clearCookie('token');

        res.status(200).json({ message: 'User logged out successfully' });


    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
export default logOutUser;