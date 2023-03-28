const applicationState = { // current state of app
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
// retrieves all of the service requests from API and stores them in application.requests  
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
// returns a copy of the application.requests array (based on completed status)
export const getRequests = () => {
    // storing a copy of the requests array in a variable
    const requests = applicationState.requests.map(request => ({...request}));
    // sort the requests array in ascending order based on completed status
    return requests.sort((requestA, requestB) => requestA.completed - requestB.completed); // If requestA is less than requestB, then a should come before b
  }

// GET PLUMBERS 
// returns a copy of the applicationState.plumbers array 
export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({...plumber}))
}

// SEND REQUEST 
// sends a request to the API with the data?
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
// deletes request with ID from the API 
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

// GRAB OUR PLUMBERS
// retrieves our plumbers from API and stores them in an array 
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
// sends completed request to the API, updates completed status on related service request 
export const saveCompletion = (completion) => {
    // Prepare options for sending data to the server
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completion) // Convert the completion data to a JSON string
    }

    // Send the completion data to the server
    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json()) 
        .then(() => {
            // Get the service request that corresponds to the completion data
            return fetch(`${API}/requests/${completion.requestId}`)
                .then(response => response.json()) // Convert the response data to an object
                .then(request => {
                    
                    // Set the 'completed' status of the service request to true for sorting purposes
                    // This can be built upon to add various things to the requests/displayed HTML ul
                    request.completed = true;
                    request.completedBy = completion.plumberName; 

                    const updateOptions = {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(request) 
                    };
                    
                    return fetch(`${API}/requests/${completion.requestId}`, updateOptions)
                        .then(response => response.json()) 
                        .then(() => {
                            mainContainer.dispatchEvent(new CustomEvent("stateChanged"));
                        });
                });
        });
}; 


// FETCH COMPLETIONS
// fetches all of the completed requests and stores them in an array 
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