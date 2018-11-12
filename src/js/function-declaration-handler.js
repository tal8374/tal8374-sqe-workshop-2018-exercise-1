import {insertLineHandler} from './common';
import {BodyDeclaration} from './body-declaration-handler';

function functionDeclaration(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

functionDeclaration.prototype.init = function () {
    this.handleFunctionDeclaration();

    this.handleParamsDeclaration();

    this.handleFunctionBody();

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

functionDeclaration.prototype.handleFunctionBody = function () {
    var bodyDeclarationInstance = new BodyDeclaration(this.body.body.body, this, this.lineNumber + 1);

    bodyDeclarationInstance.init();
};

functionDeclaration.prototype.handleParamsDeclaration = function () {
    var params = this.body.params;

    for (let i = 0; i < params.length; i++) {
        var payload = this.getParamData(params[i]);

        insertLineHandler(payload);
    }
};

functionDeclaration.prototype.getParamData = function (param) {
    return {
        lineNumber: this.lineNumber,
        type: 'Param',
        name: param.name,
        value: null,
    };
};

functionDeclaration.prototype.handleFunctionDeclaration = function () {
    var payLoad = this.getFunctionData();

    insertLineHandler(payLoad, this.lineNumber);
};

functionDeclaration.prototype.getFunctionData = function () {
    return {
        lineNumber: this.lineNumber,
        type: this.body.type,
        name: this.body.id.name,
        value: null,
    };
};

functionDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

functionDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {functionDeclaration};