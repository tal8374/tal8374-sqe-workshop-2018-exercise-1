function ValueExpression(valueExpression) {
    this.valueExpression = valueExpression;
}

ValueExpression.prototype.getValue = function () {
    let valueExpressionObj;

    if (!this.valueExpression) {
        return null;
    }
    else if (this.valueExpression.computed) {
        valueExpressionObj = new ValueExpression(this.valueExpression.property);

        return this.valueExpression.object.name + '[' + valueExpressionObj.getValue() + ']';
    } else if (this.valueExpression.operator) {
        return this.handleOperatorValue();
    } else {
        return this.valueExpression.name ? this.valueExpression.name : this.valueExpression.value;
    }
};

ValueExpression.prototype.handleOperatorValue = function () {
    let valueExpressionObj = new ValueExpression(this.valueExpression.left);
    let rightValue = this.valueExpression.right.name ?
        this.valueExpression.right.name : this.valueExpression.right.value;

    if (this.valueExpression.operator === '/') {
        return '(' + valueExpressionObj.getValue() + ')' + this.valueExpression.operator + rightValue;
    } else {
        return valueExpressionObj.getValue() + this.valueExpression.operator + rightValue;
    }
};


export {ValueExpression};
