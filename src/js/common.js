function insertLineHandler(payLoad) {
    var table = document.getElementById('myTable');
    var row = table.insertRow(0);

    console.log(payLoad);

    insertLine(row, payLoad);
}

function insertLine(row, payload) {
    var lines = createLines(row, 5);

    lines[0].innerHTML = payload.lineNumber;
    lines[1].innerHTML = payload.type ? payload.type : "";
    lines[2].innerHTML = payload.name ? payload.name : "";
    lines[3].innerHTML = payload.condition ? payload.condition : "" ;
    lines[4].innerHTML = payload.value ? payload.value : "";
}

function createLines(row, numOfLines) {
    let lines = [];

    for (let i = 0; i < numOfLines; i++) {
        lines.push(row.insertCell(i));
    }

    return lines;
}

export {insertLineHandler};