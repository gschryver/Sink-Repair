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
        const [requestId, plumberId] = event.target.value.split("--") // both arrays will only work if split by --, see below 
        
        const plumber = plumbers.find((plumber) => plumber.id === parseInt(plumberId)); // add the plumber's name to the completed request 
        const completion = {
            requestId: parseInt(requestId),
            plumberId: parseInt(plumberId),
            plumberName: plumber.name,
            date_created: new Date().toISOString(),
          }
  
        saveCompletion(completion).then(() => {
          // Reload the requests list after completion is saved
          const requestHTML = Requests()
          document.querySelector(".requestList").innerHTML = requestHTML
        })
      }
    }
  )
  

// Define a function to convert a single service request object to HTML list item element
const convertRequestToListElement = (request) => {
    // practicing ternary operators
    // if true, execute between the ? and the : 
    // if false, anything after : is executed
    // e.g. plumberName without a ternary operator is as follows:
    /* let plumberName = "";
          if (request.completed) {
              plumberName = request.completedBy;
         } else {
              plumberName = "";
        } */
    const completedClass = request.completed ? "completed" : "" // Is the request completed? If so, add the "completed" class to the request's HTML element, otherwise leave it empty
    const plumberName = request.completed ? request.completedBy : "" // Get the plumber's name who completed the request, if completed
    const plumberSelect = request.completed ? "" : // If request is completed, this will remove the plumber dropdown. Otherwise, keep it 
    
        `<select class="plumbers" id="plumbers">
           <option value="">Choose</option>
           ${plumbers.map((plumber) =>`<option value="${request.id}--${plumber.id}">${plumber.name}</option>`).join("")}
         </select>`
    return `<li class="requestItem ${completedClass}">
              <div class="requestText">${request.description}</div>
              <div class="plumbers-and-delete">
                <div class="completedBy">${plumberName}</div>
                ${plumberSelect}
                <button class="request__delete" id="request--${request.id}">Delete</button>
              </div>
            </li>`
  }

  
// Define the main Requests component function, which returns the HTML for the service request list and plumber selection dropdown
export const Requests = () => {
    const requests = getRequests()

    // if you write a function named convertRequestToListElement, then you would update the code below to the following...
    // Generate the HTML for the service request list and plumber selection dropdown
    const requestHTML = `
    
    <ul class="requestList">
    <li class="requestTitle"><span class="descriptionTitle">Description</span><span class="completedTitle">Completed By:</li>
    ${requests.map(convertRequestToListElement).join("")}
    </ul>`

    return requestHTML
}

