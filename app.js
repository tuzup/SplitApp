var dotenv = require('dotenv')
var express = require('express')
var logger = require('./helper/logger')
var requestLogger = require('./helper/requestLogger')
var apiAuth = require('./helper/apiAuthentication')
var cors = require('cors')

const path = require('path');
dotenv.config()

var usersRouter = require('./routes/userRouter')
var gorupRouter = require('./routes/groupRouter')
var expenseRouter = require('./routes/expenseRouter')

var app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)

app.use('/api/users', usersRouter)
app.use('/api/group', apiAuth.validateToken,gorupRouter)
app.use('/api/expense', apiAuth.validateToken,expenseRouter)

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
   }

//To detect and log invalid api hits 
app.all('*', (req, res) => {
    logger.error(`[Invalid Route] ${req.originalUrl}`)
    res.status(404).json({
        status: 'fail',
        message: 'Invalid path'
      })
})

const port = process.env.PORT || 3001
app.listen(port, (err) => {
    console.log(`Server started in PORT | ${port}`)
    logger.info(`Server started in PORT | ${port}`)
})
