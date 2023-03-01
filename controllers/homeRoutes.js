const router = require('express').Router();
const { Profile, User } = require('../models');
const withAuth = require('../util/auth');

router.get('/', async (req, res) => {
    try{
        const profileData = await Profile.findAll({
            include: [
                {
                    model: User,
                    attributes: {exclude:["password"]},
                },
            ],
        });

        const profiles = profileData.map((post) => post.get({ plain: true }));

        res.render('homepage', {
            profiles,
            logged_in: req.session.logged_in
        });
    } catch(err) {
        console.log(err)
        res.status(500).json(err);
    }

    });

    module.exports = router;