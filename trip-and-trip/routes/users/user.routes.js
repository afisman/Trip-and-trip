const router = require('express').Router()
const User = require('./../../models/User.model')
const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')
const uploaderConfig = require('./../../config/uploader.config')


router.get('/list', isLoggedIn, (req, res, next) => {
    User
        .find()
        .select({ username: 1, role: 1 })
        .then(users => {
            res.render('user/user-list', { users })
        })
        .catch(err => console.log(err))
})

router.get('/:id/edit', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    User
        .findById(id).populate('plantsOfInterest')
        .then(userData => res.render('user/user-edit', userData))
        .catch(err => console.log(err))
})


router.post('/:id/edit', isLoggedIn, uploaderConfig.single('avatar'), (req, res, next) => {

    const { email, username, interests, dateOfBirth, plantsOfInterest, purpose } = req.body

    let query = { email, username, interests, dateOfBirth, plantsOfInterest, purpose }

    if (req.file) {
        query = { ...query, $push: { avatar: req.file.path } }
    }

    const { id } = req.params

    User
        .findByIdAndUpdate(id, query, { new: true })
        .then(() => res.redirect('/users/:id'))
        .catch(err => console.log(err))


})


///////CONTINUE
router.get('/:id', isLoggedIn, (req, res, next) => {
    res.send('No arriesgo')
})





module.exports = router