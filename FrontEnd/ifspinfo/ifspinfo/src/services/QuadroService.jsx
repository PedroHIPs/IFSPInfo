import axios from 'axios';

const QUADRO_REST_API_URL = 'http://localhost:8080/quadro';

class QuadroService {
  // Método para obter o quadro de um campus específico
  getQuadroByCampus(campusId) {
    return axios.get(QUADRO_REST_API_URL + '/campus/' + campusId);
  }

  // Método para obter avisos de um quadro específico
  getAvisosByQuadro(quadroId) {
    return axios.get(`${QUADRO_REST_API_URL}/${quadroId}/aviso`);
  }

  // Método para criar um aviso para um quadro específico
  createAviso(quadroId, aviso) {
    return axios.post(`${QUADRO_REST_API_URL}/${quadroId}/aviso`, aviso);
  }

  // Método para deletar um aviso específico
  deleteAviso(quadroId, avisoId) {
    return axios.delete(`${QUADRO_REST_API_URL}/${quadroId}/aviso/${avisoId}`);
  }
}

export default new QuadroService();
