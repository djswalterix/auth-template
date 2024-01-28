const User = require("../model/user.model"); // Assicurati che il percorso sia corretto
const bcrypt = require("bcrypt");
const passport = require("passport");

// register
exports.register = async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  let user = await User.findOne({ username: username });

  if (user) {
    return res.status(400).send("Utente già esistente");
  }

  const newUser = new User({ username, password });

  try {
    await newUser.save();
    res.status(201).send("Utente registrato con successo");
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).send("Credenziali errate");
    }

    // login
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send("Utente loggato correttamente");
    });
  })(req, res, next);
};
