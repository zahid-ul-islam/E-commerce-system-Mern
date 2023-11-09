const jwt = require("jsonwebtoken");
const createJWT = (payload, secret, expiresIn) => {
  if (typeof payload !== "object" || !payload) {
    throw new Error("payload must be a non-empty object");
  }
  if (typeof secret !== "string" || secret === "") {
    throw new Error("secret key must be a non-empty string");
  }
  try {
    const token = jwt.sign(payload, secret, { expiresIn });
    return token;
  } catch (error) {
    console.error("failed to sign the JWT:", error);
    throw error;
  }
};

module.exports = { createJWT };
