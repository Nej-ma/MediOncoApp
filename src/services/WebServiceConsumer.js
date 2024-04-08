const API_URL = "http://10.0.2.2:3000";

// Function to log in and get the authentication token
const getAuthToken = async (username, password) => {
   console.log('getAuthToken : ' + username + ' ' + password);
    try {
        let response = await fetch(`${API_URL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        let json = await response.json();
        console.log('getAuthToken : ' + json.token);
        
        
        if (response.ok) {
            console.log("Token received: ", json.token); 
            return json.token; 
        } else {
            throw new Error(json.message || "Failed to login");
        }
    } catch (error) {
        console.error('Error fetching auth token:', error);
        throw error;
    }
};

// Fetch data using GET method
const fetchGet = async (endpoint, token) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        // Check for HTTP errors
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text(); // Read response body as text

        // Attempt to parse the text as JSON
        try {
            return JSON.parse(text);
        } catch (e) {
            console.error(`Error parsing JSON: ${e}`);
            throw new Error('Failed to parse JSON response');
        }
    } catch (error) {
        console.error(`Error in GET request to ${endpoint}:`, error);
        throw error;
    }
};


// Post data using POST method
const fetchPost = async (endpoint, data, token) => {
    try {
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        
        return await response.json();
    } catch (error) {
        console.error(`Error in POST request to ${endpoint}:`, error);
        throw error;
    }
};

export { getAuthToken, fetchGet, fetchPost };
