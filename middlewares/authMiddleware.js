import JWT from "jsonwebtoken";
const authMiddleware = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      let user = JWT.verify(token, process.env.JWT_SECRET);
      req.userId = user.id;
    } else {
      res.status(401).send({ message: "Unauthorized user" });
    }
    next();
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized user",
      error,
    });
  }
};
export default authMiddleware;
