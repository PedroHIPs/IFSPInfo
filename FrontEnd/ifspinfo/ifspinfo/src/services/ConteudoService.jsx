import axios from 'axios'

const CONTEUDO_REST_API_URL = 'http://localhost:8080/conteudo';

class ConteudoService{

  getConteudos(){
    return axios.get(CONTEUDO_REST_API_URL);
  }

  getConteudoById(id) {
    return axios.get(CONTEUDO_REST_API_URL + '/' + id);
  }

  createConteudo(conteudo){
    return axios.post(CONTEUDO_REST_API_URL, conteudo);
  }

  deleteConteudo(conteudoId){
    return axios.delete(`${CONTEUDO_REST_API_URL}/${conteudoId}`);
  }

  updateConteudo(id, conteudo) {
    return axios.put(`${CONTEUDO_REST_API_URL}/${id}`, conteudo);
  }

  getConteudosByCampus(campusId){
    return axios.get(`${CONTEUDO_REST_API_URL}/campus/${campusId}/conteudos`);
  }
}

export default new ConteudoService()