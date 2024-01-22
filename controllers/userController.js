const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("Donnée manquant");
  }
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("élément déjat instcrit");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  console.log("mot de pass hasher:", hashPassword);
  const user = await User.create({
    username,
    email,
    password: hashPassword,
  });
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("un probleme est survenue");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Donnée manquant");
  }

  const user = await User.findOne({ email });
  if (user && ( await bcrypt.compare(password, user.password))) {
    const acessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {expiresIn: "15m"}
    );

    res.status(200).json({ acessToken });
  } else {
    res.status(401);
    throw new Error("le mail ou le mot de passe est erronné ");
  }
 
});



const currentUser = asyncHandler(async (req, res) => {
  // console.log(req.body);

  // const {username, email, password } = req.body;
  // if (!username || !email || !password) {
  //     res.status(400);
  //     throw new Error ("Donnée manquant");
  // }
  res.json(req.user);

  // res.status(201).json('ok');
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};
