import assert from 'assert';
import {AssignmentExpression} from '../src/js/assignment-expression-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Condition handler', () => {


    it('should handle two numbers', () => {
        var parsedCode = parseCode('for(let i = 0; i < num; i++){let i = 0}');
        var expression = new AssignmentExpression(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });
});
