import axios from 'axios';

const API_URL = "http://localhost:8080"


class MedicoService{

    retrieveAllMedicos(){
        return axios.get(`${API_URL}/publico/medicos`)
    }

    saveMedico(medico){
        return axios.post(`${API_URL}/auth/signup`, medico)
    }
    
    deleteMedico(idMedico){
        return axios.delete(`${API_URL}/publico/medicos/${idMedico}`)
    }

    updateMedico(medico){
        return axios.put(`${API_URL}/publico/medicos`, medico)
    }
}

export default new MedicoService();