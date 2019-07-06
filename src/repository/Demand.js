import axios from "axios";

export const getAllDemandsByCategory = (categoryId) => {
    return axios.get(`http://localhost:8080/demands/${categoryId}`);
};
