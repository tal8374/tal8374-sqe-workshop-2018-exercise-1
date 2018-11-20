import {insertLineHandler} from './common';
import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';

function ForOfDeclaration(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

ForOfDeclaration.prototype.init = function () {
    this.declareDeclaration();

    this.handleBody();

    this.increaseLineNumber();

    return 'Success';
};

ForOfDeclaration.prototype.declareDeclaration = function () {
    let condition = this.getCondition();

    let payload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        condition: condition
    };

    insertLineHandler(payload);
};

ForOfDeclaration.prototype.getCondition = function () {
    let condition = this.expression.left.kind + ' ';

    let declarations = this.expression.left.declarations;

    for (let i = 0; i < declarations.length; i++) {
        let declaration = new Expression(declarations[i].id);

        condition += ' ' + declaration.getExpression();
    }
    let inExpression = new Expression(this.expression.right);

    condition += ' of ' + inExpression.getExpression();

    return condition;
};

ForOfDeclaration.prototype.handleBody = function () {
    let bodyContent = this.expression.body.type === 'BlockStatement' ? this.expression.body.body : this.expression.body;

    let body = new BodyDeclaration(bodyContent, this, this.lineNumber + 1);

    body.init();
};

ForOfDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

ForOfDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {ForOfDeclaration};
