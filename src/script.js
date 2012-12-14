
// actually evaluates the expression and output the result
function evaluate(posOperator, operatorType) {
     var textBoxObject = document.getElementById('txtResult');
     var resultLength =  textBoxObject.value.length;
     var evaluatedExponentNumber;
     // takes the left part of the string i.e the first number
     var firstNumber =  textBoxObject.value.substring(0, posOperator);
     // takes the right part of the string i.e. the second number
     var secondNumber = textBoxObject.value.substring(posOperator + 1, resultLength);
     // divides the numbers
     if (operatorType === '/') {
          if (parseFloat(secondNumber) > 0){
               if (!isNaN(eval(parseFloat(firstNumber) + operatorType + parseFloat(secondNumber)))) {
                   textBoxObject.value = eval(parseFloat(firstNumber) + operatorType + parseFloat(secondNumber));
               }
          }
          // if the denominator is zero, result text box give 'infinite' text
          else{
               textBoxObject.value = "Infinite";
          }
     }
     // evaluates the exponent operator
     else if (operatorType === '^') {
        // gets the value of the expression using Math.pow
        evaluatedExponentNumber = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber));
        // checks if that is a number
        if (!isNaN(evaluatedExponentNumber)) {
            textBoxObject.value = Math.pow(parseFloat(firstNumber), parseFloat(secondNumber));
        }

     }
     // evaluates the +, - and * operators
     else {
         if (!isNaN(eval(parseFloat(firstNumber) + operatorType +  parseFloat(secondNumber)))) {
              textBoxObject.value = eval(parseFloat(firstNumber) + operatorType + parseFloat(secondNumber));
         }
     }
}

// checks if mathematical operators exist
// it takes two parametes, first being the mathematical operator and second being the caseValue as position of
// operators are needed for different purposes
function findOperatorPosition(expression, caseValue) {
    //alert(expression);
    //var operatorRegex = "/[+-*\/.]/";
    //var result = operatorRegex.test(expression);
    //alert('')
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
         // evaluates and output the result
         evaluate(posPlus,'+');
      }
      // subtract the two numbers
      // there can be more than one minus operator( a negative number with another operator with a number)
      // the below code handles this situation
      else if (posMinus >=0) {
         // if the expression starts with a negative number and followed by some other operator
         if(posMinus == 0) {
             // handles the case of two minus
             if (lastIndexMinus > 0) {
                 evaluate(lastIndexMinus, "-");
             }
             // handles the case of one minus and one plus
             else if (posPlus > 0) {
                 evaluate(posPlus, "+");
             }
             // handles the case of one minus and one division
             else if (posDivide > 0) {
                 evaluate(posDivide, "/");
             }
             // handles the case of one minus and one multiply
             else if (posMultiply > 0) {
                 evaluate(posMultiply, "*");
             }
             // handles the case of one minus and one exponent
             else if (posExponent) {
                 evaluate(posExponent, "^");
             }
         }
         else {
             // evaluates and output the result
             evaluate(posMinus,'-');
         }
      }
      // multiplies the two numbers
      else if (posMultiply > 0) {
         // evaluates and output the result
         evaluate(posMultiply,'*');
      }
      else if (posDivide > 0) {
         // evaluates and output the result
         evaluate(posDivide,'/');
       }
       // multiplies the two numbers
      else if (posExponent > 0) {
          // evaluates and output the result
          evaluate(posExponent,'^');
       }
        break;
    }
}



// checks for the correct position of operators
//and calls for the evaluation of the expression
function verifyExpression(operator) {
      var textBoxObject = document.getElementById('txtResult');
      // takes the length of the expression to be evaluated
      var resultLength =  textBoxObject.value.length;
      // checks for the correct position of operator and calls for evaluation of the expression
      findOperatorPosition(textBoxObject.value, 2);
      // appends the operator to the end of evaluated expression
      // also avoids the duplication of the mathematical operators
      if(operator !== 'calculate' && resultLength > 0) {
         // gets the last item in the expression
         lastOperator = textBoxObject.value.substring(textBoxObject.value.length - 1, textBoxObject.value.length);
         // checks for the duplication of operators
         if(lastOperator !== "+" && lastOperator !== "-" && lastOperator !== "*" && lastOperator !== "/" && lastOperator !== "^") {
            if(textBoxObject.value !== 'Infinite') {
                textBoxObject.value = textBoxObject.value + operator;
            }
         }
      }
}

// calls when any button
// on the calculator is clicked and
// performs appropriate/ intended actions
function writeValues(getValue) {
        var valueButtonClicked = getValue.value;
        // gets the object of result text box
        var textBoxObject = document.getElementById('txtResult');
        // gets the CSS class name of the object/button clicked
        var className = getValue.className;
        var stringLength = 0;
        var retResult = false;
        switch (className) {
            // this case block handles all the number inputs
            case "clsButton clsNumber":
               // appends the numbers
               // verifies the length of the input string against the maxlength of the textbox
               if(textBoxObject.value.length < 15 && textBoxObject.value !== 'Infinite') {
                    textBoxObject.value = textBoxObject.value + valueButtonClicked;
               }
              break;
            // this case block handles the operator input
            case "clsButton clsOperator":
                // if the operator is '=', the evaluate the expression directly
                if(valueButtonClicked === '=') {
                    // the function takes 'calculate' as parameter to distinguish it from other operator parameters
                    verifyExpression('calculate');
                }
                else{
                    // checks if expression is not null or empty
                    if(textBoxObject.value !== "") {
                        retResult = findOperatorPosition(textBoxObject.value, 1);
                    }
                    // if true, the operator is appended to the expression
                    if(retResult && textBoxObject.value !== 'Infinite') {
                        textBoxObject.value = textBoxObject.value + valueButtonClicked;
                    }
                    // if false, expression is evaluated
                    else{
                        verifyExpression(valueButtonClicked);
                    }
                }
               break;
            case "clsButton clsClear":
               // clears the result text box
               textBoxObject.value = "";
               break;
            case "clsButton clsBack":
              // acts as backspace button
              stringLength = textBoxObject.value.length;
              if(stringLength > 0) {
                    textBoxObject.value = textBoxObject.value.substring(0, stringLength - 1);
              }
              break;
              // this case checks for operators- square root, reciprocal and log
              case "clsButton clsSingleOp":
                  if(valueButtonClicked === 'sqrt') {
                      // calculates the square root of the number
                      if (!isNaN(textBoxObject.value) && textBoxObject.value !== "" && parseFloat(textBoxObject.value) >= 0) {
                            textBoxObject.value = Math.sqrt(parseFloat(textBoxObject.value)) ;
                      }
                  }
                  else if (valueButtonClicked === '1/x') {
                     // calculates the reciprocal of the number
                      if (!isNaN(textBoxObject.value) && textBoxObject.value !== "") {
                            textBoxObject.value = 1 / parseFloat(textBoxObject.value) ;
                      }
                  }
                  else {
                     // calculates the log of the number
                     if(!isNaN(textBoxObject.value) && textBoxObject.value != "" && parseFloat(textBoxObject.value) >= 0) {
                            textBoxObject.value = Math.log(parseFloat(textBoxObject.value)) ;
                      }
                  }
              break;
        }
}





///////////// Calculator code ends /////////////////////////////////////////////////////////////////////////////////
