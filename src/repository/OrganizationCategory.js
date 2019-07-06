import axios from "axios";

export const getAllOrganizationCategories = () => {
    return axios.get('http://localhost:8080/organization_categories');
};


