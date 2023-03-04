const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers.js');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { getAgents, getSprays, getMaps, getWeapons, getSpecifiedMap } = require('./utils/valorantHelpers');

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// middleware for valorant weapons on all templates
app.use(async (req, res, next) => {
  try {
    const weaponMap = await getWeapons();
    res.locals.weaponMap = weaponMap;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// middleware for valorant agents on all templates
app.use(async (req, res, next) => {
  try {
    const agentMap = await getAgents();
    res.locals.agentMap = agentMap;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Middleware for Valorant sprays on all templates
app.use(async (req, res, next) => {
  try {
    const sprayMap = await getSprays();
    res.locals.sprayMap = sprayMap;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Middleware for Valorant maps on all templates, generates a random map and their splashart
app.use(async (req, res, next) => {
  try {
    const maps = await getMaps();
    if (maps.length === 0) {
      throw new Error('No maps found');
    }
    const randomMapIndex = Math.floor(Math.random() * maps.length);
    const randomMap = maps[randomMapIndex];
    res.locals.randomSplash = randomMap.splash;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

app.use(async (req, res, next) => {
  try {
    const maps = await getSpecifiedMap();
    res.locals.maps = maps;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});