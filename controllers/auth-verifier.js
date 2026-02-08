import jwt from 'jsonwebtoken';

function isLoggedIn(req, res, next) {
    try {
        if (!req.headers.authorization) return res.status(401).send({ message: "Unauthorized" });
        const token = req.headers.authorization.split(' ')[1];
        // prints token
        // console.log(token);
        const data = jwt.verify(token, "SecretKey");
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).send({ message: "Unauthorized" });
    }
}

export default isLoggedIn;