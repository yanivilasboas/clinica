import axios from 'axios';

const API_URL = "http://localhost:8080"


class PacienteService{

    retrieveAllPacientes(){
        return axios.get(`${API_URL}/publico/pacientes`)
    }

    savePaciente(paciente){
        return axios.post(`${API_URL}/publico/pacientes`, paciente)
    }
    
    deletePaciente(idPaciente){
        return axios.delete(`${API_URL}/publico/pacientes/${idPaciente}`)
    }

    updatePaciente(paciente){
        return axios.put(`${API_URL}/publico/pacientes`, paciente)
    }
}

export default new PacienteService();