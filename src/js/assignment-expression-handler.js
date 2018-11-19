import {insertLineHandler} from './common';

import {ValueExpression} from './value-expression-handler';
import {BodyDeclaration} from './body-declaration-handler';

function AssignmentExpression(body, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = body.expression ? body.expression : body;
    this.lineNumber = lineNumber;
    this.type = type;
}

AssignmentExpression.prototype.init = function () {
    if (this.expression && this.expression.expressions) {
        this.handleMultipleExpression();
    } else if (this.expression && this.expression.type === 'UpdateExpression') {
        this.handleUpdateExpression();
    } else {
        this.handleSingleExpression();
    }

    this.increaseLineNumber();
};

AssignmentExpression.prototype.handleUpdateExpression = function () {
    let valueExpression = new ValueExpression(this.expression.argument);
    let name = valueExpression.getValue() + '++';

    let payload = {
        type: this.type ? this.type : this.expression.type,
        name: name,
        lineNumber: this.lineNumber,
    };

    insertLineHandler(payload);
};

AssignmentExpression.prototype.handleSingleExpression = function () {
    var expression = this.expression ? this.expression : this.body;

    this.assignmentExpressionHandler(expression);
};

AssignmentExpression.prototype.handleMultipleExpression = function () {
    var expressions = this.expression.expressions;

    for (let i = 0; i < expressions.length; i++) {
        this.assignmentExpressionHandler(expressions[i]);
    }
};

AssignmentExpression.prototype.assignmentExpressionHandler = function (declaration) {
    let payload = this.parseAssignmentExpressionHandler(declaration);

    insertLineHandler(payload);
};

AssignmentExpression.prototype.parseAssignmentExpressionHandler = function (expression) {
    var valueExpression = new ValueExpression(expression.right);

    return {
        type: this.type ? this.type : 'assignment expression',
        name: expression.left.name,
        value: valueExpression.getValue(),
        lineNumber: this.lineNumber,
    };
};

AssignmentExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

AssignmentExpression.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {AssignmentExpression};
