import assert from 'assert';
import {ForDeclaration} from '../src/js/for-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('For declaration handler', () => {
    it('should handle empty body', () => {
        var parsedCode = parseCode('for(let i = 0; i < num; i++){}');
        var forDeclaration = new ForDeclaration(parsedCode.body[0], null, 1);
        var result = forDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('Should increase line number', () => {
        var parsedCode = parseCode('for(let i = 0; i < num; i++){let i = 0}');
        var forDeclaration = new ForDeclaration(parsedCode.body[0], null, 1);
        forDeclaration.increaseLineNumber();

        assert.equal(
            forDeclaration.getLineNumber(),
            2
        );
    });

    it('should return the line number', () => {
        var parsedCode = parseCode('for(let i = 0; i < num; i++){let i = 0}');
        var forDeclaration = new ForDeclaration(parsedCode.body[0], null, 1);

        assert.equal(
            forDeclaration.getLineNumber(),
            1
        );
    });

    it('should handle for loop with body', () => {
        var parsedCode = parseCode('for(let i = 0; i < num; i++){let i = 0}');
        var forDeclaration = new ForDeclaration(parsedCode.body[0], null, 1);
        var result = forDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

});
