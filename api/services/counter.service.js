const Model = require('../../models/Counter')


module.exports.start = async function () {
    const data = { counter: 0 }
    return await Model.create(data)
}

module.exports.getAll = async function () {
    let counter
    try {
        const counters = await Model.find({})
        counter = counters[0]
    } catch (err) {
        throw err
    }
    return counter
}

module.exports.post = async function () {
    let updated
    try {
        const count = await Model.find({})
        const id = count[0]?._id
        updated = await Model.findByIdAndUpdate({ _id: id }, { $inc: { counter: +1 } })
    } catch (err) {
        throw err
    }
    return updated
}