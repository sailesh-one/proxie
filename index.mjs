import https from 'https';

export const handler = async (event) => {
    const queryString = event.queryStringParameters; // Get query parameters

    // Check if the required parameter is present
    if (!queryString || !queryString.username) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'Missing required parameter: username' }),
        };
    }

    const variable = queryString.username; 
    const url = `https://i.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(variable)}`; // URL to fetch

    try {
        const data = await fetchData(url); // Fetch data
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to fetch data', details: error.message }),
        };
    }
};

// Helper function to fetch data from a URL with custom headers
const fetchData = (url) => {
    return new Promise((resolve, reject) => {
        const options = {
            headers: {
                'User-Agent': 'Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)', // Custom User-Agent
            },
        };

        https.get(url, options, (res) => {
            let body = '';

            // Collect data
            res.on('data', (chunk) => {
                body += chunk;
            });

            // On end of response
            res.on('end', () => {
                try {
                    const jsonData = JSON.parse(body);
                    resolve(jsonData); // Resolve the promise with parsed data
                } catch (error) {
                    reject(new Error('Failed to parse response')); // Handle parsing errors
                }
            });
        }).on('error', (error) => {
            reject(error); // Handle HTTP request errors
        });
    });
};
