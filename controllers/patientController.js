const { Patient: PatientModel } = require('../models/Patient')

const patientController = {

    create: async(req, res) => {
        try {
            const {
                name, 
                gender, 
                age, 
                weight, 
                height, 
                drive, 
                tel, 
                email, 
                plan, 
                start, 
                end, 
                feedback, 
                update, 
                active,
                createdBy,
            } = req.body

            const response = await PatientModel.create(req.body);

            res.status(201).json({ response, msg: 'Paciente cadastrado!' });

        } catch (error) {
            console.log(error)
        }
    },
    getAll: async (req, res) => {
        try {
            const patients = await PatientModel.find();

            res.json(patients);

        } catch (error) {
            console.log(error);
        }
    },
    get: async(req, res) => {
        try {
            const id = req.params.id
            const patient = await PatientModel.findById(id);

            if(!patient) {
                res.status(404).json({ msg: 'Paciente não encontrado.' });
                return;
            }

            res.json(patient);

        } catch (error) {
            console.log(error);
        }
    },
    delete: async(req, res) => {
        try {
            const id = req.params.id
            const patient = await PatientModel.findByIdAndDelete(id);

            if(!patient) {
                res.status(404).json({ msg: 'Paciente não encontrado.' });
                return;
            }

            res.status(200).json({ patient, msg: 'Paciente excluído.' });

        } catch (error) {
            console.log(error);
        }
    },
    update: async(req, res) => {
        try {
            const id = req.params.id

            const {
                name, 
                gender, 
                age, 
                weight, 
                height, 
                drive, 
                tel, 
                email, 
                plan, 
                start, 
                end, 
                feedback, 
                update, 
                active,
                createdBy,
            } = req.body

            const updatedPatient = await PatientModel.findByIdAndUpdate(id, req.body)

            if(!updatedPatient) {
                res.status(404).json({ msg: 'Paciente não encontrado.' });
                return;
            }

            res.status(200).json({ patient, msg: 'Paciente atualizado com sucesso!'})

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = patientController;