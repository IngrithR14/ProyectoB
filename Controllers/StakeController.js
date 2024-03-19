const Competitor = require('./../Models/ModelCompetitor')
const Stake= require('./../Models/ModelStake')
const Event= require('./../Models/ModelEvent')

module.exports = {
    findAll : async(req,res) => {
        try {
            const data = await Stake.find({})

            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },

    findById : async(req,res) => {
        const {id} = req.params
        try {
            const data = await Stake.findOne({id:id})
            //const data = await Course.findById(id).populate("students")
            // esa linea comentada se usa para obtener los datos completos de los estudiantes asociados a un curso
            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },

    save: async (req, res) => {
        const { idC, idE } = req.params; // Corregir la desestructuración
    
        try {
            const event = await Event.findOne({ id: idE }); // Buscar el evento por ID
            const competitor = await Competitor.findOne({ id: idC }); // Buscar el competidor por ID
            
            if (event && competitor) {
                const stake = new Stake(req.body);
                stake.competitor = competitor._id;
                stake.event = event._id;
                const result = await stake.save();
                
                // Asociar la apuesta al competidor y al evento
                competitor.stakes.push(stake);
                event.stakes.push(stake);
    
                // Guardar los cambios en el competidor y el evento
                await competitor.save();
                await event.save();
    
                return res.status(200).json({ state: true, data: result });
            } else {
                return res.status(404).json({ state: false, error: 'Competidor o evento no existen' });
            }
        } catch (error) {
            console.error('Error al guardar la apuesta:', error);
            return res.status(500).json({ state: false, error: 'Error interno del servidor' });
        }
    },
    update : async (req, res) => {
        const {id} = req.params; 
        const nuevoDatos = req.body; 
        try {
          const data = await Stake.findOneAndUpdate({ id: id }, nuevoDatos, { new: true });
          if (!data) {
            return res.status(404).json({ "state": false, "error": "Registro no encontrado" });
          }
          return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
          return res.status(500).json({ "state": false, "error": error });
        }
      },
      deleteStake: async (req, res) => {
        const { id } = req.params; 
        try {
            // Buscar el stake a eliminar
            const deletedStake = await Stake.findOneAndDelete({ id: id });
            if (!deletedStake) {
                return res.status(404).json({ "state": false, "error": "Stake no encontrado" });
            }
    
            // Eliminar el stake de la lista de stakes del competidor asociado
            await Competitor.updateOne(
                { stakes: deletedStake._id}, // Condición para encontrar al competidor que tiene al stake en su lista de stakes
                { $pull: { stakes: deletedStake._id } } // Eliminar el stake de la lista de stakes del competidor
            );
    
            // Eliminar el stake de la lista de stakes del evento asociado
            await Event.updateOne(
                { stakes: deletedStake._id }, // Condición para encontrar el evento que tiene al stake en su lista de stakes
                { $pull: { stakes: deletedStake._id } } // Eliminar el stake de la lista de stakes del evento
            );
    
            return res.status(200).json({ "state": true, "data": deletedStake });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    }
    

}