import $ from 'jquery';
import {parseCode} from './code-analyzer';

$(document).ready(function () {
    var handlers = {
        'VariableDeclaration' : variablesDeclarationHandler
    };


    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });

    $('#button').click(() => {
        let parsedCode = parseCode('let one,two;');
        let numberOfLines = parsedCode.body.length;

        for(let lineNumber = 1 ; lineNumber <= numberOfLines; lineNumber++) {
            var declarationType = getDeclarationType(parsedCode, lineNumber);

            handlers[declarationType](parsedCode, lineNumber)
        }
    });

    function getDeclarationType(parsedCode, lineNumber) {
        return parsedCode.body[lineNumber - 1].type;
    }

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

});

