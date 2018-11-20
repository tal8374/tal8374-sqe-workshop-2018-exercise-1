import assert from 'assert';
import {ForOfDeclaration} from '../src/js/for-of-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Throw handler', () => {

    it('should handle for of function', () => {
        var parsedCode = parseCode('for (let value of iterable) {let iterable = [10, 20, 30];}');
        var expression = new ForOfDeclaration(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );


        parsedCode = parseCode('for (let value of iterable) {let iterable = 2 > 3 ? 4 : 5}');
        expression = new ForOfDeclaration(parsedCode.body[0], null, 1);
        result = expression.init();

        assert.equal(
            result,
            'Success'
        );

        parsedCode = parseCode('for (let value of iterable) {let iterable = {a:2}}');
        expression = new ForOfDeclaration(parsedCode.body[0], null, 1);
        result = expression.init();

        assert.equal(
            result,
            'Success'
        );

        parsedCode = parseCode('for (let value of iterable) {function* foo(index) {while (index < 2) {yield index++;}}}');
        expression = new ForOfDeclaration(parsedCode.body[0], null, 1);
        result = expression.init();

        assert.equal(
            result,
            'Success'
        );

        parsedCode = parseCode('for (let value of iterable) {list: {break list;}}');
        expression = new ForOfDeclaration(parsedCode.body[0], null, 1);
        result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });

});
