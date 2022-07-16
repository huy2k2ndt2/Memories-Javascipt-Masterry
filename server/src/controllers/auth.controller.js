const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserModal = require("../models/user.schema.js");
require("dotenv").config();

const generateToken = (id) => {
  const accessToken = jwt.sign(
    {
      userId: id,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: "5s",
    }
  );

  const refreshToken = jwt.sign(
    {
      userId: id,
    },
    process.env.REFRESH_TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  return {
    accessToken,
    refreshToken,
  };
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const { accessToken, refreshToken } = generateToken(oldUser._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ result: oldUser, token: accessToken });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw new Error("Invalid refresh token");
    }

    const { userId } = jwt.decode(refreshToken, process.env.REFRESH_TOKEN_KEY);

    if (!userId) {
      throw new Error("Invalid refresh token");
    }

    const { accessToken, refreshToken: newRefreshToken } =
      generateToken(userId);

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      path: "/v1/api/auth/refresh-token",
      maxAge: 2 * 60 * 60 * 1000,
    });

    res.json({
      message: "Refresh token Success",
      newAccessToken: accessToken,
    });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  signin,
  signup,
  handleRefreshToken,
};
