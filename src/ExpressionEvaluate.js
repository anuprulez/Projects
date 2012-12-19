    // ExpressionEvaluate class
    function ExpressionEvaluate(txtBoxObj, valueButton, buttonClassName) {
          //----------Private variables ------//
          var valueButtonClicked = valueButton;  // value of the button clicked
          var textBoxObject = txtBoxObj;   // gets the object of result text box
          var className = buttonClassName;  // gets the CSS class name of the object/button clicked
          var stringLength = 0;   //
          var retResult = false;

          //--------------------------Private methods----------------------//

          // Returns the length of the result textbox
           function getTextboxLength() {
                if(textBoxObject.value !== "") {
                    return textBoxObject.value.length;
                }
                else {
                    return 0;
                }
          }


          // Evaluates the expression
          function evaluate(posOperator, operatorType, callback) {
                // actually evaluates the expression and output the result
                var evaluatedExponentNumber, resultNumber, secondNumber, firstNumber;
                // takes the left part of the string i.e the first number
                firstNumber =  textBoxObject.value.substring(0, posOperator);
                // takes the right part of the string i.e. the second number
                secondNumber = textBoxObject.value.substring(posOperator + 1, getTextboxLength());
                if(!isNaN(firstNumber) && secondNumber !== '') {
                    // checks for the operator and performs appropriate actions
                    switch(operatorType) {
                        case '/':
                            if (parseFloat(secondNumber) >= 0 || parseFloat(secondNumber) < 0) {
                                if (!isNaN(parseFloat(firstNumber) / parseFloat(secondNumber))) {
                                    resultNumber = parseFloat(firstNumber) / parseFloat(secondNumber);
                                }
                            }
                            else {
                                resultNumber = 'Infinite';
                            }
                        break;
                        case '^':
                            // gets the value of the expression using Math.pow
                            evaluatedExponentNumber = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber));
                            // checks if that is a number
                            if (!isNaN(evaluatedExponentNumber)) {
                                resultNumber = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber));
                            }
                        break;
                        case '+':
                            // checks if that is a number
                            if (!isNaN(parseFloat(firstNumber) + parseFloat(secondNumber))) {
                                resultNumber = parseFloat(firstNumber) + parseFloat(secondNumber);
                            }
                        break;
                        case '-':
                            // checks if that is a number
                            if (!isNaN(parseFloat(firstNumber) - parseFloat(secondNumber))) {
                                resultNumber = parseFloat(firstNumber) - parseFloat(secondNumber);
                            }
                        break;
                        case '*':
                            // checks if that is a number
                            if (!isNaN(parseFloat(firstNumber) * parseFloat(secondNumber))) {
                                resultNumber = parseFloat(firstNumber) * parseFloat(secondNumber);
                            }
                        break;
                    }
                    // sets the result to textbox
                    textBoxObject.value = resultNumber;
                    callback(resultNumber);
                }
          }


          // checks for the correct position of operators
          //and calls for the evaluation of the expression
           function verifyExpression(operator, callback) {
                // takes the length of the expression to be evaluated
                var resultLength = getTextboxLength();
                // checks for the correct position of operator and calls for evaluation of the expression
                findOperatorPosition(textBoxObject.value, 2, function() {
                    console.log('function findOperatorPosition() executed successfully');
                });
                // appends the operator to the end of evaluated expression
                // also avoids the duplication of the mathematical operators
                if(operator !== 'calculate' && resultLength > 0) {
                    // gets the last item in the expression
                    lastOperator = textBoxObject.value.substring(resultLength - 1, resultLength);
                    // checks for the duplication of operators
                    if(lastOperator !== "+" && lastOperator !== "-" && lastOperator !== "*" && lastOperator !== "/" && lastOperator !== "^") {
                        if(textBoxObject.value !== 'Infinite') {
                            textBoxObject.value = textBoxObject.value + operator;
                        }
                    }
                }
                callback();
          }


          // finds the operators' positions and calls to evaluate expression
          function findOperatorPosition(expression, caseValue, callback) {
            // checks if mathematical operators exist
            // it takes two parameters, first being the mathematical operator and second being the caseValue as position of
            // operators are needed for different purposes
                var operator, posOperator;
                var result = false;
                var posPlus =  expression.indexOf("+");
                var posMinus =  expression.indexOf("-");
                var posMultiply = expression.indexOf("*");
                var posDivide = expression.indexOf("/");
                var posExponent = expression.indexOf("^");
                var posPeriod = expression.indexOf(".");
                var lastIndexMinus = expression.lastIndexOf("-");
                // the caseValue takes two values 1 and 2 for distinguishing the use of position of
                // parameters in identifying no operators and evaluation an expression
                switch (caseValue) {
                    // checks if no operators are there in the expression
                    case 1:
                        // returns true if operator does not exist in the expression
                        // else false
                        if (posPlus === -1 && posMinus === -1 && posMultiply === -1 && posDivide === -1 && posExponent === -1 && posPeriod >= -1) {
                            return !result;
                        }
                        else {
                            return result;
                        }
                    break;
                    // calls for evaluation of the expression
                    case 2:
                        // adds two numbers
                        if(posPlus > 0) {
                            operator = '+';
                            posOperator =  posPlus;
                        }
                        // subtract the two numbers
                        // there can be more than one minus operator( a negative number with another operator with a number)
                        // the below code handles this situation
                        else if (posMinus >=0) {
                            // if the expression starts with a negative number and followed by some other operator
                            if(posMinus === 0) {
                                // handles the case of two minus
                                if (lastIndexMinus > 0) {
                                    operator = '-';
                                    posOperator =  lastIndexMinus;
                                }
                                // handles the case of one minus and one plus
                                else if (posPlus > 0) {
                                    operator = '+';
                                    posOperator =  posPlus;
                                }
                                // handles the case of one minus and one division
                                else if (posDivide > 0) {
                                    operator = '/';
                                    posOperator =  posDivide;
                                }
                                // handles the case of one minus and one multiply
                                else if (posMultiply > 0) {
                                    operator = '*';
                                    posOperator =  posMultiply;
                                }
                                else if (posExponent > 0) {
                                    operator = '^';
                                    posOperator =  posExponent;
                                }
                            }
                            else {
                                operator = '-';
                                posOperator =  posMinus;
                            }
                        }
                        // multiplies the two numbers
                        else if (posMultiply > 0) {
                            operator = '*';
                            posOperator =  posMultiply;
                        }
                        else if (posDivide > 0) {
                            operator = '/';
                            posOperator =  posDivide;
                        }
                        // multiplies the two numbers
                        else if (posExponent > 0) {
                            operator = '^';
                            posOperator =  posExponent;
                        }
                        // evaluates and output the result
                        evaluate(posOperator,operator, function(number) {
                            console.log('Expression evaluated successfully. Result is : ' + number);
                        });
                    break;
                }
                callback();
          }


          //----------------------------- Public methods --------------------------------------------------//
          // distinguishes the button clicks and verify expression
          this.distinguishButtonClick = function(btnClass, callback) {
                var singleOpResult;
                switch (btnClass) {
                  // this case block handles all the number inputs
                  case "clsButton clsNumber":
                      // appends the numbers
                      // verifies the length of the input string against the maxlength of the textbox
                      if(getTextboxLength() < 15 && textBoxObject.value !== 'Infinite') {
                          textBoxObject.value = textBoxObject.value + valueButtonClicked;
                      }
                  break;
                  // this case block handles the operator input
                  case "clsButton clsOperator":
                      // if the operator is '=', the evaluate the expression directly
                      if(valueButtonClicked === '=') {
                          // the function takes 'calculate' as parameter to distinguish it from other operator parameters
                          if(textBoxObject.value !== "") {
                              verifyExpression('calculate', function() {
                                  console.log('function verifyExpression() executed successfully');
                              });
                          }
                      }
                      else{
                          // checks if expression is not null or empty
                          if(textBoxObject.value !== "") {
                              retResult = findOperatorPosition(textBoxObject.value, 1, function() {
                                 console.log('function findOperatorPosition() executed successfully');
                              });
                          }
                          // if true, the operator is appended to the expression
                          if(retResult && textBoxObject.value !== 'Infinite' && textBoxObject.value !== '') {
                              textBoxObject.value = textBoxObject.value + valueButtonClicked;
                          }
                          // if false, expression is evaluated
                          else {
                              if(textBoxObject.value !== '') {
                                  verifyExpression(valueButtonClicked, function() {
                                     console.log('function verifyExpression() executed successfully');
                                  });
                              }
                          }
                      }
                  break;
                  case "clsButton clsClear":
                      // clears the result text box
                      textBoxObject.value = "";
                  break;
                  case "clsButton clsBack":
                      // acts as backspace button
                      if(getTextboxLength() > 0) {
                          textBoxObject.value = textBoxObject.value.substring(0, getTextboxLength() - 1);
                      }
                  break;
                  // this case checks for operators- square root, reciprocal and log
                  case "clsButton clsSingleOp":
                      if(valueButtonClicked === 'sqrt') {
                          // calculates the square root of the number
                          if (!isNaN(textBoxObject.value) && textBoxObject.value !== "" && parseFloat(textBoxObject.value) >= 0) {
                              textBoxObject.value = Math.sqrt(parseFloat(textBoxObject.value));
                          }
                      }
                      else if (valueButtonClicked === '1/x') {
                          // calculates the reciprocal of the number
                          if (!isNaN(textBoxObject.value) && textBoxObject.value !== "") {
                              textBoxObject.value = 1 / parseFloat(textBoxObject.value);
                          }
                      }
                      else {
                          // calculates the log of the number
                          if(!isNaN(textBoxObject.value) && textBoxObject.value !== "" && parseFloat(textBoxObject.value) >= 0) {
                              textBoxObject.value = Math.log(parseFloat(textBoxObject.value));
                          }
                      }
                      singleOpResult = textBoxObject.value;
                  break;
                }
                if(singleOpResult !== undefined){
                    callback(valueButtonClicked + ' and result is: ' + singleOpResult);
                }
                else {
                   callback(valueButtonClicked);
                }

          }// distinguishButtonClick function ends
    }  // getValue function ends
