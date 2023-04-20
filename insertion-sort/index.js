function init() {
  const btnSortDom = document.getElementById("btn-sort");
  const inputDataDom = document.getElementById("i-data");

  btnSortDom.addEventListener('click', (e) => {
    e.preventDefault();

    const rawString = inputDataDom.value;
    const token = parse(rawString);
    console.log(token);

    const result = insertionSort(token);

    console.log(result);
  })


  function insertionSort(token) {
    function swap(x, y) {
      const temp = token[x];
      token[x] = token[y];
      token[y] = temp;
    }

    for (let i = 1; i < token.length - 1; i++) {
      let temp = token[i];
      for (let j = i - 1; j >= 0; j--) {
        if (temp <= token[j]) {
          console.log("swapped ", { indexj: j, right: token[i], left: token[j] });

          temp = token[j];
        }
      }
    }

    return token;
  }

}