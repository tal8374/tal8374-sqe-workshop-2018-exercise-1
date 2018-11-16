function Expression(conditionExpression) {
    this.conditionExpression = conditionExpression;
}

Expression.prototype.getExpression = function () {
    return this.handlers[this.conditionExpression.type](this.conditionExpression);
};

Expression.prototype.handlers = {
    'Literal': literalTestHandler,
    'BinaryExpression': binaryExpressionHandler,
    'Identifier': identifierTestHandler,
    'MemberExpression': memberExpressionTestHandler,
    'UnaryExpression': unaryExpressionExpressionTestHandler,
};

function literalTestHandler(conditionExpression) {
    return conditionExpression.value;
}

function binaryExpressionHandler(conditionExpression) {
    let left = new Expression(conditionExpression.left).getExpression();
    let operator = conditionExpression.operator;
    let right = new Expression(conditionExpression.right).getExpression();

    return left + operator + right;
}

function unaryExpressionExpressionTestHandler(conditionExpression) {
    let operator = conditionExpression.operator;
    let argument = new Expression(conditionExpression.argument).getExpression();

    return operator + argument;
}

function identifierTestHandler(conditionExpression) {
    return conditionExpression.name;
}


function memberExpressionTestHandler(conditionExpression) {
    let object = conditionExpression.object.name;
    let property = new Expression(conditionExpression.property).getExpression();

    return object + '[' + property + ']';
}

export {Expression};