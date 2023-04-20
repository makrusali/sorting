function init() {
  const inputDom = document.getElementById("i-data");
  const btnDom = document.getElementById("btn-sort");
  const viewDom = document.getElementById("result-container");
  const rbAsc = document.getElementById("rb-asc");
  const rbDesc = document.getElementById("rb-desc");

  function isAsc() {
    return rbAsc.checked == true && rbDesc.checked == false;
  }

  btnDom.addEventListener("click", (e) => {
    e.preventDefault();
    const raw = inputDom.value;
    const token = parse(raw);
    console.log("result : ", selectionSort(token, isAsc()));
  });

  function renderView(view) {
    viewDom.innerHTML = view.getHTML();
  }

  function selectionSort(token, isAsc) {

    const view = new TableViewer();


    let pos = 0;
    for (let i = 0; i < token.length - 1; i++) {
      // add title process
      view.addTitleProcess(i + 1);

      pos = i;
      for (let j = i + 1; j < token.length; j++) {
        let swapped = false;
        const tempJ = j;
        const tempPos = pos;

        if (isAsc) {
          // ascending
          if (token[pos] >= token[j]) {
            pos = j;
            swapped = true;
          }
        } else {
          // descending
          if (token[pos] <= token[j]) {
            pos = j;
          }
        }

        view.addProcess(i, tempPos, tempJ, [`apakah data[pos] >= data[j]`, `apakah ${token[pos]} ${isAsc ? ">=" : "<="} ${token[j]}`, `${swapped ? "Ya, pos = j, j = j + 1" : "tidak, pos = pos, j = j + 1"}`], token);
        view.addDivider();
      }

      let swapped = false;
      const tempPos = token[pos];
      const tempI = token[i];

      // swap
      if (pos != i) {
        swapped = true;
        const temp = token[pos];
        token[pos] = token[i];
        token[i] = temp;
      }

      view.addSwapped(i, pos, token.length + 1, [`apakah i != pos`, `apakah ${i} != ${pos}`, `${swapped ? "Ya tukar data[i] dengan data[pos]" : "tidak"}`], token);

      view.addResult(i, token);
    }

    // render view
    renderView(view);

    return token;
  }

}



