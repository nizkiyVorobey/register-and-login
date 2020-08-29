const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const cors = require('cors')


const app = express();

app.use(cors());
app.use(express.json({ extented: true }))
app.use('/api/auth', require('./routes/auth.routes'));


// app.use("/images", express.static("images"));
app.use("/uploadImages", express.static("uploadImages"));



const PORT = config.get('port') || 6000;

const start = async() => {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });

        app.listen(PORT, () => console.log(`Listren server on ${PORT}`))
    } catch (err) {
        console.log(err);
        process.exit()
    }
}

start()