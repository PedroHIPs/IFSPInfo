import axios from 'axios'

const CURSO_REST_API_URL = 'http://localhost:8080/curso';

class CursoService{

  getCursos(){
    return axios.get(CURSO_REST_API_URL);
  }

  getCursoById(id) {
    return axios.get(CURSO_REST_API_URL + '/' + id);
  }

  getCursosByCampus(campusId){
    return axios.get(CURSO_REST_API_URL + '/campus/' + campusId);
  }

  createCurso(curso){
    return axios.post(CURSO_REST_API_URL, curso);
  }

  deleteCurso(cursoId){
    return axios.delete(`${CURSO_REST_API_URL}/${cursoId}`);
  }

  updateCurso(cursoId, curso){
    return axios.put(`${CURSO_REST_API_URL}/${cursoId}`, curso);
  }
}

export default new CursoService()