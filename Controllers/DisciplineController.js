const Discipline = require('./../Models/ModelDiscipline')
const Competitor = require('./../Models/ModelCompetitor')
const Stake = require('./../Models/ModelStake')
const Event = require('./../Models/ModelEvent')

module.exports = {
    findAll : async(req,res) => {
        try {
            const data = await Discipline.find({})

            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },

    findById : async(req,res) => {
        const {id} = req.params
        try {
            const data = await Discipline.findOne({id:id})
            if (!data) {
                return res.status(404).json({ state: false, error: 'Disciplina no encontrada' });
            }
            //const data = await Course.findById(id).populate("students")
            // esa linea comentada se usa para obtener los datos completos de los estudiantes asociados a un curso
            return res.status(200).json({"state":true,"data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },

    save : async (req,res)=>{
        const discipline = new Discipline(req.body)
    
        try {
            const data = await discipline.save()

            return res.status(200).json({"state":true, "data":data})
        } catch (error) {
            return res.status(500).json({"state":false,"error":error})
        }
    },
    update : async (req, res) => {
        const {id} = req.params; 
        const nuevoDatos = req.body; 
        try {
          const data = await Discipline.findOneAndUpdate({ id: id }, nuevoDatos, { new: true });
          if (!data) {
            return res.status(404).json({ "state": false, "error": "Registro no encontrado" });
          }
          return res.status(200).json({ "state": true, "data": data });
        } catch (error) {
          return res.status(500).json({ "state": false, "error": error });
        }
      },
      deleteDiscipline: async (req, res) => {
        const { id } = req.params; 
        try {
            const discipline = await Discipline.findOne({ id: id });
            if (!discipline) {
                return res.status(404).json({ "state": false, "error": "Disciplina no encontrada" });
            }
            
            const competitors = await Competitor.find({ discipline: discipline._id });
            for (const competitor of competitors) {
                await Stake.deleteMany({ competitor: competitor._id });
                await Competitor.findOneAndDelete({ _id: competitor._id });
            }
    
            await Discipline.findOneAndDelete({ id: id });
    
            return res.status(200).json({ "state": true, "message": "Disciplina eliminada correctamente" });
        } catch (error) {
            return res.status(500).json({ "state": false, "error": error });
        }
    }
    
    
}