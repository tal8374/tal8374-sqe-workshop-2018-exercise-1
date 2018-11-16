import assert from 'assert';
import {Expression} from '../src/js/expression-handler';

describe('Condition handler', () => {
    it('should handle one variable', () => {
        var parsedCode = {
            'type': 'Identifier',
            'name': 'condition'
        };
        var expression = new Expression(parsedCode, null, 1);
        var result = expression.getExpression();

        assert.equal(
            result,
            'condition'
        );
    });

    it('should handle two variables', () => {
        var parsedCode = {
            'type': 'BinaryExpression',
            'operator': '+',
            'left': {
                'type': 'Identifier',
                'name': 'condition1'
            },
            'right': {
                'type': 'Identifier',
                'name': 'condition2'
            }
        };
        var expression = new Expression(parsedCode, null, 1);
        var result = expression.getExpression();

        assert.equal(
            result,
            'condition1+condition2'
        );
    });

    it('should handle two numbers', () => {
        var parsedCode = {
            'type': 'BinaryExpression',
            'operator': '+',
            'left': {
                'type': 'Literal',
                'value': 2,
                'raw': '2'
            },
            'right': {
                'type': 'Literal',
                'value': 3,
                'raw': '3'
            }
        };
        var expression = new Expression(parsedCode, null, 1);
        var result = expression.getExpression();

        assert.equal(
            result,
            '2+3'
        );
    });

    it('should handle one number', () => {
        var parsedCode = {
            'type': 'Literal',
            'value': 2,
            'raw': '2'
        };
        var expression = new Expression(parsedCode, null, 1);
        var result = expression.getExpression();

        assert.equal(
            result,
            '2'
        );
    });

});
