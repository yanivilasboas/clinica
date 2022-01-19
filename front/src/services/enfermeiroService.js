import axios from 'axios';

const API_URL = "http://localhost:8080"


class EnfermeiroService{

    retrieveAllEnfermeiros(){
        return axios.get(`${API_URL}/publico/enfermeiros`)
    }

    saveEnfermeiro(enfermeiro){
        return axios.post(`${API_URL}/publico/enfermeiros`, enfermeiro)
    }
    
    deleteEnfermeiro(idEnfermeiro){
        return axios.delete(`${API_URL}/publico/enfermeiros/${idEnfermeiro}`)
    }

    updateEnfermeiro(enfermeiro){
        return axios.put(`${API_URL}/publico/enfermeiros`, enfermeiro)
    }
}

export default new EnfermeiroService();