const router = require('express').Router();
const { User, Profile } = require('../../models');
const withAuth = require('../../utils/auth');

// Define routes for /api/profiles

// POST new profiles
router.post('/', withAuth, async (req, res) => {
  try {console.log("it works");
    const newProfile = await Profile.create({
      ...req.body,
      user_id: req.session.user_id,
    });
   
    res.status(200).json(newProfile);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// GET one profile
// router.get('/:id', async (req, res) => {
//   try {
//     const profileData = await Profile.findByPk(req.params.id, {
  
//       });
//       console.log(profileData);
//     if (!profileData) {
//       res.status(404).json({ message: 'No profile found with this id!' });
//       return;
//     } // if
//     res.status(200).json(profileData);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   } // catch
// }); // GET profile

// POST a new profile
// router.post('/newprofile', withAuth, async (req, res) => {
//   try {
//     const newProfile = await Profile.create({
//       ...req.body,
//       user_id: req.session.user_id,
//     });
//     res.status(200).json(newProfile);
//   } catch (err) {
//     res.status(400).json(err);
//   } // catch
// }); // POST profile

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
router.delete("/:id", async (req, res) => {
  try {
    const profileId = req.params.id;

    // Delete the profile with the given ID
    await Profile.destroy({ where: { id: profileId } });

    res.status(204).end(); // send a "No Content" response
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete profile." });
  } // catch
}); // DELETE profile

module.exports = router;
