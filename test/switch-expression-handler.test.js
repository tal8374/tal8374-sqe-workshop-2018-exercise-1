import assert from 'assert';
import {SwitchStatementExpression} from '../src/js/switch-expression-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Throw handler', () => {

    it('should handle switch expression', () => {
        var parsedCode = parseCode('switch (state) {case 0:day = "Sunday";case 1:day = "Monday";break;}');
        var expression = new SwitchStatementExpression(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });

});
