if (process.env.NODE_ENV == "production")
	const SERVER_URL = "https://project-management-system-ark.herokuapp.com/"+process.env.PORT;
else	
	const SERVER_URL = "http://127.0.0.1:8000";

export default SERVER_URL;
