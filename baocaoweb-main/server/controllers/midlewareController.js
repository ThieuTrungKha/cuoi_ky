const jwt = require("jsonwebtoken");


const middlewareController = {
  verifyToken: (req, res, next) => {
    try {
      const token = req.cookies.accessToken;
      if (token) {

        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
          if (err) {
            res.status(403).json("Token is not valid!");
          }
          req.user = user;
          next();
        });
      } else {
        res.status(401).json("You're not authenticated");
      }
    } catch (error) {
      console.error("Error in verifyToken middleware:", error);
      res.status(500).json("Internal Server Error");
    }
  }
}

module.exports = middlewareController;
