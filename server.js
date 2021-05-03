require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3300
const session = require('express-session')
const mongoose = require('mongoose')
const flash = require('express-flash')
const mongoURI = 'mongodb://localhost/pizza'
const MongoDbStore = require('connect-mongo')(session)

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
})

const connection = mongoose.connection

connection
	.once('open', () => {
		console.log('Database connected')
	})
	.catch((err) => {
		console.log('Database connection error')
	})

//session store
let mongoStore = new MongoDbStore({
	mongooseConnection: connection,
	collection: 'sessions',
})

//session
app.use(
	session({
		secret: process.env.COOKIE_SECRET,
		resave: false,
		store: mongoStore,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 60 * 24 },
	}),
)

app.use(flash())

//Assets
app.use(express.static('public'))
app.use(express.json())

//Global middleware
app.use((req, res, next) => {
	res.locals.session = req.session
	next()
})

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')
require('./routes/web')(app)

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`)
})
