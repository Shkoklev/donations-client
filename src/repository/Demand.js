import axios from "axios";

export const getAllDemandsByCategory = (categoryId) => {
    return axios.get(`http://localhost:8080/demands/by_category/${categoryId}`);
};

export const getDemandById = (id) => {
    return axios.get(`http://localhost:8080/demands/${id}`);
};

export const addNewDemand = (demandRequest, jwt) => {
    return fetch(`http://localhost:8080/demands/new`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            demandName: demandRequest.name,
            quantity: demandRequest.quantity,
            organizationName: demandRequest.organization
        })
    });
};
