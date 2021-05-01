const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3300

//Assets
app.use(express.static('public'))

app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

app.get('/', (req, res, next) => {
	res.render('home')
	next()
})

app.get('/cart', (req, res, next) => {
	res.render('customers/cart')
	next()
})

app.get('/login', (req, res, next) => {
	res.render('auth/login')
	next()
})

app.get('/register', (req, res, next) => {
	res.render('auth/register')
	next()
})

app.listen(PORT, () => {
	console.log(`Listening to port ${PORT}`)
})
