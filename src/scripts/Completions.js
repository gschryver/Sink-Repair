export const Completions = () => {
    const completions = getCompletions()

    let html = "<ul>"

    for (const completion of completions) {
        html += `<li>${completion}</li>`
    }

    html += "</ul>"

    return html
}