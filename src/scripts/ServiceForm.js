import { sendRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "submitRequest") {
        // Get what the user typed into the form fields
        const userDescription = document.querySelector("input[name='serviceDescription']").value
        const userAddress = document.querySelector("input[name='serviceAddress']").value
        const userBudget = document.querySelector("input[name='serviceBudget']").value
        const userDate = document.querySelector("input[name='serviceDate']").value

        // Make an object out of the user input
        const dataToSendToAPI = {
            description: userDescription,
            address: userAddress,
            budget: userBudget,
            neededBy: userDate,
            completed: false // set completed to false
        }

        // Send the data to the API for permanent storage
        sendRequest(dataToSendToAPI)
        console.log('request sent')
    }
})

export const ServiceForm = () => {
    let html = `
    <div class="field">
            <label class="label" for="serviceDescription">Description</label>
            <input type="text" name="serviceDescription" class="inputText" />
        </div>
        <div class="field">
            <label class="label" for="serviceAddress">Address</label>
            <input type="text" name="serviceAddress" class="inputText" />
        </div>
        <div class="field">
            <label class="label" for="serviceBudget">Budget</label>
            <input type="number" name="serviceBudget" class="inputText" />
        </div>
        <div class="field">
            <label class="label" for="serviceDate">Date needed</label>
            <input type="date" name="serviceDate" class="inputText" />
        </div>

        <button class="button" id="submitRequest">Submit Request</button>
    `

    return html
}