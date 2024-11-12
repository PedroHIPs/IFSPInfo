import axios from 'axios'

const AVALIACAO_REST_API_URL = 'http://localhost:8080/avaliacao';

class AvaliacaoService{

  getAvaliacao(){
    return axios.get(AVALIACAO_REST_API_URL);
  }

  getAvaliacaById(id) {
    return axios.get(AVALIACAO_REST_API_URL + '/' + id);
  }

  createAvaliacao(avaliacao){
    return axios.post(AVALIACAO_REST_API_URL, avaliacao);
  }
  
  getAvaliacoesByCursoId(cursoId) {
    return axios.get(AVALIACAO_REST_API_URL + '/curso/' + cursoId);
  }
}

export default new AvaliacaoService()