// calls when any button
// on the calculator is clicked and
// performs appropriate/ intended actions
var posPlus;
var posMinus;
var posMultiply;
var posDivide;
var posExponent;
var posPeriod;
var firstNumber = 0;
var secondNumber = 0;
function writeValues(getValue){
        var valueButtonClicked = getValue.value;
        // gets the object of result text box
        var textBoxObject = document.getElementById('txtResult');
        switch(valueButtonClicked)  {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
            case "00":
               // appends the numbers
               // verifies the length of the input string against the maxlength of the textbox
               if(textBoxObject.value.length < 15){
                    textBoxObject.value = textBoxObject.value + valueButtonClicked;
               }
              break;
            case "+":
            case "-":
            case "*":
            case "/":
            case "^":
            case ".":
               // finds the position of mathematical operators (+,-,/,*)
                posPlus =  textBoxObject.value.indexOf("+");
                posMinus =  textBoxObject.value.indexOf("-");
                posMultiply = textBoxObject.value.indexOf("*");
                posDivide = textBoxObject.value.indexOf("/");
                posExponent = textBoxObject.value.indexOf("^");
                posPeriod = textBoxObject.value.indexOf(".");
                // avoids the two mathematical operators
                if(textBoxObject.value !== "" && posPlus === -1 && (posMinus === -1 || posMinus === 0) && posMultiply === -1 && posDivide === -1
                && posExponent === -1 && posPeriod >= -1){
                    textBoxObject.value = textBoxObject.value + valueButtonClicked;
                }

                // evaluates the previous expression if any new operator is clicked
                if(posPlus > 0 || posMinus > 0 || posMultiply > 0 || posDivide > 0 || posExponent > 0){
                    calculate(valueButtonClicked);
                }
               break;
            case "=":
                calculate('calculate');
                break;
            case "C":
               // clears the result text box
               textBoxObject.value = "";
               break;
            case "B":
              // acts as backspace button
              var stringLength =  textBoxObject.value.length;
              if(stringLength > 0){
                    textBoxObject.value =  textBoxObject.value.substring(0, stringLength-1);
              }
              break;
              case "sqrt":
              // calculates the square root of the number
              if(!isNaN(textBoxObject.value) && textBoxObject.value !== "" && parseFloat(textBoxObject.value) >= 0){
                    textBoxObject.value = Math.sqrt(parseFloat(textBoxObject.value)) ;
              }
              break;
              case "1/x":
              // calculates the reciprocal of the number
              if(!isNaN(textBoxObject.value) && textBoxObject.value !== ""){
                   textBoxObject.value = 1/parseFloat(textBoxObject.value) ;
              }
              break;
              case "log":
              // calculates the log of the number
              if(!isNaN(textBoxObject.value) && textBoxObject.value != "" && parseFloat(textBoxObject.value) >= 0){
                   textBoxObject.value = Math.log(parseFloat(textBoxObject.value)) ;
              }
              break;
        }
}

// evaluates multiple operators
function calculate(operator){
     var textBoxObject = document.getElementById('txtResult');
     var resultLength =  textBoxObject.value.length;
     var finalOperator = '';
     // finds the position of mathematical operators
     posPlus =  textBoxObject.value.indexOf("+");
     posMinus =  textBoxObject.value.indexOf("-");
     posMultiply = textBoxObject.value.indexOf("*");
     posDivide = textBoxObject.value.indexOf("/");
     posExponent = textBoxObject.value.indexOf("^");
     // adds two numbers
     if(posPlus > 0){
        finalOperator = '+';
        // evaluates and output the result
        evaluate(posPlus,finalOperator);
     }
     // subtract the two numbers
     // there can be more than one minus operator
     // the below code handles this situation
     else if(posMinus >=0){
        var removedObj = '';
        // if the expression starts with a negative number and followed by some other operator
        if(posMinus == 0){
            var lastIndexMinus = textBoxObject.value.lastIndexOf("-");
            var lastIndexPlus = textBoxObject.value.lastIndexOf("+");
            var lastIndexDivide = textBoxObject.value.lastIndexOf("/");
            var lastIndexMultiply = textBoxObject.value.lastIndexOf("*");
            var lastIndexExponent = textBoxObject.value.lastIndexOf("^");
            // handles the case of two minus
            if(lastIndexMinus > 0){
                evaluate(lastIndexMinus, "-");
            }
            // handles the case of one minus and one plus
            else if(lastIndexPlus > 0){
                evaluate(lastIndexMinus, "+");
            }
            // handles the case of one minus and one division
            else if(lastIndexDivide > 0){
                evaluate(lastIndexMinus, "/");
            }
            // handles the case of one minus and one multiply
            else if(lastIndexMultiply){
                evaluate(lastIndexMinus, "*");
            }
            // handles the case of one minus and one exponent
            else if(lastIndexExponent){
                evaluate(lastIndexMinus, "^");
            }
        }
        else{
            finalOperator = '-';
            // evaluates and output the result
            evaluate(posMinus,finalOperator);
        }
     }
     // multiplies the two numbers
     else if(posMultiply > 0){
        finalOperator = '*';
        // evaluates and output the result
        evaluate(posMultiply,finalOperator);
     }
      else if(posDivide > 0){
        finalOperator = '/';
        // evaluates and output the result
        evaluate(posDivide,finalOperator);
      }
      // multiplies the two numbers
      else if(posExponent > 0){
         finalOperator = '^';
         // evaluates and output the result
         evaluate(posExponent,finalOperator);
      }
      // appends the operator to the end of evaluated expression
      // also avoids the duplication of the mathematical operators
      if(operator !== 'calculate'){
         var lastOperator = textBoxObject.value.substring(textBoxObject.value.length-1, textBoxObject.value.length);
         if(lastOperator !== "+" && lastOperator !== "-" && lastOperator !== "*" && lastOperator !== "/" && lastOperator !== "^")   {
            if(textBoxObject.value !== 'Infinite'){
                textBoxObject.value = textBoxObject.value + operator;
            }
         }
      }
}
// actually evaluates the expression and output the result
function evaluate(posOperator,operatorType){
     var textBoxObject = document.getElementById('txtResult');
     var resultLength =  textBoxObject.value.length;
     // takes the left part of the string i.e the first number
     firstNumber =  textBoxObject.value.substring(0, posOperator);
     // takes the right part of the string i.e. the second number
     secondNumber = textBoxObject.value.substring(posOperator+1, resultLength);
     // divides the numbers
     if(operatorType === '/'){
          if(parseFloat(secondNumber) > 0){
               if(!isNaN(eval(parseFloat(firstNumber) + operatorType + parseFloat(secondNumber)))){
                   textBoxObject.value = eval(parseFloat(firstNumber) + operatorType + parseFloat(secondNumber));
               }
          }
          // if the denominator is zero, result text box give 'infinite' text
          else{
               textBoxObject.value = "Infinite";
          }
     }
     // evaluates the exponent operator
     else if(operatorType === '^'){
        textBoxObject.value = Math.pow(parseFloat(firstNumber),parseFloat(secondNumber));
     }
     // evaluates the +, - and * operators
     else{
         if(!isNaN(eval(parseFloat(firstNumber) + operatorType +  parseFloat(secondNumber)))){
              textBoxObject.value = eval(parseFloat(firstNumber) + operatorType + parseFloat(secondNumber)) ;
         }
     }
}
