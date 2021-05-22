

function controllers (model){

    function createOne(req, res, next) {
        model.create(req.body)
            .then(data => {
                res.status(201).send(data)
            }).catch(next)
    }
    function updateOne(req, res, next) {
        model.findByIdAndUpdate(req.params.id, req.body)
            .then(data => {
                res.send(data)
            })
            .catch(next)
    }
    function getAll(req, res, next) {
        model.find({})
            .then(data => {
                res.send(data)
            })
            .catch(next)
    }
    function getOne(req, res, next) {
        model.findById(req.params.id)
            .then(data => {
                res.send(data)
            })
            .catch(next)
    }
    function deleteOne(req, res, next) {
        model.findByIdAndRemove(req.params.id)
            .then(data => {
                req.send(data)
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