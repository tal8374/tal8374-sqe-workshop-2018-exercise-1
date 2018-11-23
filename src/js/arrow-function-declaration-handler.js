import {BodyDeclaration} from './body-declaration-handler';

import {insertLineHandler} from './common';

function ArrowFunctionDeclaration(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

ArrowFunctionDeclaration.prototype.init = function () {
    this.handleDeclaration();

    this.handleParams();

    this.handleBody();

    this.increaseLineNumber();

    return 'Success';
};

ArrowFunctionDeclaration.prototype.handleBody = function () {
    let bodyContent = this.expression.body.type === 'BlockStatement' ? this.expression.body.body : this.expression.body;

    let body = new BodyDeclaration(bodyContent, this, this.lineNumber + 1);

    body.init();
};

ArrowFunctionDeclaration.prototype.handleDeclaration = function () {
    var payLoad = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
    };

    insertLineHandler(payLoad);
};

ArrowFunctionDeclaration.prototype.handleParams = function () {
    var params = this.expression.params;

    for (let i = 0; i < params.length; i++) {
        var payload = this.getParamData(params[i]);

        insertLineHandler(payload);
    }
};

ArrowFunctionDeclaration.prototype.getParamData = function (param) {
    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        name: param.name,
        value: null,
    };
};

ArrowFunctionDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

ArrowFunctionDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {ArrowFunctionDeclaration};
