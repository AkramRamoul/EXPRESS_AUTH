const User = require("../model/User");
const bcrypt = require("bcrypt");
const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const duplicate = await User.findOne({ username: user });
  if (duplicate) {
    return res.status(409).json({ message: "Username already taken" });
  }
  try {
    const hashedPwd = await bcrypt.hash(pwd, 10);
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    res.status(201).json({ message: `new user ${user} created` });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = { handleNewUser };
