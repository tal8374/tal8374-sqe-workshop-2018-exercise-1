function ValueExpression(valueExpression) {
    this.valueExpression = valueExpression;
}

ValueExpression.prototype.getValue = function () {
    if(!this.valueExpression) {
        return null;
    }
    else if (this.valueExpression.computed) {
        var valueExpressionObj = new ValueExpression(this.valueExpression.property);

        return this.valueExpression.object.name + '[' + valueExpressionObj.getValue() + ']';
    } else if (this.valueExpression.operator) {
        var valueExpressionObj = new ValueExpression(this.valueExpression.left);

        return valueExpressionObj.getValue() + this.valueExpression.operator + this.valueExpression.right.name;
    } else {
        return this.valueExpression.name ? this.valueExpression.name : this.valueExpression.value;
    }
};

export {ValueExpression};
