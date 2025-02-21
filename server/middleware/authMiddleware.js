import jwt from "jsonwebtoken";
const secret = "test";

const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.headers);
    const token = req.headers.authorization.split(" ")[1];
    // const token = req.headers["authorization"];
    // if (!token) return res.status(403).json({ message: "Access Denied" });
    // if (token.startsWith("Bearer ")) {
    //   token = token.slice(7, token.length).trimLeft();
    // }
    console.log(token, "token");
    // check token is custom or google generated one(if it's length is < 500 it is custom else it is google generated one)
    const isCustomAuth = token.length < 500;
    let decodedData;

    if (token && isCustomAuth) {
      //if token is generated through custom authentication
      decodedData = jwt.verify(token, secret);
      req.userId = decodedData?.id;
    } else {
      //if token is generated through google authentication
      decodedData = jwt.decode(token);
      req.userId = decodedData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default authMiddleware;
