import axios from "axios";

export const getAllOrganizations = (pageNumber) => {
    return axios.get(`http://localhost:8080/organizations?page=${pageNumber}`);
};

export const getOrganizationsByCategoryId = (categoryId, pageNumber) => {
    return axios.get(`http://localhost:8080/organizations/${categoryId}?page=${pageNumber}`);
};

export const getOrganizationById = (organizationId) => {
    return axios.get(`http://localhost:8080/organizations/organization/${organizationId}`)
};

export const getDemandsForOrganization = (organizationId) => {
    return axios.get(`http://localhost:8080/organizations/${organizationId}/demands`);
};

export const getOrganizationsBySearchQuery = (query) => {
    return axios.get(`http://localhost:8080/organizations/search?query=${query}`);
};


export const registerOrganization = (organization) => {
    return fetch('http://localhost:8080/organizations/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: organization.name,
            phone: organization.phone,
            email: organization.email,
            password: organization.password,
            category: organization.category
        })
    });
};

export const loginOrganization = (formData) => {
    return fetch('http://localhost:8080/organizations/login', {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            email: formData.email,
            password: formData.password
        })
    });
};

export const getLoggedOrganization = (jwt) => {
    return axios.get('http://localhost:8080/organizations/loggedOrganization', {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
};

export const logoutOrganization = () => {
    return fetch('http://localhost:8080/organizations/logout');
};

export const addDemandToOrganization = (demandRequest, organizationId, jwt) => {
    return fetch(`http://localhost:8080/organizations/${organizationId}/add_demand`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            demandName: demandRequest.demandName,
            quantity: demandRequest.quantity
        })
    });
};

export const deletedDemandFromOrganization = (organizationId, demandId, jwt) => {
    return fetch(`http://localhost:8080/organizations/${organizationId}/delete_demand/${demandId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        method: "DELETE"
    });
};

export const changeDemandQuantity = (organizationId, demandId, quantityRequest, jwt) => {
    return fetch(`http://localhost:8080/organizations/${organizationId}/change_demand_quantity/${demandId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
            quantity: quantityRequest.quantity
        })
    })
};
