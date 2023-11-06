import axios from 'axios';

const movieAPI = axios.create({
	baseURL: 'http://localhost:9999',
	// headers: { 
	// 	// "accept": "application/json",
	// 	// "Authorization": "Bearer " + ACCESS_TOKEN_AUTH,
	// }
});

export default movieAPI;
