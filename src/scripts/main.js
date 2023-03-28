import { fetchRequests } from "./dataAccess.js"
import { fetchPlumbers } from "./dataAccess.js"
import { fetchCompletions } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"

const mainContainer = document.querySelector("#container")

// what is this doing? 
// .then() tells javascript what to do after information has been received
const render = () => { 
  fetchRequests() // this fetches requests from the server
      .then(() => fetchPlumbers()) // fetches plumbers from server
      .then(() => fetchCompletions()) // fetches completions from server
      .then( // render the sink repair component inside of the main container 
          () => {
              mainContainer.innerHTML = SinkRepair()
          }
      )
}

render()

mainContainer.addEventListener("stateChanged", () => {
  render()
})
