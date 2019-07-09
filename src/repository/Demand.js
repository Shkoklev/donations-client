import axios from "axios";

export const getAllDemandsByCategory = (categoryId) => {
    return axios.get(`http://localhost:8080/demands/by_category/${categoryId}`);
};

export const getDemandById = (id) => {
    return axios.get(`http://localhost:8080/demands/${id}`);
}
