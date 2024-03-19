const routes = require('express').Router()

const {
    findAll,
    findById,
    save,
    update,
    deleteDiscipline
} = require ('./../Controllers/DisciplineController')

routes.get("/",findAll)

routes.get("/:id",findById)

routes.post("/",save)

routes.put("/:id",update)

routes.delete("/:id",deleteDiscipline);

module.exports = routes;