import assert from 'assert';
import {TryCatchFinallyDeclaration} from '../src/js/try-catch-declaration-handler';
import {parseCode} from '../src/js/code-analyzer';

describe('Try catch handler', () => {

    it('should handle try catch finally', () => {
        var parsedCode = parseCode(' try {}catch(err){}finally {}');
        var expression = new TryCatchFinallyDeclaration(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });

    it('should handle try catch finallywith body', () => {
        var parsedCode = parseCode(' try {let a}catch(err){let a}finally {let a}');
        var expression = new TryCatchFinallyDeclaration(parsedCode.body[0], null, 1);
        var result = expression.init();

        assert.equal(
            result,
            'Success'
        );

    });

});
