import {BodyDeclaration} from './body-declaration-handler';

import {insertLineHandler} from './common';
import {Expression} from './expression-handler';

function LabeledDeclaration(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

LabeledDeclaration.prototype.init = function () {
    this.handleDeclaration();

    this.handleBody();

    this.increaseLineNumber();

    return 'Success';
};

LabeledDeclaration.prototype.handleBody = function () {
    var bodyDeclarationInstance = new BodyDeclaration(this.expression.body.body, this, this.lineNumber + 1);

    bodyDeclarationInstance.init();
};

LabeledDeclaration.prototype.handleDeclaration = function () {
    var payLoad = this.getPayload();

    insertLineHandler(payLoad);
};

LabeledDeclaration.prototype.getPayload = function () {
    let name = new Expression(this.expression.label);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        name: name.getExpression(),
    };
};

LabeledDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

LabeledDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {LabeledDeclaration};
