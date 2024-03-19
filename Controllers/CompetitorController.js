const Competitor = require('./../Models/ModelCompetitor')
const Discipline= require('./../Models/ModelDiscipline')
const Stake = require('./../Models/ModelStake')
const Event = require('./../Models/ModelEvent')
const StakeController = require('./StakeController')

module.exports = {
    findAll : async(req,res) => {
        try {
            const data = await Competitor.find({})

            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },

    findById : async(req,res) => {
        const {id} = req.params
        try {
            const data = await Competitor.findOne({id:id})
            //const data = await Course.findById(id).populate("students")
            // esa linea comentada se usa para obtener los datos completos de los estudiantes asociados a un curso
            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },

    save : async(req,res)=>{
        const {id} = req.params;
        try {
            // Verificar si la disciplina existe
            const discipline = await Discipline.findOne({ id: id });
            if (!discipline) {
                return res.status(404).json({ state: false, error: 'La disciplina no existe' });
            }
    
            // Crear el competidor y asignarle la disciplina
            const competitor = new Competitor(req.body);
            competitor.discipline = discipline._id;
            
            // Guardar la disciplina primero para asegurarse de que esté en la base de datos
            await discipline.save();
    
            // Guardar el competidor
            const result = await competitor.save();
            // Asociar el competidor a la disciplina
            discipline.competitors.push(competitor);
            await discipline.save();
    
            console.log(`Competidor guardado correctamente: ${result}`);
    
            return res.status(200).json({ state: true, data: result });
        } catch (error) {
            console.error('Error al guardar el competidor:', error);
            return res.status(500).json({ state: false, error: 'Error interno del servidor' });
        }
       
      },
      update : async (req, res) => {
          const {id} = req.params; 
          const nuevoDatos = req.body; 
          try {
            const data = await Competitor.findOneAndUpdate({ id: id }, nuevoDatos, { new: true });
            if (!data) {
              return res.status(404).json({ "state": false, "error": "Registro no encontrado" });
            }
            return res.status(200).json({ "state": true, "data": data });
          } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
          }
        },
        deleteCompetitor: async (req, res) => {
            const { id } = req.params; 
            try {
                // Buscar el competidor a eliminar
                const deletedCompetitor = await Competitor.findOne({ id: id });
                if (!deletedCompetitor) {
                    return res.status(404).json({ "state": false, "error": "Competidor no encontrado" });
                }

                // Buscar y actualizar la lista de stakes asociados al evento
                const event = await Event.findOne({ "stakes.competitor": deletedCompetitor._id });
                if (event) {
                    event.stakes = event.stakes.filter(stake => stake.competitor.toString() !== deletedCompetitor._id.toString());
                    await event.save();
                }
        
                // Eliminar todos los stakes asociados al competidor
                await Stake.deleteMany({ competitor:deletedCompetitor._id});
        
                // Actualizar la lista de competidores de la disciplina
                await Discipline.updateMany(
                    { competitors: deletedCompetitor._id }, // Condición para encontrar disciplinas que tengan al competidor
                    { $pull: { competitors: deletedCompetitor._id } } // Eliminar al competidor de la lista de competidores
                );
        
                
        const deletedCompetitor2 = await Competitor.findOneAndDelete({id:id});
                return res.status(200).json({ "state": true, "data": deletedCompetitor2 });
            } catch (error) {
                return res.status(500).json({ "state": false, "error": error });
            }
        }
        
}