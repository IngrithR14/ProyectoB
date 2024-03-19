const routes = require('express').Router()

const {
    findAll,
    findById,
    save,
    update,
    deleteCompetitor
} = require ('./../Controllers/CompetitorController')

routes.get("/",findAll)

routes.get("/:id",findById)

routes.post("/:id",save)

routes.put("/:id",update)

routes.delete("/:id",deleteCompetitor)

module.exports = routes;