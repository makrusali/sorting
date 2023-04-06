function init() {
    const btnSort = document.getElementById("btn-sort");
    const inputData = document.getElementById("i-data");
    const resultContainer = document.getElementById("result-container");
    const rbAsc = document.getElementById("rb-asc");
    const rbDesc = document.getElementById("rb-desc");

    function isAsc() {
        return rbAsc.checked == true && rbDesc.checked == false;
    }

    btnSort.addEventListener('click', (e) => {
        e.preventDefault();

        const raw = inputData.value;
        const token = parse(raw);
        const result = bubbleSort(token, isAsc());

        console.log(result);
    });


    function isNumber(c) {
        return !isNaN(parseFloat(c));
    }

    function isComma(c) {
        return c === ',';
    }

    function isWhiteSpace(c) {
        return c === ' ';
    }

    function isEOC(str, c) {
        return str.slice(-1) == c;
    }

    function parse(input) {
        let token = [];
        let state = 0;
        const sizeInput = input.length;

        let numBuf = "";

        for (let i = 0; i < sizeInput; i++) {
            const c = input[i];

            switch (state) {
                case 0:
                    //  5 25
                    if (isNumber(c)) {
                        numBuf += c;

                        if (i == sizeInput - 1) {
                            token.push(numBuf);
                        }

                        break;
                    }
                    if (isWhiteSpace(c) || isComma(c)) {
                        token.push(numBuf);
                        numBuf = "";
                        state = 1;
                        break;
                    }

                    console.log('invalid token ', c);
                    break;
                case 1:
                    if (isNumber(c)) {
                        numBuf += c;
                        state = 0;

                        if (i == sizeInput - 1) {
                            token.push(numBuf);
                        }

                        break;
                    }
                    console.log('invalid token ', c);
                    break;
                default:
                    break;
            }
        }


        // parse to number
        token = token.map((v) => {
            return parseFloat(v);
        });

        return token;
    }


    function bubbleSort(input, isAsc) {

        console.log(isAsc);
        const view = new TableViewer();

        view.setDataLength(input.length);

        for (let i = 0; i < input.length - 1; i++) {

            view.addHeader('Prosess Iterasi ke : ' + (i + 1));


            for (let j = 0; j < input.length - 1; j++) {
                const cur = input[j];
                const next = input[j + 1];

                let swapped = false;

                // swap if current value bigger than next value
                if (isAsc) {
                    if (cur >= next) {
                        swapped = true;
                    }

                    view.addRow(input, j, [`apakah ${cur} >= ${next}`, swapped ? `ya -- tukar` : `tidak -- tetap`]);

                } else {
                    if (cur <= next) {
                        swapped = true;
                    }

                    view.addRow(input, j, [`apakah ${cur} <= ${next}`, swapped ? `ya -- tukar` : `tidak -- tetap`]);
                }

                if (swapped) {
                    input[j] = next;
                    input[j + 1] = cur;
                }

            }

            view.addRow(input, -1, -1);


        }

        view.render();
        return input
    }


    // for displaying the table
    class TableViewer {
        constructor() {
            this.html = '';
            this.dataLength = 0;
        }

        setDataLength(length) {
            this.dataLength = length;
        }

        addHeader(headerLabel) {
            this.html += `<h2 style="margin: 26px 0px;">${headerLabel}</h2>`;
        }

        addRow(data, chekedPos, expr) {

            this.html += `<table><tr class="tr_arrow" style="position: relative;">`;
            for (let i = 0; i < this.dataLength; i++) {
                if (i == chekedPos && chekedPos != -1) {
                    this.html += `<td colspan="2" class="td_arrow">
                    <div class="tooltip tooltip__hidden">
                        <p style="margin: 0px; margin-bottom: 6px;">${expr[0]}</p>
                        <p style="margin: 0px;">${expr[1]}</p>
                    </div>
                    <img src="./right-arrow.svg" class="arrow_image" alt="" srcset="">
                    </td>`;
                    break;
                } else {
                    this.html += `<td class="td__hidden"></td>`;
                }
            }
            this.html += `</tr> <tr>`;

            for (let i = 0; i < this.dataLength; i++) {
                if (chekedPos == i) {
                    this.html += `<td class="td_item item__yellow">${data[i]}</td>`;
                } else if (chekedPos == -1) {
                    this.html += `<td class="td_item item__green">${data[i]}</td>`;
                } else {
                    this.html += `<td class="td_item">${data[i]}</td>`;
                }
            }

            this.html += `</tr></table>`;
        }

        render(el) {
            console.log(this.html);
            resultContainer.innerHTML = this.html;
        }
    }
}   