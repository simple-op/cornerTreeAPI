const express = require('express');
const router = express.Router();
const passport = require('passport');
const jobs = require("../controllers/jobs");


router.post('/register_job',passport.authenticate('jwt',{session: false}),jobs.register);
router.post('/create_job',passport.authenticate('jwt',{session: false}),jobs.createReport);
router.get('/all_job',passport.authenticate('jwt',{session: false}),jobs.allReports);

module.exports = router;