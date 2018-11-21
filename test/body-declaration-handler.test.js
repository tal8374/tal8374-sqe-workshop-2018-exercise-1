import assert from 'assert';
import {BodyDeclaration} from '../src/js/body-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Body declaration handler', () => {

    it('should handle body', () => {
        var parsedCode = parseCode('{let c}');
        var forDeclaration = new BodyDeclaration(parsedCode.body[0], null, 1);
        var result = forDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

});
