import jwt from 'jsonwebtoken';

const middleware = async (req, res, next) => {
    try {

        // Get token from headers
        const token = req.cookies.token;

        // Check token exists or not
        if (!token) {
            return res.redirect("/login");
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Store user data inside request
        req.user = decoded;

        // Move to next middleware/controller
        next();

    } catch (err) {

        return res.render("Login",{
            error:`Session End!!! Please Login`
        })

    }
};

export default middleware;