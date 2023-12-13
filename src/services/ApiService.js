
import axios from 'axios';

const BASE_URL = 'http://localhost:5454';

const ApiService = {
  authenticateUser: async (loginId, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/assignment_auth.jsp`, {
        login_id: loginId,
        password: password,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCustomerList: async (token) => {
    try {
      const response = await axios.get(`${BASE_URL}/assignment.jsp?cmd=get_customer_list`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCustomerDetails: async (token, uuid) => {
    try {
      const response = await axios.get(`${BASE_URL}/assignment.jsp?cmd=get_customer&uuid=${uuid}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCustomer: async (token, uuid, customerDetails) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/assignment.jsp?cmd=update&uuid=${uuid}`,
        customerDetails,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiService;
