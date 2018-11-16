import assert from 'assert';
import {ReturnExpression} from '../src/js/return-expression-handler';

describe('Return expression handler', () => {
    it('should handle return statement of one variable', () => {
        var parsedCode = {
            'type': 'ReturnStatement',
            'argument': {
                'type': 'Identifier',
                'name': 'returnValue'
            }
        };

        var returnExpression = new ReturnExpression(parsedCode, null, 1);
        var result = returnExpression.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should handle return statement of one number', () => {
        var parsedCode = {
            'type': 'ReturnStatement',
            'argument': {
                'type': 'Literal',
                'value': 1,
                'raw': '1'
            }
        };

        var returnExpression = new ReturnExpression(parsedCode, null, 1);
        var result = returnExpression.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should handle return statement of one minus number', () => {
        var parsedCode =  {
            'type': 'ReturnStatement',
            'argument': {
                'type': 'UnaryExpression',
                'operator': '-',
                'argument': {
                    'type': 'Literal',
                    'value': 1,
                    'raw': '1'
                },
                'prefix': true
            }
        };

        var returnExpression = new ReturnExpression(parsedCode, null, 1);
        var result = returnExpression.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should handle return statement of addition of two numbers', () => {
        var parsedCode =  {
            'type': 'ReturnStatement',
            'argument': {
                'type': 'BinaryExpression',
                'operator': '+',
                'left': {
                    'type': 'Literal',
                    'value': 1,
                    'raw': '1'
                },
                'right': {
                    'type': 'Literal',
                    'value': 2,
                    'raw': '2'
                }
            }
        };

        var returnExpression = new ReturnExpression(parsedCode, null, 1);
        var result = returnExpression.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should handle return statement of 2 variables', () => {
        var parsedCode = {
            'type': 'ReturnStatement',
            'argument': {
                'type': 'BinaryExpression',
                'operator': '+',
                'left': {
                    'type': 'Identifier',
                    'name': 'returnValue1'
                },
                'right': {
                    'type': 'Identifier',
                    'name': 'returnValue2'
                }
            }
        };

        var returnExpression = new ReturnExpression(parsedCode, null, 1);
        var result = returnExpression.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should handle return statement of 3 variables', () => {
        var parsedCode =  {
            'type': 'ReturnStatement',
            'argument': {
                'type': 'BinaryExpression',
                'operator': '+',
                'left': {
                    'type': 'BinaryExpression',
                    'operator': '+',
                    'left': {
                        'type': 'Identifier',
                        'name': 'returnValue1'
                    },
                    'right': {
                        'type': 'Identifier',
                        'name': 'returnValue2'
                    }
                },
                'right': {
                    'type': 'Identifier',
                    'name': 'returnValue3'
                }
            }
        };

        var returnExpression = new ReturnExpression(parsedCode, null, 1);
        var result = returnExpression.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('should handle return complex statement', () => {
        var parsedCode = {
            'type': 'ReturnStatement',
            'argument': {
                'type': 'MemberExpression',
                'computed': true,
                'object': {
                    'type': 'Identifier',
                    'name': 'returnValue'
                },
                'property': {
                    'type': 'Literal',
                    'value': 2,
                    'raw': '2'
                }
            }
        };

        var returnExpression = new ReturnExpression(parsedCode, null, 1);
        var result = returnExpression.init();

        assert.equal(
            result,
            'Success'
        );
    });

    it('Should increase line number', () => {
        var parsedCode = {
            'type': 'ReturnStatement',
            'argument': {
                'type': 'Identifier',
                'name': 'returnValue'
            }
        };

        var returnExpression = new ReturnExpression(parsedCode, null, 1);
        returnExpression.increaseLineNumber();

        assert.equal(
            returnExpression.getLineNumber(),
            2
        );
    });

    it('should return the line number', () => {
        var parsedCode = {
            'type': 'ReturnStatement',
            'argument': {
                'type': 'Identifier',
                'name': 'returnValue'
            }
        };

        var returnExpression = new ReturnExpression(parsedCode, null, 1);

        assert.equal(
            returnExpression.getLineNumber(),
            1
        );
    });


});
