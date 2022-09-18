const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const router = require("express").Router();
//  * Register
router.post("/auth/register", async (req, res) => {
  const { Firstname, Lastname, username, password, email } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);
  const user = new User({
    Firstname,
    Lastname,
    username,
    email,
    password: hashedPassword,
  });
  try {
    const saveduser = await user.save();
    res.status(200).json(saveduser);
  } catch (error) {
    res.status(500).json({ message: "register failed..." });
  }
});

//  * Login
router.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  const isValid = bcrypt.compareSync(password, user.password);

  try {
    if(user && !isValid){
      res.status(400).json({message:"Enter a valid password ..."})
    }
    if (user && isValid) {
      const accessToken = jwt.sign(
        {
          _id: user._id,
          username: user.username,
        },
        process.env.JWT_SEC , {expiresIn:"1d"}
      );

      const { password, ...others } = user._doc;
      return res.status(200).json({ ...others, accessToken });
    }
  } catch {
    res.status(500).json({ message: "Login failed..." });
  }
});

// logout 
router.post("/logout/:id" , async(req,res)=>{
  const user = await User.findById(req.params.id)
  try{
    if(user){
      res.status(200).send()
    }
  }catch{

  }

})
module.exports = router;
