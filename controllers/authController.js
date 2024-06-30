const users = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerController = async (req, res) => {
  console.log("Insider Register Function");
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  const profileImg = req.file;

  console.log(firstName, lastName, email, password, confirmPassword);
  try {
    if (!profileImg) {
      return res.status(400).json({ error: "No profile image uploaded" });
    }
    const profileImgPath = profileImg.path;
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(406).json("Account already exist!!! Please Login");
    } else {
      const hashedPassword = bcrypt.hashSync(password, 8);
      const newUser = new users({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        profileImg: profileImgPath,
      });
      await newUser.save();
      res
        .status(200)
        .json({ message: "User registered successfully", user: newUser });
    }
  } catch (err) {
    res.status(401).json(err, "server error");
  }
};

exports.loginController = async (req, res) => {
  console.log("Inside login function");
  const { email, password } = req.body;
  // console.log(email, password);
  try {
    const existingUser = await users.findOne({ email });
    if (!existingUser) {
      return res.status(404).json("Invalid Email/Password...");
    }

    const isPasswordValid = bcrypt.compareSync(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(404).json("Invalid Email/Password...");
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_PASSWORD
    );
    delete existingUser.password;

    res.status(200).json({ user: existingUser, token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};
