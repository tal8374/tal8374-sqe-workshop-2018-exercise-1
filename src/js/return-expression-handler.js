import {insertLineHandler} from './common';

function ReturnExpression(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

ReturnExpression.prototype.init = function () {
    this.returnDeclarationHandler();

    this.wrapper.increaseLineNumber(this.lineNumber + 1);
};

ReturnExpression.prototype.returnDeclarationHandler = function (declaration) {
    let payload = this.parseReturn(declaration);

    insertLineHandler(payload);
};

ReturnExpression.prototype.parseReturn = function () {
    var returnValueHandler = new ReturnValueHandler(this.body.argument);

    return {
        type: this.body.type,
        value: returnValueHandler.getValue(),
        lineNumber: this.wrapper.getLineNumber(),
    };
};

function ReturnValueHandler(expression) {
    this.expression = expression;
}

ReturnValueHandler.prototype.getValue = function () {
    if (this.expression.type === 'UnaryExpression') {
        var curValue = this.expression.argument.value ? this.expression.argument.value : this.expression.argument.name;
        return this.expression.operator + this.expression.argument.value;
    } else if (this.expression.operator) {
        var curExpression = this.expression;
        var value = '';

        while (curExpression.left) {
            if (curExpression.left) {
                var leftValue = curExpression.right.name ? curExpression.right.name : curExpression.right.value;
                value = curExpression.operator + leftValue + value;
            } else {
                value = curExpression.name + value;
            }

            curExpression = curExpression.left;
        }

        return curExpression.name + value;
    } else {
        return this.expression.value ? this.expression.value : this.expression.name;
    }
};

export {ReturnExpression};