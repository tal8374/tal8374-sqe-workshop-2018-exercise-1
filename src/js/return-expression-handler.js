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
    let returnValueHandler = new ReturnValueHandler(this.body.argument);

    return {
        type: this.body.type,
        value: returnValueHandler.getValue(),
        lineNumber: this.wrapper.getLineNumber(),
    };
};

function ReturnValueHandler(expression) {
    this.expression = expression;
}

ReturnValueHandler.prototype.valueHandlers = {
    'unaryExpressionHandler': ReturnValueHandler.unaryExpressionHandler,
    'regularExpressionHandler': ReturnValueHandler.regularExpressionHandler,
    'complexExpressionHandler': ReturnValueHandler.complexExpressionHandler,
};

ReturnValueHandler.prototype.unaryExpressionHandler = function () {
    let curValue = this.expression.argument.value ? this.expression.argument.value : this.expression.argument.name;

    return curValue + this.expression.operator + this.expression.argument.value;
};

ReturnValueHandler.prototype.regularExpressionHandler = function () {
    return this.expression.value ? this.expression.value : this.expression.name;
};


ReturnValueHandler.prototype.complexExpressionHandler = function () {
    let curExpression = this.expression;
    let value = '';

    while (curExpression.left) {
        if (curExpression.left) {
            let leftValue = curExpression.right.name ? curExpression.right.name : curExpression.right.value;
            value = curExpression.operator + leftValue + value;
        } else {
            value = curExpression.name + value;
        }

        curExpression = curExpression.left;
    }

    return curExpression.name + value;
};

ReturnValueHandler.prototype.getValue = function () {
    if (this.expression.type === 'UnaryExpression') {
        return this.valueHandlers['UnaryExpression'];
    } else if (this.expression.operator) {
        return this.valueHandlers['complexExpressionHandler'];
    } else {
        return this.valueHandlers['regularExpressionHandler'];
    }
};

export {ReturnExpression};