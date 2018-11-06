import $ from 'jquery';
import {parseCode} from './code-analyzer';

import {facadeDeclarationHandler} from './facade-declaration-handler';

$(document).ready(function () {

    $('#codeSubmissionButton').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);
        $('#parsedCode').val(JSON.stringify(parsedCode, null, 2));
    });

    $('#button').click(() => {
        let codeToParse = $('#codePlaceholder').val();
        let parsedCode = parseCode(codeToParse);

        facadeDeclarationHandler(parsedCode);
    });



});

