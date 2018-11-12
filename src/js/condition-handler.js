function Condition(statement) {
    this.statement = statement;
}

Condition.prototype.getConditionExpression = function () {
    if (this.statement.object) {
        var memberExpression = new MemberExpression(this.statement);

        return memberExpression.getObjectCondition();
    }
    else if (this.statement.name) {
        return this.statement.name;
    } else {
        var left = this.getLeftCondition();
        var condition = this.getCondition();
        var right = this.getRightCondition();

        return left + condition + right;
    }
};

Condition.prototype.getLeftCondition = function () {
    if (this.statement.left.object) {
        var memberExpression = new MemberExpression(this.statement.left);

        return memberExpression.getObjectCondition();
    }
    else if (this.statement.left.operator) {
        var condition = new Condition(this.statement.left);

        return condition.getConditionExpression();
    } else {
        return this.statement.left.name ? this.statement.left.name : this.statement.left.value;
    }
};

Condition.prototype.getCondition = function () {
    return this.statement.operator;
};

Condition.prototype.getRightCondition = function () {
    if (this.statement.right.object) {
        var memberExpression = new MemberExpression(this.statement.right);

        return memberExpression.getObjectCondition();
    }
    else {
        return this.statement.right.name ? this.statement.right.name : this.statement.right.value;
    }
};

function MemberExpression(statement) {
    this.statement = statement;
}

MemberExpression.prototype.getObjectCondition = function () {
    var memberExpression = new MemberExpression(this.statement.property);

    if (!this.statement.object) {
        return this.statement.name;
    }

    return this.statement.object.name + '[' + memberExpression.getObjectCondition() + ']';
};


export {Condition};