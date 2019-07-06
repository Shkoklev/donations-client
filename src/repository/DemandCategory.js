import axios from "axios";

export const getAllDemandCategories = () => {
    return axios.get('http://localhost:8080/demand_categories');
};

