const router = require('express').Router();
const { User, Profile } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);
    console.log(req.body);
//save method allows us to add or update properties on the session object
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ 
      where: { email: req.body.email },
      include: [
        { 
          model: Profile,
          attributes: ['user_username', 'bio'],
        }
      ] 
  });
console.log(userData);
    if (!userData) {
      res
        .status(400)
        .json({ message: 'A single battle between us, and victory.  Try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Let's go. World's not saving itself. Try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: "You want to play? Let's play!" });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    // Delete the user with the given ID
    await User.destroy({ where: { id: id } });

    res.status(204).end(); // send a "No Content" response
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "No user with provided id."})
    res.status(500).json({ error: "Failed to delete user account." });
  } // catch
}); // DELETE user 

module.exports = router;
