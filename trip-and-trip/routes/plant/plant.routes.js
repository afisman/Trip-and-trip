const router = require('express').Router()
const Plant = require('./../../models/Plant.model')
const { isLoggedIn } = require('./../../middleware/session-guard')
const { checkRole } = require('./../../middleware/role-checker')



router.get('/plants', isLoggedIn, (req, res, next) => {

    Plant
        .find()
        .then(plants => {
            res.render('plant/plants-list', { plants })
        })
        .catch(err => console.log(err))
})

router.get('/plants/create', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    res.render('plant/new-plant')
})

router.post('/plants/create', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { sName, cName, region, culture, files, properties, description } = req.body
    const createPlant = req.body

    Plant
        .create(createPlant)
        .then(res.redirect('/plants'))
        .catch(err => console.log(err))
})

router.get('/plants/:id', isLoggedIn, (req, res, next) => {

    const { id } = req.params

    Plant
        .findById(id)
        .then(plant => res.render('plant/plants-details', plant))
        .catch(err => console.log(err))

})

router.get('/plants/:id/edit', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params

    Plant
        .findById(id)
        .then(plant => res.render('plant/plants-edit', plant))
        .catch(err => console.log(err))
})

router.post('/plants/:id/edit', isLoggedIn, checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { sName, cName, region, culture, files, properties, description } = req.body
    const createPlant = { sName, cName, region, culture, files, properties, description }
    const { id } = req.params
    console.log(id)


    Plant
        .findByIdAndUpdate(id, createPlant, { new: true })
        .then(plant => res.render('plant/plants-details', plant))
        .catch(err => console.log(err))

})

router.get('/plants/:id/delete', checkRole('CHAMAN', 'HIEROPHANT'), (req, res, next) => {

    const { id } = req.params

    Plant
        .findByIdAndDelete(id)
        .then(() => res.redirect('/plants'))
        .catch(err => console.log(err))
})

router.get('/api/plants', (req, res, next) => {

})





module.exports = router