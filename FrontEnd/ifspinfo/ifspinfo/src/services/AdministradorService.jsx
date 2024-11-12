import axios from 'axios'

const ADMINISTRADOR_REST_API_URL = 'http://localhost:8080/administrador';
const AUTH_REST_API_URL = 'http://localhost:8080/auth';


class AdministradorService{

  Administrador(){
    return axios.get(ADMINISTRADOR_REST_API_URL);
  }

  getAdministradorById(id) {
    return axios.get(ADMINISTRADOR_REST_API_URL + '/' + id);
  }

  createAdministrador(administrador){
    return axios.post(ADMINISTRADOR_REST_API_URL + '/register', administrador);
  }

  login(email, senha) {
    return axios.post(AUTH_REST_API_URL + '/login', { email, senha });
  }
}

export default new AdministradorService()