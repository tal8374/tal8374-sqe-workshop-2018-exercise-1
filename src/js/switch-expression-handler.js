import {BodyDeclaration} from './body-declaration-handler';
import {Expression} from './expression-handler';

import {insertLineHandler} from './common';

function SwitchStatementExpression(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
}

SwitchStatementExpression.prototype.init = function () {
    this.handleDeclaration();

    this.handleCases();

    return 'Initialization done';
};

SwitchStatementExpression.prototype.handleDeclaration = function () {
    let payload = this.getPayload();

    insertLineHandler(payload);
};

SwitchStatementExpression.prototype.getPayload = function () {
    let condition = new Expression(this.expression.discriminant);

    return {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : this.expression.type,
        name: null,
        value: null,
        condition: condition ? condition.getExpression() : '',
    };
};

SwitchStatementExpression.prototype.handleCases = function () {
    for (let caseNumber = 0; caseNumber < this.expression.cases.length; caseNumber++) {
        this.handleCase(this.expression.cases[caseNumber]);
    }
};

SwitchStatementExpression.prototype.handleCase = function (caseData) {
    this.increaseLineNumber();

    this.handleCaseName(caseData);

    this.handleCaseBody(caseData);
};

SwitchStatementExpression.prototype.handleCaseName = function (caseData) {
    let caseName = new Expression(caseData.test);

    let caseNamePayload = {
        lineNumber: this.lineNumber,
        type: this.type ? this.type : caseData.type,
        name: null,
        value: null,
        condition: caseName ? '' + caseName.getExpression() : '',
    };

    insertLineHandler(caseNamePayload);

};

SwitchStatementExpression.prototype.handleCaseBody = function (caseData) {
    let body = new BodyDeclaration(caseData.consequent, this, this.lineNumber + 1);

    body.init();

    this.increaseLineNumber();
};

SwitchStatementExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

SwitchStatementExpression.prototype.getLineNumber = function () {
    return this.lineNumber;
};

export {SwitchStatementExpression};
