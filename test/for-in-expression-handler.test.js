import assert from 'assert';
import {ForInDeclaration} from '../src/js/for-in-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Throw handler', () => {

    it('should handle for in', () => {
        var parsedCode = parseCode('for (let value in iterable) {let iterable = [10, 20, 30];}');
        var expression = new ForInDeclaration(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });

});
