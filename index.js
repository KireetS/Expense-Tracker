require('dotenv').config();
const connectToMongo = require('./db')
const express = require("express")
const cors = require("cors")
connectToMongo()

const app = express()
const port = process.env.PORT||5000
const corsOptions = {
  origin: "https://expensetrackerbackend-jpv8at9jk-kireets.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

app.use(express.json())
app.use("/api/auth" , require("./routes/auth"))
app.use("/api/expenses" , require("./routes/expenses"))
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})