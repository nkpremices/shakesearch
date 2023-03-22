const Controller = {
  search(ev) {
    ev.preventDefault();
    const form = document.getElementById("form");
    const data = Object.fromEntries(new FormData(form));
    const response = fetch(`/search?q=${data.query}`).then((response) => {
      response.json().then((results) => {
        Controller.updateTable(results);
      });
    });
  },

  updateTable(results) {
    const table = document.getElementById("table");
    const resultsSummary = document.getElementById("results-summary");

    const rows = [];

    for (let result of results) {
      rows.push(`<div id="row">${result}...</div>`);
    }

    if (rows.length !== 0) {
      resultsSummary.style.display = 'block';
      resultsSummary.innerHTML = `<b>Showing ${rows.length} results</b> <br/>`;
      table.innerHTML = rows.join("<br/>");
    } else {
        resultsSummary.style.display = 'none';
        table.innerHTML = `<div id="results-empty-state"> No results to show for the moment...</div>`;
    }
  },
};

const form = document.getElementById("form");
form.addEventListener("submit", Controller.search);
