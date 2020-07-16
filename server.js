require('dotenv').config()
const cors = require('cors')
const express = require('express')
const sendMail = require('./mail')

const app = express()

const PORT = process.env.PORT || 8000

// Data parsing
app.use(
  express.urlencoded({
    extended: false,
  })
)

app.use(express.json())

// Enable Cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
)

// Get request for testing
app.get('/', (req, res) => {
  res.json({ message: 'GET Request' })
})

// Post requst for sending email
app.post('/api/contact', (req, res) => {
  const { name, email, text } = req.body
  console.log(req.body)

  sendMail(name, email, text, (error, data) => {
    if (error) {
      res.status(500).json({ message: 'Internal Error' })
    } else {
      res.json({ message: 'Message successfully sent!', data })
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
