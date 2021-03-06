const { Router } = require("express")
const { body, validationResult } = require('express-validator');
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const config = require('config');
const router = Router();

const formidable = require('formidable');
const fs = require('fs');

router.post(
    "/login", [
        body('emailOrLogin', 'Invalid email').isLength({ min: 1 }),
        body('password', 'Invalid password').isLength({ min: 1 }),
    ],
    async(req, res) => {

        console.log(req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "You send invalid data"
            })
        }

        const { emailOrLogin, password } = req.body;

        const user = await User.findOne({ $or: [{ email: emailOrLogin }, { userName: emailOrLogin }] });

        if (!user) {
            return res.status(400).json({
                message: "you not registered"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                message: 'not correct password, try again'
            })
        }

        const token = jwt.sign({ userId: user.id },
            config.get('jwtSecret'), // секретный ключ
            { expiresIn: '1h' } // сколько бкдет действителен токен, это по идеи если использовть потом jwt.verify()
        )


        res.status(200).json({ token, user })

    })


router.post(
    "/register",
    (req, res) => {
        const form = formidable({ multiples: true });

        form.parse(req, async(err, fields, files) => {

            const { email, userName, password } = fields;

            const user = await User.findOne({ $or: [{ email: email }, { userName: userName }] });

            if (user) {
                if (user.email === email) {
                    return res.status(400).json({
                        message: "user with such email already exist "
                    })
                } else if (user.userName === userName) {
                    return res.status(400).json({
                        message: "user with such userName already exist "
                    })
                }
            }

            const oldPath = files.avatar.path;
            const newPath = "/home/senya/work/register-login/uploadImages/" + files.avatar.name
            const rawData = await fs.readFileSync(oldPath)

            await fs.writeFile(newPath, rawData, function(err) {
                if (err) console.log(err)
                console.log("Successfully uploaded")
            })


            const hashedPassword = await bcrypt.hash(password, 12);

            const newUser = new User({
                email,
                userName,
                password: hashedPassword,
                avatar: config.get('baseURL') + '/uploadImages/' + files.avatar.name
            })

            await newUser.save()

            res.status(200).json({ user: newUser, message: "You was registered" })

        })
    })


module.exports = router;