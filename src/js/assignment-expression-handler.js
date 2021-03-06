import {insertLineHandler} from './common';

import {ValueExpression} from './value-expression-handler';
import {ArrowFunctionDeclaration} from './arrow-function-declaration-handler';

function AssignmentExpression(body, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = body.expression ? body.expression : body;
    this.lineNumber = lineNumber;
    this.type = type;
}

AssignmentExpression.prototype.init = function () {
    if (!this.expression) {
        return;
    }

    if (this.expression.expressions) {
        this.handleMultipleExpression();
    } else if (this.expression.type === 'UpdateExpression') {
        this.handleUpdateExpression();
    } else if (this.expression.type === 'ArrowFunctionExpression') {
        this.handleArrowFunction();
    } else {
        this.handleSingleExpression();
    }

    this.increaseLineNumber();

    return 'Success';
};

AssignmentExpression.prototype.handleArrowFunction = function () {
    let arrowFunction = new ArrowFunctionDeclaration(this.expression, this, this.lineNumber);

    arrowFunction.init();
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
    var expression = this.expression;

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
    let valueExpression = new ValueExpression(expression.right ? expression.right : expression);


    return {
        type: this.type ? this.type : this.expression.type,
        name: this.getName(expression),
        value: '' + valueExpression.getValue(),
        lineNumber: this.lineNumber,
    };
};

AssignmentExpression.prototype.getName = function (expression) {
    if(!expression.left) return '';

    return expression.left.name ? expression.left.name : expression.left.property.name;
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
