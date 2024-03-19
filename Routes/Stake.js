const routes = require('express').Router()

const {
    findAll,
    findById,
    save,
    update,
    deleteStake
} = require ('./../Controllers/StakeController')

routes.get("/",findAll)

routes.get("/:id",findById)

routes.post("/:idC/:idE",save)

routes.put("/:id",update)

routes.delete("/:id",deleteStake)

module.exports = routes;