import {insertLineHandler} from './common';
import {bodyDeclaration} from './body-declaration-handler';
import {variableDeclaration} from './variable-declaration-handler';
import {functionDeclaration} from './function-declaration-handler';

function forDeclaration(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

forDeclaration.prototype.init = function () {
    this.handleForDeclaration();

    this.handleParamsDeclaration();

    this.handleForBody();

    this.wrapper.increaseLineNumber();
};

forDeclaration.prototype.handleParamsDeclaration = function () {
    var params = this.body.init.declarations;

    for (let i = 0; i < params.length; i++) {
        var payload = this.getParamData(params[i]);

        insertLineHandler(payload);
    }
};

forDeclaration.prototype.getParamData = function (param) {
    return {
        lineNumber: this.lineNumber,
        type: 'Param',
        name: param.id.name,
        value: param.init.value,
    };
};

forDeclaration.prototype.handleForBody = function () {
    var bodyDeclarationInstance = new bodyDeclaration(this.body.body.body, this, this.lineNumber + 1);

    bodyDeclarationInstance.init();
};

forDeclaration.prototype.handleForDeclaration = function () {
    var payLoad = this.getForData();

    insertLineHandler(payLoad, this.lineNumber);
};

forDeclaration.prototype.getForData = function () {
    return {
        lineNumber: this.lineNumber,
        type: this.body.type,
        name: null,
        value: null,
    };
};

forDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

forDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};


export {forDeclaration};