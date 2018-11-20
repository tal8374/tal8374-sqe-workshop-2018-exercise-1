import assert from 'assert';
import {ThrowDeclaration} from '../src/js/throw-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Throw handler', () => {

    it('should handle throw expression', () => {
        var parsedCode = parseCode('throw "Parameter is not a number!";');
        var expression = new ThrowDeclaration(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });

});
