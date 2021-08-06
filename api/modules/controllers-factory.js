

function controllers (model){

    function createOne(req, res, next) {
        model.create(req.body)
            .then(data => {
                res.status(201).json(data)
            }).catch(next)
    }
    function updateOne(req, res, next) {
        model.findByIdAndUpdate(req.params.id, req.body, { runValidators: true })
            .then(data => {
                res.json(data)
            })
            .catch(next)
    }
    function getAll(req, res, next) {
        model.find({})
            .then(data => {
                res.json(data)
            })
            .catch(next)
    }
    function getOne(req, res, next) {
        model.findById(req.params.id)
            .then(data => {
                res.json(data)
            })
            .catch(next)
    }
    function deleteOne(req, res, next) {
        model.findByIdAndRemove(req.params.id)
            .then(data => {
                res.json(data)
            })
            .catch(next)
    }

    return {
        createOne,
        updateOne,
        getAll,
        getOne,
        deleteOne
    }
}





module.exports = controllers