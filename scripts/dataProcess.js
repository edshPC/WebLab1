
const y_select = document.getElementById("y-select");
const r_select = document.getElementsByName("r-select");
const x_buttons = document.querySelectorAll(".x-button");
const submit_button = document.getElementById("submit-button");
const result_table = document.getElementById("result-table");
let last_x_button, last_row;

function addToTable(data) {
    let splited = data.split(';');
    let row = result_table.insertRow();
    let cellId = 0;
    for(let str of splited) {
        let cell = row.insertCell(cellId++);
        cell.innerText = str;
    }

    if(last_row !== undefined) {
        last_row.className = '';
    }
    row.classList.add(splited[3] === 'Попал!' ? 'last-row-hit' : 'last-row-miss');
    last_row = row;

    result_table.scrollTo(0, result_table.scrollHeight);
}

function borderRed(id) {
    let element = document.getElementById(id);
    element.classList.add("red-border");
    setTimeout(() => {
        element.classList.remove("red-border");
    }, 1500);
}

function checkHit(x, y, r) {
    let formData = new FormData();
    formData.append('x', x);
    formData.append('y', y);
    formData.append('r', r);

    fetch("./logic/checkHit.php", {
        method: 'POST',
        body: formData
    }).then(r => {
        return r.text();
    }).then(text => {
        addToTable(text);
    });

}

function onLoad(ev) {
    graphEntry();

    for(let btn of x_buttons) {
        btn.addEventListener("click", ev => {
            if(last_x_button !== undefined) last_x_button.classList.remove("selected");
            btn.classList.add("selected");
            last_x_button = btn;
        })
    }

    submit_button.addEventListener("click", ev => {
        let x, y, r, correct = true;
        if(last_x_button === undefined) {
            borderRed("x-cell");
            correct = false;
        } else {
            x = +last_x_button.innerText;
        }
        y = +y_select.value;
        if(y_select.value.length === 0 || Number.isNaN(y) || Math.abs(y) >= 3) {
            borderRed("y-cell");
            correct = false;
        }
        for(let check of r_select) {
            if(check.checked) r = +check.value;
        }
        if(r === undefined || Number.isNaN(r)) {
            borderRed("r-cell");
            correct = false;
        }

        if(!correct) return;

        checkHit(x, y, r);
        makeGraph(x, y, r);

    });
}

window.addEventListener("load", onLoad);