import axios from 'axios'

const REDES_REST_API_URL = 'http://localhost:8080/redesocial';

class RedesService{

  getRedes(){
    return axios.get(REDES_REST_API_URL);
  }

  getRedesById(id) {
    return axios.get(REDES_REST_API_URL + '/' + id);
  }

  createRedes(RedeSocial){
    return axios.post(REDES_REST_API_URL, RedeSocial);
  }

  getRedesByCampus(campusId){
    return axios.get(REDES_REST_API_URL + '/campus/' + campusId);
  }

  deleteRede(redeId){
    return axios.delete(`${REDES_REST_API_URL}/${redeId}`);
  }
  
  updateRede(redeId, rede){
    return axios.put(`${REDES_REST_API_URL}/${redeId}`, rede);
  }
}

export default new RedesService()