import axios from 'axios';

const BASE_URL = "http://localhost:6000/api";

export const postData = async (url, formData) => {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.post(
      BASE_URL + url,
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('API Error:', error.response?.data || error.message);

    // Throw specific error message from backend if available
    throw new Error(
      error.response?.data?.message ||
      error.response?.data?.error || // fallback key
      'Request failed'
    );
  }
};
