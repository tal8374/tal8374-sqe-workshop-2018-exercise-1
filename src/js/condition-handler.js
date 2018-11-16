function Condition(conditionExpression) {
    this.conditionExpression = conditionExpression;
}

Condition.prototype.handlers = {
    'Literal': literalTestHandler,
    'BinaryExpression': binaryExpressionHandler,
    'Identifier': identifierTestHandler,
    'MemberExpression': memberExpressionTestHandler,
};

Condition.prototype.getConditionExpression = function () {
    return this.handlers[this.conditionExpression.type](this.conditionExpression);
};

function literalTestHandler(conditionExpression) {
    return conditionExpression.value;
}

function binaryExpressionHandler(conditionExpression) {
    let left = new Condition(conditionExpression.left).getConditionExpression();
    let operator = conditionExpression.operator;
    let right = new Condition(conditionExpression.right).getConditionExpression();

    return left + operator + right;
}

function identifierTestHandler(conditionExpression) {
    return conditionExpression.name;
}

function memberExpressionTestHandler(conditionExpression) {
    let object = conditionExpression.object.name;
    let property = new Condition(conditionExpression.property).getConditionExpression();

    return object + '[' + property + ']';
}

export {Condition};