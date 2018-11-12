import {variableDeclaration} from './variable-declaration-handler';
import {functionDeclaration} from './function-declaration-handler';
import {WhileDeclaration} from './while-declaration-handler';
import {forDeclaration} from './for-declaration-handler';
import {AssignmentExpression} from './assignment-expression-handler';
import {IfExpression} from './if-expression-handler';

function BodyDeclaration(body, wrapper, lineNumber = 1) {
    this.body = body;
    this.lineNumber = lineNumber;
    this.wrapper = wrapper;
}

BodyDeclaration.prototype.handlers = {
    'VariableDeclaration': variableDeclaration,
    'FunctionDeclaration': functionDeclaration,
    'WhileStatement': WhileDeclaration,
    'ForStatement': forDeclaration,
    'ExpressionStatement': AssignmentExpression,
    'IfStatement': IfExpression,
};

BodyDeclaration.prototype.init = function () {
    if(this.body.length) {
        for (let i = 0; i < this.body.length; i++) {
            let declarationType = this.body[i].type;

            if (this.handlers[declarationType]) {
                let handler = new this.handlers[declarationType](this.body[i], this, this.lineNumber);

                handler.init();
            }
        }
    } else {
        let declarationType = this.body.type;

        if (this.handlers[declarationType]) {
            let handler = new this.handlers[declarationType](this.body, this, this.lineNumber);

            handler.init();
        }
    }

    // for (let i = 0; i < this.body.length; i++) {
    //     let declarationType = this.body[i].type;
    //
    //     if (this.handlers[declarationType]) {
    //         let handler = new this.handlers[declarationType](this.body[i], this, this.lineNumber);
    //
    //         handler.init();
    //     }
    // }
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
