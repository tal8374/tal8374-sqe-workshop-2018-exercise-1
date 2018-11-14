import {insertLineHandler} from './common';
import {BodyDeclaration} from './body-declaration-handler';

function ForDeclaration(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

ForDeclaration.prototype.init = function () {
    this.handleForDeclaration();

    this.handleParamsDeclaration();

    this.handleForBody();

    this.wrapper.increaseLineNumber();
};

ForDeclaration.prototype.handleParamsDeclaration = function () {
    var params = this.body.init.declarations;

    for (let i = 0; i < params.length; i++) {
        var payload = this.getParamData(params[i]);

        insertLineHandler(payload);
    }
};

ForDeclaration.prototype.getParamData = function (param) {
    return {
        lineNumber: this.lineNumber,
        type: 'Param',
        name: param.id.name,
        value: param.init.value,
    };
};

ForDeclaration.prototype.handleForBody = function () {
    var bodyDeclarationInstance = new BodyDeclaration(this.body.body.body, this, this.lineNumber + 1);

    bodyDeclarationInstance.init();
};

ForDeclaration.prototype.handleForDeclaration = function () {
    var payLoad = this.getForData();

    insertLineHandler(payLoad);
};

ForDeclaration.prototype.getForData = function () {
    return {
        lineNumber: this.lineNumber,
        type: this.body.type,
        name: null,
        value: null,
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