const express = require('express')
const app = express()
const passport = require('passport')
const LocalStrategy = require('passport-local')
const passportLocalMongoose = require('passport-local-mongoose')
const bodyParser = require('body-parser')
const mothodOverride = require('method-override')
const mongoose = require('mongoose')
const Comment = require('./models/comment')
const seedDb = require('./seed')
const User = require("./models/user")
const yelCamp = require("./models/yel_model")
const campgroundRoutes = require('./routes/campground')
const commentRoutes = require('./routes/comment')
const authRoutes = require('./routes/auth')
const editRoutes = require('./routes/edit')
const flash = require('connect-flash')
    // const static = require('./static/public')
const port = 3000
mongoose.connect('mongodb://localhost/yelp_camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true

})
app.use(bodyParser.urlencoded({ extended: true }))
app.set('view engine', 'ejs')
app.use(mothodOverride('_method'))
app.use(flash());
app.use(express.static('public'))
    // seedDb();

// PASSPORT CONFIG

app.use(require('express-session')({
    secret: 'ANything',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req, res, next) => {
    res.locals.currentuser = req.user
    next()
})

app.use(campgroundRoutes)
app.use(commentRoutes)
app.use(authRoutes)
app.use(editRoutes)





app.listen(port, () => console.log(`Example app listening on port port!`))