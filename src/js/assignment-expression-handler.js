import {insertLineHandler} from './common'

function AssignmentExpression(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

AssignmentExpression.prototype.init = function () {
    var expressions = this.body.expression.expressions;

    for(let i = 0; i < expressions.length; i++) {
        this.assignmentExpressionHandler(expressions[i])
    }

    this.wrapper.increaseLineNumber(this.lineNumber + 1);
};

AssignmentExpression.prototype.assignmentExpressionHandler = function(declaration) {
    let payload = this.parseAssignmentExpressionHandler(declaration);

    insertLineHandler(payload)
};

AssignmentExpression.prototype.parseAssignmentExpressionHandler = function parseVariable(expression) {
    return {
        type : "assignment expression",
        name : expression.left.name,
        value : expression.right.value,
        lineNumber : this.wrapper.getLineNumber(),
    }
};

export {AssignmentExpression};