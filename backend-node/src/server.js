const cors = require('cors');
const mongoose = require("mongoose");
const express = require('express');
const PORT = process.env.PORT || 3000

require("dotenv").config();

const authRoutes = require('./routes/auth');
const recipeRoutes = require('./routes/recipe');
const imageRoutes = require('./routes/images')


const app = express()
app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Up and running")
})

app.use('/api/auth', authRoutes);
app.use('/api/recipe', recipeRoutes);
app.use('/api/images/', imageRoutes);

/*app.get('*', (req, res) => {
  res.send('This route does not exist')
})*/

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on PORT ${PORT}`)
        })
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
})
