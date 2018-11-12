import {insertLineHandler} from './common';

function AssignmentExpression(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

AssignmentExpression.prototype.init = function () {
    if (this.body.expression.expressions) {
        this.handleMultipleExpression();
    } else {
        this.handleSingleExpression();
    }

    this.wrapper.increaseLineNumber(this.lineNumber + 1);
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
    var assignmentExpressionValue = new AssignmentExpressionValue(expression.right);

    return {
        type: 'assignment expression',
        name: expression.left.name,
        value: assignmentExpressionValue.getValue(),
        lineNumber: this.wrapper.getLineNumber(),
    };
};

function AssignmentExpressionValue(valueExpression) {
    this.valueExpression = valueExpression;
}

AssignmentExpressionValue.prototype.getValue = function () {
    if (this.valueExpression.computed) {
        var assignmentExpressionValue = new AssignmentExpressionValue(this.valueExpression.property);

        return this.valueExpression.object.name + '[' + assignmentExpressionValue.getValue() + ']';
    } else if (this.valueExpression.operator) {
        var assignmentExpressionValue = new AssignmentExpressionValue(this.valueExpression.left);

        return assignmentExpressionValue.getValue() + this.valueExpression.operator + this.valueExpression.right.name;
    } else {
        return this.valueExpression.name;
    }
};

export {AssignmentExpression};