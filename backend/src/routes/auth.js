const express = require('express');
const passport = require('passport');

const router = express.Router();


router.get('/github', passport.authenticate("github", {
  failureRedirect: "/"
}))

router.get('/github/callback', 
	passport.authenticate('github', { failureRedirect: '/'}),
	(req, res) => {
		req.session.save(() => {
			const user = req.user;
			
			res.redirect('/');
		})
	}
)

router.post('/logout', (req, res) => {
	req.logout();
	req.session.save(() => {
		res.status(200).send();
	});
})

module.exports = router;
