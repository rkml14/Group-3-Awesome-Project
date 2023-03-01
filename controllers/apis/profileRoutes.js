const router = require('express').Router();
const { User, Profile } = require('../../models');
const withAuth = require('../../utils/auth');

// Define routes for /api/profiles

// GET all profiles
router.get('/', async (req, res) => {
  try {
    const profileData = await Profile.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  } // catch
}); // GET profiles

// GET one profile
router.get('/:id', async (req, res) => {
  try {
    const profileData = await Profile.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });
    if (!profileData) {
      res.status(404).json({ message: 'No profile found with this id!' });
      return;
    } // if
    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  } // catch
}); // GET profile

// POST a new profile
router.post('/', withAuth, async (req, res) => {
  try {
    const newProfile = await Profile.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newProfile);
  } catch (err) {
    res.status(400).json(err);
  } // catch
}); // POST profile

// PUT to update a profile
router.put('/:id', withAuth, async (req, res) => {
  try {
    const profileData = await Profile.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!profileData) {
      res.status(404).json({ message: 'No profile found with this id!' });
      return;
    } // if
    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  } // catch
}); // PUT profile

// DELETE a profile
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const profileData = await Profile.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!profileData) {
      res.status(404).json({ message: 'No profile found with this id!' });
      return;
    } // if
    res.status(200).json(profileData);
  } catch (err) {
    res.status(500).json(err);
  } // catch
}); // DELETE profile

module.exports = router;
