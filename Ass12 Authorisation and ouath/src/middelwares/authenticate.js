const jwt = require("jsonwebtoken");
require("dotenv").config()

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    }); 
  });
};

const authenticate = async (req, res, next) => {
  //if headers are not available in the request
  if (!req.headers.authorization) {
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });
  }

  //if authorization headers does not startswith Bearer
  if (!req.headers.authorization.startsWith("Bearer "))
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });

  //if all above sonditions fail then

  const token = await req.headers.authorization.trim().split(" ")[1];

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (error) {
    return res.status(400).send({ message: "Wrong email or password" });
    }
    
    // console.log(decoded);

    req.user = decoded.user;

    return next();
};


module.exports = authenticate;