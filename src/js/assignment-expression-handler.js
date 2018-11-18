import {insertLineHandler} from './common';

import {ValueExpression} from './value-expression-handler';

function AssignmentExpression(body, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
    this.type = type;
}

AssignmentExpression.prototype.init = function () {
    if (this.body.expression.expressions) {
        this.handleMultipleExpression();
    } else if (this.body.expression.type === 'UpdateExpression') {
        this.handleUpdateExpression();
    } else {
        this.handleSingleExpression();
    }

    this.wrapper.increaseLineNumber(this.lineNumber + 1);
};

AssignmentExpression.prototype.handleUpdateExpression = function () {
    let valueExpression = new ValueExpression(this.body.expression.argument);
    let name;
    if (this.body.expression.prefix) {
        name = '++' + valueExpression.getValue();
    } else {
        name = valueExpression.getValue() + '++';
    }

    let payload = {
        type: this.type ? this.type : this.body.expression.type,
        name: name,
        lineNumber: this.wrapper.getLineNumber(),
    };

    insertLineHandler(payload);
};

AssignmentExpression.prototype.handleSingleExpression = function () {
    var expression = this.body.expression;

    this.assignmentExpressionHandler(expression);
};

AssignmentExpression.prototype.handleMultipleExpression = function () {
    var expressions = this.body.expression.expressions;

    for (let i = 0; i < expressions.length; i++) {
        this.assignmentExpressionHandler(expressions[i]);
    }
};

AssignmentExpression.prototype.assignmentExpressionHandler = function (declaration) {
    let payload = this.parseAssignmentExpressionHandler(declaration);

    insertLineHandler(payload);
};

AssignmentExpression.prototype.parseAssignmentExpressionHandler = function parseVariable(expression) {
    var valueExpression = new ValueExpression(expression.right);

    return {
        type: this.type ? this.type : 'assignment expression',
        name: expression.left.name,
        value: valueExpression.getValue(),
        lineNumber: this.wrapper.getLineNumber(),
    };
};

export {AssignmentExpression};
