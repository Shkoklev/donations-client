import axios from "axios";

export const registerDonor = (donor) => {
    return fetch('http://localhost:8080/donors/register', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            firstName: donor.firstName,
            lastName: donor.lastName,
            email: donor.email,
            phone: donor.phone,
            password: donor.password
        })
    });
};

export const loginDonor = (formData) => {
    return fetch('http://localhost:8080/donors/login', {
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

export const logoutDonor = () => {
    return fetch('http://localhost:8080/donors/logout');
};

export const getLoggedDonor = (jwt) => {
    return axios.get('http://localhost:8080/donors/loggedDonor', {
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
};

export const editDonor = (jwt, donorId, formData) => {
    return fetch(`http://localhost:8080/donors/${donorId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json"
        },
        method: "PUT",
        body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            phone: formData.phone,
            email: formData.email,
            password: formData.password
        })
    });
};

