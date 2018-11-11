import {variableDeclaration} from './variable-declaration-handler';
import {functionDeclaration} from './function-declaration-handler';
import {whileDeclaration} from './while-declaration-handler';
import {forDeclaration} from './for-declaration-handler';
import {AssignmentExpression} from './assignment-expression-handler';

function bodyDeclaration(body, wrapper, lineNumber = 1) {
    this.body = body;
    this.lineNumber = lineNumber;
    this.wrapper = wrapper;
}


bodyDeclaration.prototype.handlers = {
    'VariableDeclaration': variableDeclaration,
    'FunctionDeclaration': functionDeclaration,
    'WhileStatement': whileDeclaration,
    'ForStatement': forDeclaration,
    'ExpressionStatement': AssignmentExpression,
};

bodyDeclaration.prototype.init = function () {
    for (let i = 0; i < this.body.length; i++) {
        let declarationType = this.body[i].type;

        if (this.handlers[declarationType]) {
            let handler = new this.handlers[declarationType](this.body[i], this, this.lineNumber);

            handler.init();
        }
    }

};

bodyDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if(this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

bodyDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {bodyDeclaration};
