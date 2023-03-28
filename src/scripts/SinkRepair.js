import { Requests } from "./Requests.js"
import { ServiceForm } from "./ServiceForm.js"

export const SinkRepair = () => {
    return `
        <div class="page-logo">
            <div class="logo"></div>
            <h1 class="pageName">Maude and Merle's Sink Repair</h1>
        </div>
        <section class="serviceForm">
        </section>
            ${ServiceForm()}
        <section class="serviceRequests">
            <h2>Service Requests</h2>
            ${Requests()}
        </section>
    `
}