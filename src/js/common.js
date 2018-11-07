function insertLineHandler(payLoad) {
    var table = document.getElementById('myTable');
    var row = table.insertRow(0);

    insertLine(row, payLoad);
}

function insertLine(row, payload) {
    var numOfColumns = Object.keys(payload).length;
    var lines = createLines(row, numOfColumns);

    lines[0].innerHTML = payload.lineNumber;
    lines[1].innerHTML = payload.type;
    lines[2].innerHTML = payload.name;
    lines[3].innerHTML = payload.value;
}

function createLines(row, numOfLines) {
    let lines = [];

    for (let i = 0; i < numOfLines; i++) {
        lines.push(row.insertCell(i));
    }

    return lines;
}

export {insertLineHandler};