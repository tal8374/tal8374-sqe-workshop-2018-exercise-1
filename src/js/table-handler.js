// import $ from 'jquery';
import {parseCode} from './code-analyzer';

function myFunction() {
    var table = document.getElementById('myTable');
    var row = table.insertRow(0);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    cell1.innerHTML = 'NEW CELL1';
    cell2.innerHTML = 'NEW CELL2';
    cell3.innerHTML = 'NEW CELL3';
    cell4.innerHTML = 'NEW CELL4';

    parseCode('parseCode');
}

