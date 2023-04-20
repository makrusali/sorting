class TableViewer {
  constructor() {
    this.html = '';
  }

  addTitleProcess(n) {
    this.html += `<h1 style="padding-top: 56px;">Proses ke ${n}</h1>`;
  }

  addProcess(i, pos, j, tooltip, data) {
    this.html += `<table>`;
    // bagian 1
    this.html += `<tr style="border: 1px solid black;">`;
    for (let x = 0; x < data.length; x++) {
      if (x == i) {
        this.html += `<td class="td_item n_border">i</td>`;
      } else {
        this.html += `<td class="td_item n_border"></td>`;
      }
    }
    this.html += `</tr>`

    // bagian 2
    this.html += `<tr>`;
    this.html += `
    <div class="tooltip">
      <p>${tooltip[0]}</p>
      <p>${tooltip[1]}</p>
      <p>${tooltip[2]}</p>
    </div>`;
    for (let x = 0; x < data.length; x++) {
      if (x == pos || x == j) {
        this.html += `<td class="td_item item__yellow2">${data[x]}</td>`;
      } else {
        this.html += `<td class="td_item">${data[x]}</td >`;
      }
    }
    this.html += `</tr> `

    // bagian 3
    this.html += `<tr">`;
    for (let x = 0; x <= data.length + 1; x++) {
      if (x == pos) {
        this.html += `<td class="td_item n_border">pos</td>`;
      } else if (x == j) {
        this.html += `<td class="td_item n_border">j</td>`;
      } else {
        this.html += `<td class="td_item n_border"></td>`;
      }
    }
    this.html += `</tr></table>`
  }
  addSwapped(i, pos, j, tooltip, data) {
    this.html += `<table>`;
    // bagian 1
    this.html += `<tr style="border: 1px solid black;">`;
    for (let x = 0; x < data.length; x++) {
      if (x == i) {
        this.html += `<td class="td_item n_border">i</td>`;
      } else {
        this.html += `<td class="td_item n_border"></td>`;
      }
    }
    this.html += `</tr>`

    // bagian 2
    this.html += `<tr>`;
    this.html += `
    <div class="tooltip">
      <p>${tooltip[0]}</p>
      <p>${tooltip[1]}</p>
      <p>${tooltip[2]}</p>
    </div>`;
    for (let x = 0; x < data.length; x++) {
      if (x == pos || x == i) {
        this.html += `<td class="td_item item__green">${data[x]}</td>`;
      } else {
        this.html += `<td class="td_item">${data[x]}</td >`;
      }
    }
    this.html += `</tr> `

    // bagian 3
    this.html += `<tr">`;
    for (let x = 0; x <= data.length + 1; x++) {
      if (x == pos) {
        this.html += `<td class="td_item n_border">pos</td>`;
      } else if (x == j) {
        this.html += `<td class="td_item n_border">j</td>`;
      } else {
        this.html += `<td class="td_item n_border"></td>`;
      }
    }
    this.html += `</tr></table>`;
  }

  addDivider() {
    this.html += `<div class="divider"></div>`;
  }

  addResult(i, data) {
    this.html += `<table>
    <tr>
      <div class="tooltip">
        <h3>Hasil</h3>
      </div>
      <br>
      `;


    for (let x = 0; x < data.length; x++) {
      if (x <= i) {
        this.html += `<td class="td_item item__orange">${data[x]}</td>`
      } else {
        this.html += `<td class="td_item">${data[x]}</td>`
      }
    }

    this.html += `</tr></table >`;
  }


  getHTML() {
    return this.html;
  }
}