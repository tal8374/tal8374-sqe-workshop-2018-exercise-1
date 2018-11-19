function Expression(conditionExpression) {
    this.conditionExpression = conditionExpression;
}

Expression.prototype.getExpression = function () {
    if (!this.conditionExpression || !this.handlers[this.conditionExpression.type]) {
        return '';
    }

    return this.handlers[this.conditionExpression.type](this.conditionExpression);
};

Expression.prototype.handlers = {
    'Literal': literalTestHandler,
    'BinaryExpression': binaryExpressionHandler,
    'Identifier': identifierTestHandler,
    'MemberExpression': memberExpressionTestHandler,
    'UnaryExpression': unaryExpressionTestHandler,
    'CallExpression': callExpressionTestHandler,
    'ArrayExpression': arrayExpressionTestHandler,
    'LogicalExpression':logicalExpressionTestHandler,
    'YieldExpression':yieldExpressionHandler,
};

function literalTestHandler(conditionExpression) {
    return conditionExpression.value;
}

function binaryExpressionHandler(conditionExpression) {
    console.log(conditionExpression);
    let left = new Expression(conditionExpression.left).getExpression();
    let operator = conditionExpression.operator;
    let right = new Expression(conditionExpression.right).getExpression();

    return left + operator + right;
}

function unaryExpressionTestHandler(conditionExpression) {
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

function callExpressionTestHandler(conditionExpression) {
    let property = new Expression(conditionExpression.callee).getExpression();

    return property + '()';
}

function arrayExpressionTestHandler(conditionExpression) {
    let array = '';

    for (let i = 0; i < conditionExpression.elements.length; i++) {
        let expression = new Expression(conditionExpression.elements[i]);

        if (i === conditionExpression.elements.length - 1) {
            array += expression.getExpression();
        } else {
            array += expression.getExpression() + ',';
        }
    }

    return '[' + array + ']';
}

function logicalExpressionTestHandler(conditionExpression) {
    return binaryExpressionHandler(conditionExpression);
}

function yieldExpressionHandler(conditionExpression) {
    let expression = new Expression(conditionExpression.argument);

    return expression.getExpression();
}

export {Expression};
