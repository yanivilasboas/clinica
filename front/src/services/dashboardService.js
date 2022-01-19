import axios from 'axios';

const API_URL = "http://localhost:8080"
class DashboardService {
  dashboard() {
    return axios.post(`${API_URL}/publico/dashboard`);
  }
}

export default new DashboardService();
