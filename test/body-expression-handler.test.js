import assert from 'assert';
import {BodyDeclaration} from '../src/js/body-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Value expression handler', () => {

    it('should handle simple expression', () => {
        var parsedCode = parseCode('(param) => {}');
        var expression = new BodyDeclaration(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });

});
