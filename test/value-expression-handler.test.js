import assert from 'assert';
import {ValueExpression} from '../src/js/value-expression-handler';

describe('Value expression handler', () => {

    it('should handle simple expression', () => {
        var parsedCode = {
            'type': 'Literal',
            'value': 2,
            'raw': '2'
        };
        var valueExpression = new ValueExpression(parsedCode);
        var result = valueExpression.getValue();

        assert.equal(
            result,
            2
        );

    });

    it('should handle multiple values expression', () => {
        var parsedCode = {
            'type': 'BinaryExpression',
            'operator': '+',
            'left': {
                'type': 'Identifier',
                'name': 'one'
            },
            'right': {
                'type': 'Identifier',
                'name': 'two'
            }
        };
        var valueExpression = new ValueExpression(parsedCode);
        var result = valueExpression.getValue();

        assert.equal(
            result,
            'one+two'
        );


    });

    it('should handle complex expression', () => {
        var parsedCode = {
            'type': 'MemberExpression',
            'computed': true,
            'object': {
                'type': 'Identifier',
                'name': 'arr'
            },
            'property': {
                'type': 'Identifier',
                'name': 'i'
            }
        };
        var valueExpression = new ValueExpression(parsedCode);
        var result = valueExpression.getValue();

        assert.equal(
            result,
            'arr[i]'
        );

    });

});
