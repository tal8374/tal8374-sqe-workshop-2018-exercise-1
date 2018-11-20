import assert from 'assert';
import {LabeledDeclaration} from '../src/js/labeled-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Labeled handler', () => {

    it('should handle labled expression', () => {
        var parsedCode = parseCode('even:for (let i = 1; i <= 10; i++){}');
        var expression = new LabeledDeclaration(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });

});
