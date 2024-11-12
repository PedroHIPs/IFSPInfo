import axios from 'axios'

const CAMPUS_REST_API_URL = 'http://localhost:8080/campus';

class CampusService{

  getCampus(){
    return axios.get(CAMPUS_REST_API_URL);
  }

  getCampusById(id) {
    return axios.get(CAMPUS_REST_API_URL + '/' + id);
  }

  createCampus(campus){
    return axios.post(CAMPUS_REST_API_URL, campus);
  }
}

export default new CampusService()