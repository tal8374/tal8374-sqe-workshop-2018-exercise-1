import assert from 'assert';
import {FunctionDeclaration} from '../src/js/function-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Function declaration handler', () => {
    it('should check function statement with empty body', () => {
        var parsedCode = parseCode('function functionName(){}');
        var functionDeclaration = new FunctionDeclaration(parsedCode.body[0], null, 1);
        var result = functionDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should check function statement with body', () => {
        var parsedCode = parseCode('function functionName(){let a}');
        var functionDeclaration = new FunctionDeclaration(parsedCode.body[0], null, 1);
        var result = functionDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should check function statement with one argument', () => {
        var parsedCode = parseCode('function functionName(arg1){}');
        var functionDeclaration = new FunctionDeclaration(parsedCode.body[0], null, 1);
        var result = functionDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should check function statement with two argument', () => {
        var parsedCode = parseCode('function functionName(arg1, arg2){}');
        var functionDeclaration = new FunctionDeclaration(parsedCode.body[0], null, 1);
        var result = functionDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should get line number after increase', () => {
        var parsedCode = parseCode('function functionName(){}');
        var functionDeclaration = new FunctionDeclaration(parsedCode.body[0], null, 1);
        functionDeclaration.increaseLineNumber();

        assert.equal(
            functionDeclaration.getLineNumber(),
            2
        );
    });

    it('should handle param with assignment', () => {
        var parsedCode = parseCode('function functionName(p = 1){}');
        var functionDeclaration = new FunctionDeclaration(parsedCode.body[0], null, 1);
        var result = functionDeclaration.init();

        assert.equal(
            result,
            'Success'
        );
    });

});
