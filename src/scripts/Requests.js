import { getRequests } from "./dataAccess.js"
import { getPlumbers } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"
import { saveCompletion } from "./dataAccess.js"

// Select the main container element and get a list of plumbers from the server
const mainContainer = document.querySelector("#container")
const plumbers = getPlumbers()

// Add a click event listener to the main container element to handle deletion of service requests
mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})


// Add a change event listener to the main container element to handle completion of service requests
mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--") // option value must have -- or split will return only one array. e.g. ${request.id}--${plumber.id}

            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: new Date().toISOString()
             }

            saveCompletion(completion)

        }
    }
)

// Define a function to convert a single service request object to HTML list item element
const convertRequestToListElement = (request) => { // The function should define 1 parameter (value will be each object in the array)
    // The description of the service request should be interpolated inside the <li> HTML representation.
    return `<li class="requestItem">
                <div class="requestText">${request.description}
                </div>
                <div class="plumbers-and-delete">
                <select class="plumbers" id="plumbers"><option value="">Choose</option>${plumbers.map(plumber => {
                    return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`}).join("")}</select>
                <button class="request__delete" id="request--${request.id}">Delete</button>
                </div>
            </li> `
}

// Define the main Requests component function, which returns the HTML for the service request list and plumber selection dropdown
export const Requests = () => {
    const requests = getRequests()

    // if you write a function named convertRequestToListElement, then you would update the code below to the following...
        // Generate the HTML for the service request list and plumber selection dropdown
    const requestHTML = `<ul class="requestList">${requests.map(convertRequestToListElement).join("")}</ul>`

    return requestHTML
}

