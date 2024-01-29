const express = require("express");
const passport = require("passport");
const session = require("express-session");
require("./model/db");
require("./auth/passport-config")(passport);
const authRoutes = require("./routes/auth");
const flash = require("connect-flash");
const ensureAuthenticated = require("./middlewares/authMiddleware");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: "elephant",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRoutes);

app.get("/", ensureAuthenticated, (req, res) => {
  res.send("Hello, utente autenticato!");
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
