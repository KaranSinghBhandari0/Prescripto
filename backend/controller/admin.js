const jwt = require('jsonwebtoken')

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 60 * 60 * 1000,
};

const login = (req,res) => {
    try {
        let {email , password} = req.body;
        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD) {
            const admin_token = jwt.sign({ id: process.env.ADMIN_ID }, process.env.JWT_SECRET);
            res.cookie('admin_token', admin_token, cookieOptions);
            
            const admin = {
                email : "admin@gmail.com",
                password : "....."
            }

            return res.status(200).json({message:'login successful', admin});
        }
        res.status(401).json({message:'wrong creadentials'})
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server Error'})
    }
}

const logout = async (req,res) => {
    res.clearCookie('admin_token', {
        httpOnly: true,
        secure: true,
        sameSite: "None",
    });
    res.status(200).json({message: 'logout successful'})
}

const isAdmin = (req,res) => {
    console.log(req.admin);
    res.status(200).json(req.admin);
}

module.exports = { login, isAdmin, logout };