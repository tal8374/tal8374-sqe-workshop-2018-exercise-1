import assert from 'assert';
import {parseCode} from '../src/js/code-analyzer';
import {IfExpression} from '../src/js/if-expression-handler';

describe('The if statement handler', () => {

    it('should parse the if statement', () => {
        var parsedCode = parseCode('if(statement){let a}else if(statement){let a}else{let a}');
        var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
        var result = ifExpression.init();

        assert.equal(
            result,
            "Initialization done"
        );

        var parsedCode = parseCode('if(statement < statement2){let a}else if(statement < statement2){let a}else{let a}');
        var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
        var result = ifExpression.init();

        assert.equal(
            result,
            "Initialization done"
        );

        var parsedCode = {
            "type": "Program",
            "body": [
                {
                    "type": "IfStatement",
                    "test": {
                        "type": "Identifier",
                        "name": "statement"
                    },
                    "consequent": {
                        "type": "BlockStatement2",
                        "body": []
                    },
                    "alternate": null
                }
            ],
            "sourceType": "script"
        }
        var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
        var result = ifExpression.init();

        assert.equal(
            result,
            "Initialization done"
        );

    });

    describe('The if statement handler line number behaviour', () => {

        it('should get the current line number', () => {
            var parsedCode = parseCode('if(statement){}');
            var ifExpression = new IfExpression(parsedCode.body[0], null, 1);

            assert.equal(
                ifExpression.getLineNumber(),
                1
            );
        });

        it('should get the increased line number by 1', () => {
            var parsedCode = parseCode('if(statement){}');
            var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
            ifExpression.increaseLineNumber();

            assert.equal(
                ifExpression.lineNumber,
                2
            );
        });

    });

    describe('The if statement handler payload', () => {

        describe('The if statement handler condition  payload ', () => {

            it('should get the payload with empty body and variable as a condition', () => {
                var parsedCode = parseCode('if(statement){}');
                var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                var payload = ifExpression.getPayload();

                assert.equal(
                    JSON.stringify(payload),
                    JSON.stringify({
                        lineNumber: 1,
                        type: 'if statement',
                        name: null,
                        value: null,
                        condition: 'statement',
                    })
                );
            });

            it('should get the payload with empty body and variable as a condition', () => {
                var parsedCode = parseCode('if(statement){}');
                var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                var payload = ifExpression.getPayload();

                assert.equal(
                    JSON.stringify(payload),
                    JSON.stringify({
                        lineNumber: 1,
                        type: 'if statement',
                        name: null,
                        value: null,
                        condition: 'statement',
                    })
                );
            });

            it('should get the payload with empty body and two variable with < sign as a condition', () => {
                var parsedCode = parseCode('if(statement1 < statement1){}');
                var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                var payload = ifExpression.getPayload();

                assert.equal(
                    JSON.stringify(payload),
                    JSON.stringify({
                        lineNumber: 1,
                        type: 'if statement',
                        name: null,
                        value: null,
                        condition: 'statement1<statement1',
                    })
                );
            });

            it('should get the payload with empty body and using array (arr[i]) as a condition', () => {
                var parsedCode = parseCode('if(arr[i]){}');
                var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                var payload = ifExpression.getPayload();

                assert.equal(
                    JSON.stringify(payload),
                    JSON.stringify({
                        lineNumber: 1,
                        type: 'if statement',
                        name: null,
                        value: null,
                        condition: 'arr[i]',
                    })
                );
            });

            describe('The if statement handler body condition  payload ', () => {

                it('should not handle ExpressionStatement', () => {
                    var parsedCode = {
                        "type": "Program",
                        "body": [
                            {
                                "type": "ExpressionStatement",
                                "test": {
                                    "type": "Identifier",
                                    "name": "statement"
                                },
                                "consequent": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "alternate": null
                            }
                        ],
                        "sourceType": "script"
                    };
                    var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                    var result = ifExpression.handleIfDeclaration();

                    assert.equal(
                        result,
                        "Shouldn't be handled"
                    );
                });

                it('should not handle ReturnStatement', () => {
                    var parsedCode = {
                        "type": "Program",
                        "body": [
                            {
                                "type": "ReturnStatement",
                                "test": {
                                    "type": "Identifier",
                                    "name": "statement"
                                },
                                "consequent": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "alternate": null
                            }
                        ],
                        "sourceType": "script"
                    };
                    var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                    var result = ifExpression.handleIfDeclaration();

                    assert.equal(
                        result,
                        "Shouldn't be handled"
                    );
                });

                it('should handle IfStatement successfully', () => {
                    var parsedCode = {
                        "type": "Program",
                        "body": [
                            {
                                "type": "IfStatement",
                                "test": {
                                    "type": "Identifier",
                                    "name": "statement"
                                },
                                "consequent": {
                                    "type": "BlockStatement",
                                    "body": []
                                },
                                "alternate": null
                            }
                        ],
                        "sourceType": "script"
                    };
                    var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                    var result = ifExpression.handleIfDeclaration();

                    assert.equal(
                        result,
                        "Done inserting the payload to the table"
                    );
                });

            });

            describe('The if statement alternative', () => {

                it('should not handle the alternative', () => {
                    var parsedCode = parseCode('if(arr[i]){}');
                    var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                    var result = ifExpression.handleAlternative();

                    assert.equal(
                        result,
                        "Alternative does not exists"
                    );
                });

                it('should  handle the alternative', () => {
                    var parsedCode = parseCode('if(arr[i]){}else{}');
                    var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                    var result = ifExpression.handleAlternative();

                    assert.equal(
                        result,
                        "Done handling the alternative"
                    );
                });

                it('should  handle the alternative', () => {
                    var parsedCode = parseCode('if(arr[i]){}else if(statement2){}');
                    var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                    var result = ifExpression.handleAlternative();

                    assert.equal(
                        result,
                        "Done handling the alternative"
                    );
                });

            });

            describe('The if statement body', () => {

                it('should  handle the body', () => {
                    var parsedCode = parseCode('if(statement){let a}');
                    var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                    var result = ifExpression.handleIfBody();

                    assert.equal(
                        result,
                        "Body statement is handled"
                    );
                });

                it('should  should handle the body of else if statement', () => {
                    var parsedCode = parseCode('if(statement){}else if(statement){let a}');
                    var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                    var result = ifExpression.handleIfBody();

                    assert.equal(
                        result,
                        "Body statement is handled"
                    );
                });

                it('should  sould handle the body of else statement', () => {
                    var parsedCode = parseCode('if(statement){}else{let a}');
                    var ifExpression = new IfExpression(parsedCode.body[0], null, 1);
                    var result = ifExpression.handleIfBody();

                    assert.equal(
                        result,
                        "Body statement is handled"
                    );
                })

            });
        });

    });

});
