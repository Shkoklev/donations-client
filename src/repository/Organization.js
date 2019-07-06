import axios from "axios";

export const getAllOrganizations = () => {
    return axios.get('http://localhost:8080/organizations');
};

export const getOrganizationsByCategoryId = (categoryId) => {
    return axios.get(`http://localhost:8080/organizations/${categoryId}`);
};

export const getOrganizationById = (organizationId) => {
    return axios.get(`http://localhost:8080/organizations/organization/${organizationId}`)
};

export const getDemandsForOrganization = (organizationId) => {
    return axios.get(`http://localhost:8080/organizations/${organizationId}/demands`);
};

export const getSuccessfulDonationsForOrganization = (organizationId) => {
    return axios.get(`http://localhost:8080/organizations/${organizationId}/successful_donations`);
};

export const getPendingDonationsForOrganization = (organizationId) => {
    return axios.get(`http://localhost:8080/organizations/${organizationId}/pending_donations`);
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

export const logoutOrganization = () => {
    return fetch('http://localhost:8080/organizations/logout');
};
