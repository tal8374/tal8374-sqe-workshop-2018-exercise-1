function variablesDeclarationHandler(parsedCode, lineNumber) {
    var declarations = parsedCode.body[lineNumber - 1].declarations;

    for(let i = 0; i < declarations.length; i++) {
        variableDeclarationHandler(declarations[i], lineNumber)
    }
}

function variableDeclarationHandler(declaration, lineNumber) {
    var table = document.getElementById('myTable');
    var row = table.insertRow(0);

    let payload = parseVariable(declaration);
    payload.lineNumber = lineNumber;

    insertLine(row, payload)
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

    for(let i = 0; i < numOfLines; i++) {
        lines.push(row.insertCell(i));
    }

    return lines;
}

function parseVariable(declaration) {
    return {
        type : declaration.type,
        name : declaration.id.name,
        value : declaration.init ? declaration.init.value : 0,
    }
}

export {variablesDeclarationHandler};