import assert from 'assert';
import {WhileDeclaration} from '../src/js/while-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('While declaration handler', () => {
    it('should check while statement with one condition', () => {
        var parsedCode = parseCode('while(statement){}');
        var whileDeclaration = new WhileDeclaration(parsedCode.body[0], null, 1);
        var result = whileDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should check while statement with body', () => {
        var parsedCode = parseCode('while(statement){let a}');
        var whileDeclaration = new WhileDeclaration(parsedCode.body[0], null, 1);
        var result = whileDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should check while statement with two condition', () => {
        var parsedCode = parseCode('while(statement < 2){}');
        var whileDeclaration = new WhileDeclaration(parsedCode.body[0], null, 1);
        var result = whileDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should check while statement with two condition of addition', () => {
        var parsedCode = parseCode('while(statement + 2){}');
        var whileDeclaration = new WhileDeclaration(parsedCode.body[0], null, 1);
        var result = whileDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should check while statement with complex condition', () => {
        var parsedCode = parseCode('while(arr[i]){}');
        var whileDeclaration = new WhileDeclaration(parsedCode.body[0], null, 1);
        whileDeclaration.increaseLineNumber();
        var result = whileDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should check while statement with complex condition', () => {
        var parsedCode = parseCode('while(arr[i]){}');
        var whileDeclaration = new WhileDeclaration(parsedCode.body[0], null, 1);
        whileDeclaration.increaseLineNumber();
        var result = whileDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should get line number after increase', () => {
        var parsedCode = parseCode('while(arr[i]){}');
        var whileDeclaration = new WhileDeclaration(parsedCode.body[0], null, 1);
        whileDeclaration.increaseLineNumber();

        assert.equal(
            whileDeclaration.getLineNumber(),
            2
        );
    });

});
