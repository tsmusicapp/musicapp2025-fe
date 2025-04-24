import axios from "axios"

// export const  API_URL = 'http://localhost:5000'
export const  API_URL =  axios.create({
    baseURL: 'http://16.171.65.3:5000',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// For production use this 
// '34.200.64.144'