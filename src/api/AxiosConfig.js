import axios from 'axios';

const auth_token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ODBlYTk1OGU0MmU5NjlkNWFkNzIxNzhiMDM3YmMyNyIsInN1YiI6IjY1MTc3OTZkYzUwYWQyMDBhZDdmZmNlMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GJTkkbjH8kJqRBdoXmN2MOFbVF0Y2VzIboy1iZ6wZtU';

export default axios.create({
	// baseURL: 'https://0f75-116-96-46-158.ngrok-free.app',
	// baseURL: 'http://localhost:8080',
	baseURL: 'https://api.themoviedb.org',
	headers: { 
		// 'ngrok-skip-browser-warning': 'true', 
		"accept": "application/json",
		"Authorization": auth_token
	}
});
