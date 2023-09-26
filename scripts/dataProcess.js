
const y_select = document.getElementById("y-select");
const r_select = document.getElementsByName("r-select");
const x_buttons = document.querySelectorAll(".x-button");
const submit_button = document.getElementById("submit-button");
const clear_button = document.getElementById("clear-button");
const result_table = document.getElementById("result-table");
let last_x_button, last_row;

function addToTable(data) {
    let row = result_table.insertRow();
    let cellId = 0;
    row.insertCell(cellId++).innerText = data.x;
    row.insertCell(cellId++).innerText = data.y;
    row.insertCell(cellId++).innerText = data.r;
    row.insertCell(cellId++).innerText = data.result;
    row.insertCell(cellId++).innerText = new Date(data.datetime).toLocaleTimeString();
    row.insertCell(cellId++).innerText = data.exectime + 'ns';

    if(last_row !== undefined) last_row.className = '';
    row.classList.add(data.result === 'Попал!' ? 'last-row-hit' : 'last-row-miss');
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
        return r.json();
    }).then(data => {
        if('error' in data) throw data.error;
        addToTable(data);
    }).catch(e => {
        alert(`Ошибка в получении ответа: ${e}`);
    });

}

function initialize() {
    fetch("./logic/init.php", {
        method: 'POST'
    }).then(r => {
        return r.json();
    }).then(data => {
        if(data.length > 0) data.forEach(addToTable);
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

    clear_button.addEventListener("click", ev => {
        fetch("./logic/clear.php", {
            method: 'POST'
        });
        location.reload();
    });

    initialize();
}

window.addEventListener("load", onLoad);