const applicationState = {
    requests: [],
    completions: [],
    plumbers: [
        { id: 1, name: "Maude" },
        { id: 2, name: "Merle" }
    ]
}

const API = "http://localhost:8088"

// THIS MUST BE DEFINED 
const mainContainer = document.querySelector("#container")

// FETCH REQUESTS 
export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

// GET REQUEST 
export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))
}

// GET PLUMBERS 
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

// SEND REQUEST 
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
} 

// DELETE REQUEST 
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// GRAB OUR PLUMBERS
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}

// SAVE COMPLETIONS
export const saveCompletion = (completion) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}


// FETCH COMPLETIONS
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (completions) => {
                // Store the external state in application state
                applicationState.completions = completions
            }
        )
}