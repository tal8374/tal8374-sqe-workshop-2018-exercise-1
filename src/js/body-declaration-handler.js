import {VariableDeclaration} from './variable-declaration-handler';
import {FunctionDeclaration} from './function-declaration-handler';
import {WhileDeclaration} from './while-declaration-handler';
import {ForDeclaration} from './for-declaration-handler';
import {AssignmentExpression} from './assignment-expression-handler';
import {IfExpression} from './if-expression-handler';
import {ReturnExpression} from './return-expression-handler';
import {SwitchStatementExpression} from './switch-expression-handler';
import {DoWhileStatementExpression} from './do-while-expression-handler';
import {ThrowDeclaration} from './throw-declaration-handler';
import {TryCatchFinallyDeclaration} from './try-catch-declaration-handler';
import {BreakStatementExpression} from './break-expression-handler';
import {ContinueStatementExpression} from './continue-expression-handler';
import {LabeledDeclaration} from './labeled-declaration-handler';
import {ForInDeclaration} from './for-in-declaration-handler';
import {ForOfDeclaration} from './for-of-declaration-handler';

function BodyDeclaration(body, wrapper, lineNumber = 1, type) {
    this.body = body;
    this.lineNumber = lineNumber;
    this.wrapper = wrapper;
    this.type = type;
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
    'SwitchStatement': SwitchStatementExpression,
    'DoWhileStatement': DoWhileStatementExpression,
    'ThrowStatement': ThrowDeclaration,
    'BreakStatement': BreakStatementExpression,
    'ContinueStatement': ContinueStatementExpression,
    'LabeledStatement': LabeledDeclaration,
    'TryStatement': TryCatchFinallyDeclaration,
    'ForInStatement': ForInDeclaration,
    'ForOfStatement': ForOfDeclaration,
};

BodyDeclaration.prototype.init = function () {
    if (!this.body.length) {
        this.body = [this.body];
    }

    for (let i = 0; i < this.body.length; i++) {
        this.handleDeclaration(this.body[i]);
    }

    return 'Success'
};

BodyDeclaration.prototype.handleDeclaration = function (declaration) {
    let declarationType = declaration.type;

    if (this.handlers[declarationType]) {
        let declarationHandler = new this.handlers[declarationType](declaration, this, this.lineNumber, this.type);

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
