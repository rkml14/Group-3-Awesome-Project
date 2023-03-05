const router = require('express').Router();
const { Profile, User } = require('../models');
const withAuth = require('../utils/auth');
const { getAgentsFiltered, getWeapons, getMaps, getSpecifiedMap } = require('../utils/valorantHelpers');
const { paginate } = require('../utils/helpers');

router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Profile,
        },
      ],
    });

    const user = userData.map((user) => user.get({ plain: true }));
    res.render('homepage', {
      user,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/myprofile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const profileData = await Profile.findOne({
      where: {
        id: req.session.user_id,
      },
      include:[{ model: User,
      attributes: {include:['username']},
       }],
    });
    if(profileData == null){
      res.redirect('/createprofile')
    }
    else{
    const profile = profileData.get({ plain: true });
    res.render('myprofile', {
      profile,
      logged_in: req.session.logged_in,
    })
  };
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/leaderboard', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
      attributes: { exclude: ['password'] },
      include: { model: Profile },
    });
    const users = userData.get({ plain: true });
    res.render('leaderboard', {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/myprofile');
    return;
  }

  res.render('login');
});

router.get('/aboutus', (req, res) => {
  return res.render('aboutus', {});
});

router.get('/contact', (req, res) => {
  return res.render('contact', {});
});

router.get('/createprofile', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: Profile,
        },
      ],
    });

    const user = userData.map((user) => user.get({ plain: true }));

    res.render('createprofile', {
      user,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/agents', async (req, res) => {
  try {
    const agentMap = await getAgentsFiltered();
    const page = parseInt(req.query.page) || 1;
    const pageSize = 8; // number of agents per page
    const { data: paginatedAgents, paginationInfo } = paginate(
      agentMap,
      page,
      pageSize
    );
    res.render('agents', {
      agents: paginatedAgents,
      paginationInfo: paginationInfo,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/weapons', async (req, res) => {
  try {
    const weapons = await getWeapons();
    res.render('weapons', { weapons });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving weapons data');
  }
});

router.get('/maps', async (req, res) => {
  try {
    const maps = await getMaps();
    res.render('maps', { maps });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving maps data');
  }
});

module.exports = router;
