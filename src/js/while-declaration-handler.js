import {BodyDeclaration} from './body-declaration-handler';

import {insertLineHandler} from './common';
import {Expression} from './expression-handler';

function WhileDeclaration(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

WhileDeclaration.prototype.init = function () {
    this.handleWhileDeclaration();

    this.handleWhileBody();

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }

    return 'Success';
};

WhileDeclaration.prototype.handleWhileBody = function () {
    var bodyDeclarationInstance;

    if (this.expression.body.body) {
        bodyDeclarationInstance = new BodyDeclaration(this.expression.body.body, this, this.lineNumber + 1);
    } else {
        bodyDeclarationInstance = new BodyDeclaration(this.expression.body, this, this.lineNumber + 1);
    }

    bodyDeclarationInstance.init();
};

WhileDeclaration.prototype.handleWhileDeclaration = function () {
    var payLoad = this.getWhileData();

    insertLineHandler(payLoad);
};

WhileDeclaration.prototype.getWhileData = function () {
    let expression = new Expression(this.expression.test);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        name: null,
        value: null,
        condition: expression.getExpression(),
    };
};

WhileDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

WhileDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {WhileDeclaration};