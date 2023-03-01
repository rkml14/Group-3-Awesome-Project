const router = require('express').Router();
const { Profile, User } = require('../models') 
const withAuth = require('../utils/auth')

router.get('/', async (req, res) => {
  try{
    const profileData = await Profile.findAll({
      include: [
        {
          model: User,
          attributes: {exclude:['password']},
        },
      ],
    });

const profiles = profileData.map((profile) => profile.get({ plain: true }));

res.render('homepage', {
  profiles,
  logged_in: req.session.logged_in
});
  } catch(err) {
    res.status(500).json(err);
  }
});  

router.get('/profiles/:id', withAuth, async (req, res) => {
  try {
    const profileData = await Profile.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: {include:['username']},
        },
      ],
    });

    const profile = profileData.get({ plain: true });

    res.render('blogpost', {
      ...profile,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;