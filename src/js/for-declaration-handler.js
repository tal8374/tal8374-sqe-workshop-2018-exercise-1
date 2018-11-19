import {insertLineHandler} from './common';
import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';
import {AssignmentExpression} from './assignment-expression-handler';

function ForDeclaration(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

ForDeclaration.prototype.init = function () {
    this.handleForDeclaration();

    this.handleParamsDeclaration();

    this.handleUpdate();

    this.handleForBody();

    this.increaseLineNumber();

    return 'Success';
};

ForDeclaration.prototype.handleParamsDeclaration = function () {
    let body = new BodyDeclaration(this.expression.init, null, this.lineNumber);

    body.init();
};

ForDeclaration.prototype.getParamData = function (param) {
    return {
        lineNumber: this.lineNumber,
        type: 'Param',
        name: param.id.name,
        value: '' + param.init.value,
    };
};

ForDeclaration.prototype.handleUpdate = function () {
    let update = new AssignmentExpression(this.expression.update, null, this.lineNumber);

    update.init();
};

ForDeclaration.prototype.handleForBody = function () {
    let bodyDeclarationInstance = new BodyDeclaration(this.expression.body.body, this, this.lineNumber + 1);

    bodyDeclarationInstance.init();
};

ForDeclaration.prototype.handleForDeclaration = function () {
    let payload = this.getPayload();

    insertLineHandler(payload);
};

ForDeclaration.prototype.getPayload = function () {
    var condition = new Expression(this.expression.test);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        name: null,
        value: null,
        condition: condition.getExpression(),
    };
};

ForDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

ForDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {ForDeclaration};
