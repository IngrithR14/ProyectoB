const Event = require('./../Models/ModelEvent')
const Stake = require('./../Models/ModelStake')
const Competitor = require('./../Models/ModelCompetitor')

module.exports = {
    findAll : async(req,res) => {
        try {
            const data = await Event.find({})

            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },

    findById : async(req,res) => {
        const {id} = req.params
        try {
            const data = await Event.findOne({id:id})
            //const data = await Course.findById(id).populate("students")
            // esa linea comentada se usa para obtener los datos completos de los estudiantes asociados a un curso
            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },

    save : async (req,res)=>{
        const event = new Event(req.body)
    
        try {
            const data = await event.save()

            return res.status(200).json({"state":true, "data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },
    update : async (req, res) => {
        const {id} = req.params; 
        const nuevoDatos = req.body; 
        try {
          const data = await Event.findOneAndUpdate({ id: id }, nuevoDatos, { new: true });
          if (!data) {
            return res.status(404).json({ "state": false, "error": "Registro no encontrado" });
          }
          return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
          return res.status(500).json({ "state": false, "error": error });
        }
      },
      deleteEvent: async (req, res) => {
        const { id } = req.params; 
        try {
            // Buscar el evento por su ID
            const event = await Event.findOne({ id: id }); // Busca por el campo 'id'
            if (!event) {
                return res.status(404).json({ "state": false, "error": "Evento no encontrado" });
            }
    
            // Eliminar todos los stakes asociados al evento
            await Stake.deleteMany({ event: event._id });
    
            // Actualizar la lista de stakes de los competidores
            const competitorsToUpdate = await Competitor.find({ 'stakes.event': event._id });
    
            for (const competitor of competitorsToUpdate) {
                competitor.stakes = competitor.stakes.filter(stake => stake.event.toString() !== event._id);
                await competitor.save();
            }
    
            // Eliminar el evento usando el campo _id
            const deletedEvent = await Event.findOneAndDelete({ _id: event._id });
    
            return res.status(200).json({ "state": true, "data": deletedEvent });
        } catch (error) {
            console.error(error.toString());
            return res.status(500).json({ "state": false, "error": error });
        }
    }
    
    
}