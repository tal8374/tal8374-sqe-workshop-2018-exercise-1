import assert from 'assert';
import {VariableDeclaration} from '../src/js/variable-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Variable declaration handler', () => {

    it('should create variable', () => {
        var parsedCode = parseCode('let x');
        var variableDeclaration = new VariableDeclaration(parsedCode.body[0], null, 1);
        var result = variableDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should create multiple variable', () => {
        var parsedCode = parseCode('let x,y');
        var variableDeclaration = new VariableDeclaration(parsedCode.body[0], null, 1);
        var result = variableDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

});
