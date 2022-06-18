var dotenv = require('dotenv')
var express = require('express')
var logger = require('./helper/logger')
var requestLogger = require('./helper/requestLogger')

dotenv.config()

var usersRouter = require('./routes/userRouter')
var gorupRouter = require('./routes/groupRouter')
var expenseRouter = require('./routes/expenseRouter')

var app = express()
app.use(express.json())
app.use(requestLogger)

app.use('/users', usersRouter)
app.use('/group', gorupRouter)
app.use('/expense', expenseRouter)

const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server started in PORT | ${port}`)
    logger.info(`Server started in PORT | ${port}`)
})