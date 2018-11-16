import {VariableDeclaration} from './variable-declaration-handler';
import {FunctionDeclaration} from './function-declaration-handler';
import {WhileDeclaration} from './while-declaration-handler';
import {ForDeclaration} from './for-declaration-handler';
import {AssignmentExpression} from './assignment-expression-handler';
import {IfExpression} from './if-expression-handler';
import {ReturnExpression} from './return-expression-handler';

function BodyDeclaration(body, wrapper, lineNumber = 1) {
    this.body = body;
    this.lineNumber = lineNumber;
    this.wrapper = wrapper;
}

BodyDeclaration.prototype.handlers = {
    'VariableDeclaration': VariableDeclaration,
    'FunctionDeclaration': FunctionDeclaration,
    'WhileStatement': WhileDeclaration,
    'ForStatement': ForDeclaration,
    'ExpressionStatement': AssignmentExpression,
    'AssignmentExpression': AssignmentExpression,
    'IfStatement': IfExpression,
    'ReturnStatement': ReturnExpression,
};

BodyDeclaration.prototype.init = function () {
    if (!this.body.length) {
        this.body = [this.body];
    }

    for (let i = 0; i < this.body.length; i++) {
        this.handleDeclaration(this.body[i]);
    }
};

BodyDeclaration.prototype.handleDeclaration = function (declaration) {
    let declarationType = declaration.type;

    if (this.handlers[declarationType]) {
        let declarationHandler = new this.handlers[declarationType](declaration, this, this.lineNumber);

        declarationHandler.init();
    }
};

BodyDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

BodyDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {BodyDeclaration};
