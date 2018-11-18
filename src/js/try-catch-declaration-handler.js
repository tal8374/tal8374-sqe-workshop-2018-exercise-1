import {insertLineHandler} from './common';
import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';
import {FunctionDeclaration} from './function-declaration-handler';

function TryCatchFinallyDeclaration(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

TryCatchFinallyDeclaration.prototype.init = function () {
    console.log(this.expression);
    this.handleTry();

    this.handleCatch();

    this.handleFinal();

    return 'Success';
};

TryCatchFinallyDeclaration.prototype.handleTry = function () {
    this.declareTry();

    this.handleBody(this.expression.block.body);
};

TryCatchFinallyDeclaration.prototype.declareTry = function () {
    let breakPayload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
    };

    insertLineHandler(breakPayload);
};

TryCatchFinallyDeclaration.prototype.handleBody = function (body) {
    let bodyInstance = new BodyDeclaration(body, this, this.lineNumber + 1);

    bodyInstance.init();

    this.increaseLineNumber();
};

TryCatchFinallyDeclaration.prototype.handleCatch = function () {
    this.declareCatch();

    this.handleCatchParams();

    this.handleBody(this.expression.handler.body.body);
};

TryCatchFinallyDeclaration.prototype.declareCatch = function () {
    let breakPayload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.handler.type,
    };

    insertLineHandler(breakPayload);
};

TryCatchFinallyDeclaration.prototype.handleCatchParams = function () {
    var param = this.expression.handler.param;

    var payload = this.getParamData(param);

    insertLineHandler(payload);
};

TryCatchFinallyDeclaration.prototype.getParamData = function (param) {
    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : 'Param',
        name: param.name,
        value: null,
    };
};

TryCatchFinallyDeclaration.prototype.handleFinal = function () {
    this.declareFinal();

    this.handleBody(this.expression.finalizer.body);
};

TryCatchFinallyDeclaration.prototype.declareFinal = function () {
    let breakPayload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.finalizer.type,
    };

    insertLineHandler(breakPayload);
};

TryCatchFinallyDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

TryCatchFinallyDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {TryCatchFinallyDeclaration};
