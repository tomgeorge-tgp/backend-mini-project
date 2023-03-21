const register = async (req, res) => {
   // const { firstName,lastName,phoneNumber,email,password,address,city,state,country,zipCode } = req.body;
    console.log(req.body);
    // const emailAlreadyExists = await User.findOne({ email });
    // if (emailAlreadyExists) {
    //   throw new CustomError.BadRequestError('Email already exists');
    // }
  
    // first registered user is an admin
    // const isFirstAccount = (await User.countDocuments({})) === 0;
    // const role = isFirstAccount ? 'admin' : 'user';
  
    // const verificationToken = crypto.randomBytes(40).toString('hex');
  
    // const user = await User.create({
    //   firstName,
    //   lastName,
    //   phoneNumber,
    //   email,
    //   password,
     
    // });
    //const origin = 'http://localhost:3000';
  
   //console.log("here",user);
  
    // res.status(StatusCodes.CREATED).json({
    //   msg: 'Success! Please check your email to verify account'
    //   ,user:{_id: user._id,firstName:user.firstName,lastName:user.lastName,phoneNumber:user.phoneNumber,email:user.email}, errors: []
    // });
   };

   export {
    register,
    // login,
    // logout,
    
  };
  