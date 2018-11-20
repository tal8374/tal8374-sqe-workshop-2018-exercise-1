import assert from 'assert';
import {DoWhileStatementExpression} from '../src/js/do-while-expression-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Do while handler', () => {

    it('should handle do while', () => {
        var parsedCode = parseCode('do {text += "The number is " + i;i++;}while (i < 5);');
        var expression = new DoWhileStatementExpression(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });

});
