import {bodyDeclaration} from './body-declaration-handler';

import {insertLineHandler} from './common';

function whileDeclaration(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
}

whileDeclaration.prototype.init = function () {
    this.handleWhileDeclaration();

    this.handleWhileBody();

    this.wrapper.increaseLineNumber();
};

whileDeclaration.prototype.handleWhileBody = function () {
    var bodyDeclarationInstance = new bodyDeclaration(this.body.body.body, this, this.lineNumber + 1);

    bodyDeclarationInstance.init();
};

whileDeclaration.prototype.handleWhileDeclaration = function () {
    var payLoad = this.getWhileData();

    insertLineHandler(payLoad);
};

whileDeclaration.prototype.getWhileData = function() {
    var condition = this.body.test.left.name + this.body.test.operator + this.body.test.right.name;

    return {
        lineNumber: this.lineNumber,
        type: this.body.type,
        name: null,
        value: null,
        condition: condition,
    };
};

whileDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if(this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

whileDeclaration.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {whileDeclaration};