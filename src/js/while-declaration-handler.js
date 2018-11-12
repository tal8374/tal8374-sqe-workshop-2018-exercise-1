import {BodyDeclaration} from './body-declaration-handler';

import {insertLineHandler} from './common';

function WhileDeclaration(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

WhileDeclaration.prototype.init = function () {
    this.handleWhileDeclaration();

    this.handleWhileBody();

    this.wrapper.increaseLineNumber();
};

WhileDeclaration.prototype.handleWhileBody = function () {
    var bodyDeclarationInstance;

    if(this.body.body.body) {
        bodyDeclarationInstance = new BodyDeclaration(this.body.body.body, this, this.lineNumber + 1);
    } else {
        bodyDeclarationInstance = new BodyDeclaration(this.body.body, this, this.lineNumber + 1);
    }

    bodyDeclarationInstance.init();
};

WhileDeclaration.prototype.handleWhileDeclaration = function () {
    var payLoad = this.getWhileData();

    insertLineHandler(payLoad);
};

WhileDeclaration.prototype.getWhileData = function() {
    var condition = this.body.test.left.name + this.body.test.operator + this.body.test.right.name;

    return {
        lineNumber: this.lineNumber,
        type: this.body.type,
        name: null,
        value: null,
        condition: condition,
    };
};

WhileDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if(this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

WhileDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {WhileDeclaration};