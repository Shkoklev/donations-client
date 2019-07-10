export const donate = (idWrapper, quantityRequest, jwt) => {
    return fetch(`http://localhost:8080/donors/${idWrapper.donorId}/donate_to_organization/
    ${idWrapper.organizationId}/for_demand/${idWrapper.demandId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            quantity: quantityRequest.quantity
        })
    });
};

export const deleteDonation = (donorId, donationId, jwt) => {
    return fetch(`http://localhost:8080/donors/${donorId}/delete_donation/${donationId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
        method: "DELETE"
    })
};

export const getSuccessfulDonationsForDonor = (donorId, jwt) => {
    return fetch(`http://localhost:8080/donors/${donorId}/successful_donations`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        method: "GET"
    });
};

export const getPendingDonationsForDonor = (donorId, jwt) => {
    return fetch(`http://localhost:8080/donors/${donorId}/pending_donations`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        method: "GET"
    });
};

export const getDeclinedDonationsForDonor = (donorId, jwt) => {
    return fetch(`http://localhost:8080/donors/${donorId}/declined_donations`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        method: "GET"
    });
};

export const getSuccessfulDonationsForOrganization = (organizationId, jwt) => {
    return fetch(`http://localhost:8080/organizations/${organizationId}/successful_donations`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        method: "GET"
    });
};

export const getPendingDonationsForOrganization = (organizationId, jwt) => {
    return fetch(`http://localhost:8080/organizations/${organizationId}/pending_donations`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        method: "GET"
    });
};

export const getDeclinedDonationsForOrganization = (organizationId, jwt) => {
    return fetch(`http://localhost:8080/organizations/${organizationId}/declined_donations`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        method: "GET"
    });
};

export const acceptDonation = (organizationId, donationId, jwt) => {
    return fetch(`http://localhost:8080/organizations/${organizationId}/accept_donation/${donationId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        method: "GET"
    });
};

export const declineDonation = (organizationId, donationId, jwt) => {
    return fetch(`http://localhost:8080/organizations/${organizationId}/decline_donation/${donationId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`
        },
        method: "GET"
    });
};
