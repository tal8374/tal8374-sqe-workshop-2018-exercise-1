function Condition(conditionExpression) {
    this.conditionExpression = conditionExpression;
}

Condition.prototype.getConditionExpression = function () {
    if (this.conditionExpression.object) {
        var objectExpression = new ObjectExpression(this.conditionExpression);

        return objectExpression.getObjectCondition();
    }
    else if (this.conditionExpression.name) {
        return this.conditionExpression.name;
    } else {
        var left = this.getLeftCondition();
        var condition = this.getCondition();
        var right = this.getRightCondition();

        return left + condition + right;
    }
};

Condition.prototype.getLeftCondition = function () {
    if (this.conditionExpression.left.object) {
        var objectExpression = new ObjectExpression(this.conditionExpression.left);

        return objectExpression.getObjectCondition();
    }
    else if (this.conditionExpression.left.operator) {
        var condition = new Condition(this.conditionExpression.left);

        return condition.getConditionExpression();
    } else {
        return this.conditionExpression.left.name ? this.conditionExpression.left.name : this.conditionExpression.left.value;
    }
};

Condition.prototype.getCondition = function () {
    return this.conditionExpression.operator;
};

Condition.prototype.getRightCondition = function () {
    if (this.conditionExpression.right.object) {
        var objectExpression = new ObjectExpression(this.conditionExpression.right);

        return objectExpression.getObjectCondition();
    }
    else {
        return this.conditionExpression.right.name ? this.conditionExpression.right.name : this.conditionExpression.right.value;
    }
};

function ObjectExpression(objectExpression) {
    this.objectExpression = objectExpression;
}

ObjectExpression.prototype.getObjectCondition = function () {
    var currentObjectExpression = new ObjectExpression(this.objectExpression.property);

    if (!this.objectExpression.object) {
        return this.objectExpression.name;
    }

    return this.objectExpression.object.name + '[' + currentObjectExpression.getObjectCondition() + ']';
};


export {Condition};