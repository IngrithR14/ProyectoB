const routes = require('express').Router()

const {
    findAll,
    findById,
    save,
    update,
    deleteEvent
} = require ('./../Controllers/EventController')

routes.get("/",findAll)

routes.get("/:id",findById)

routes.post("/",save)

routes.put("/:id",update)

routes.delete("/:id",deleteEvent)

module.exports = routes;