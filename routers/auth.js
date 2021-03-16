const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerVal, loginVal } = require('../validation');

router.post('/register', async (req, res) => {
    //Data Validation before saving the user
    const { error } = registerVal(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //CHECKING IF THE USER EXIST
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already exist');

    //HASH PASSWORDS
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    
    //CREATE NEW USER
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });
    try {
        const savedUser = await user.save();
        res.send({ user: user._id });
    } catch (error) {
        res.status(400).send(error);
    }
});

//LOGIN
router.post('/login', async (req, res) => {
    //Data Validation before saving the user
    const { error } = loginVal(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    //CHECKING IF THE USER EXIST
    const user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Email or password is wrong');

    //CHECKING THE PASSWORD IF CORRECT
    const validPw= await bcrypt.compare(req.body.password, user.password);
    if (!validPw) return res.status(400).send('Invalid password');

    res.send('Logged in');
});

module.exports = router;