import axios from 'axios';
import { ACCESS_TOKEN_AUTH, API_BASE_URL } from '../config/DotEnv';


const movieAPI = axios.create({
	baseURL: API_BASE_URL,
	headers: { 
		"accept": "application/json",
		"Authorization": "Bearer " + ACCESS_TOKEN_AUTH,
	}
});

export default movieAPI;
