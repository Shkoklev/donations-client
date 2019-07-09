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
