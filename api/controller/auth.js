
import User from '../modals/user.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === '' ||
    email === '' ||
    password === ''
  ) {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    
    const validUsers= await User.findOne({ username });
     if(validUsers){
      
      next(errorHandler(404,"this username is already taken"))
     }  
    const validUser = await User.findOne({ email });
        if (validUser) {
          return next(errorHandler(404, 'email already exist'));
        }
  const hashedPassword = bcryptjs.hashSync(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  
    await newUser.save();
    res.json('Signup successful');
  } catch (error) {
    next(error);
  }
}

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    next(errorHandler(400, 'All fields are required'));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }
    const token = jwt.sign(
      { id: validUser._id, isAdmin: validUser.isAdmin },
      'adarsh12123'
    );
  
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie('tokens', token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        httpOnly: false,
        sameSite: "none",
        secure: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { email, name, googlephotourl } = req.body;
 
  try {
    const user = await User.findOne({ email });
    
    if (user) {
      
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET
      ); 
      const { password, ...rest } = user._doc;
      // const updatedUser = await User.findByIdAndUpdate(
      //   validUser._id,
      //   {
      //     $set: {
      //       token
      //     },
      //   },
        
      // );
      res
      .status(200)
      .cookie('tokens', token, {
        expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: false,
    sameSite: "none",
    secure: true,
      })
      .json(rest);
        
    } else {
     
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          name.toLowerCase().split(' ').join('') +
          Math.random().toString(9).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlephotourl,
      });
      await newUser.save();
      const token = jwt.sign(
        { id: newUser._id, isAdmin: newUser.isAdmin },
        process.env.JWT_SECRET
      );
      const { password, ...rest } = newUser._doc;
      res.send("sign IN sucessfully")
        .status(200)
       .json(rest);
    }
  } catch (error) {
    next(error);
  }
}