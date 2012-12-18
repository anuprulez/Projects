// creates calculator
function generateCalculator() {
    /*---------------------------------------------Object Oriented Calculator-------------------------------------------------------*/
    // Calculator class
    function calculator(classNamesArray, operatorsArray, numbersArray, divContainer){

        /*------------------------------Private class variables ----------------------*/

        var classNamesArray = classNamesArray;
        var operatorsArray = operatorsArray;
        var numbersArray = numbersArray;
        var divContainer = divContainer;

        /*--------------------------------Public class methods/functions---------------------------------*/

        // creates table data-td for the table
        this.createTableData = function(tdObject, elementType, className, value, title, tableRowObject){
            // creates table data- td for the table
            var inputTag;
            // creates input element
            inputTag = document.createElement('input');
            inputTag.type = 'button';
            inputTag.className = className;
            inputTag.value = value;
            inputTag.setAttribute('onclick', 'getButtonClickedValue(this)');
            // assigns title to operator tds
            title !== "" ? (inputTag.title = title): "";
            // appends input to td
            tdObject.appendChild(inputTag);
            // appends td to table row
            tableRowObject.appendChild(tdObject);
        }
        // creates operator buttons in the calculator
        this.createOperatorButtons = function(start, max, classNames, operatorNames, tableRowObj, tableObj){
                var counter, className, operator, title;
                for (counter = start; counter <= max; counter = counter + 1) {
                    tableData = document.createElement('td');
                    // creates number buttons
                    className = 'clsButton ' + classNames[1];
                    operator = operatorNames[counter];
                    switch (operatorNames[counter]) {
                        case '+':
                            title = 'Add';
                        break;
                        case '^':
                            title = 'Power';
                        break;
                        case '-':
                            title = 'Subtract';
                        break;
                        case '/':
                            title = 'Divide';
                        break;
                        case '.':
                            title = 'Subtract';
                        break;
                        case '=':
                            title = 'Subtract';
                        break;
                        case '*':
                            title = 'Subtract';
                        break;
                        case 'sqrt':
                        case '1/x':
                        case 'log':
                            className = 'clsButton ' + classNames[2];
                            if (operatorNames[counter] === 'sqrt') {
                                operator = 'sqrt';
                                title = 'Square root';
                            }
                            else if (operatorNames[counter] === '1/x') {
                                operator = '1/x';
                                title = 'Reciprocal';
                            }
                            else {
                                operator = 'log';
                                title = 'Log';
                            }
                        break;
                        case 'B':
                            className = 'clsButton ' + classNames[3];
                            operator = 'B';
                            title = 'Backspace';
                        break;
                        case 'C':
                            className = 'clsButton ' + classNames[4];
                            operator = 'C';
                            title = 'Clear';
                        break;
                    }
                    // creates table data- td for the table
                    this.createTableData(tableData, 'button', className, operator, title, tableRowObj);
                    // appends the row to the table object
                    tableObj.appendChild(tableRowObj);
                }
        }
        // creates number buttons in the calculator
        this.createNumberButtons = function(min, max, classNameNumber, tableRowObj, tableObj){
            var counter;
            for (counter = min; counter <= max; counter  = counter + 1) {
                tableData = document.createElement('td');
                // creates number buttons
                this.createTableData(tableData, 'button', classNameNumber, counter, '', tableRowObj);
                // appends the row to the table object
                tableObj.appendChild(tableRowObj);
            }
        }
        // creates table elements
        this.createTableElements = function(){
                var counter, tableData, table, classNameNumber, tableRow, operatorArrayLength, numberArrayLength;
                // creates the table object
                table = document.createElement('table');
                // gets the operator array length
                operatorArrayLength = operatorsArray.length;
                // gets the numbers array length
                numberArrayLength = numbersArray.length;
                // creates first row
                // creates first row of the calculator
                tableRow = document.createElement('tr');
                classNameNumber = 'clsButton ' + classNamesArray[0];
                if(numberArrayLength > 2) {
                    this.createNumberButtons(0, 2, classNameNumber, tableRow, table);
                }
                // creates operators
                if(operatorArrayLength > 2) {
                    this.createOperatorButtons(0, 2, classNamesArray, operatorsArray, tableRow, table);
                }
                // creates second table row
                tableRow = document.createElement('tr');
                if(numberArrayLength > 5){
                    this.createNumberButtons(3, 5, classNameNumber, tableRow, table);
                }
                // creates operators
                if(operatorArrayLength > 5) {
                    this.createOperatorButtons(3, 5, classNamesArray, operatorsArray, tableRow, table);
                }
                // creates third table row
                // creates the numbers
                tableRow = document.createElement('tr');
                if(numberArrayLength > 8){
                    this.createNumberButtons(6, 8, classNameNumber, tableRow, table);
                }
                // creates operators
                if(operatorArrayLength > 8) {
                    this.createOperatorButtons(6, 8, classNamesArray, operatorsArray, tableRow, table);
                }
                // creates fourth table row
                // creates the numbers
                tableRow = document.createElement('tr');
                if(numberArrayLength >= 10){
                    this.createNumberButtons(9, 9, classNameNumber, tableRow, table);
                }
                // creates operators
                if(operatorArrayLength >= 10) {
                    this.createOperatorButtons(9, 11, classNamesArray, operatorsArray, tableRow, table);
                }
                // appends the table to the div object
                divContainer.appendChild(table);
        }
        // this method creates the result textbox and calculator
        this.createCalculator = function(){
              // create result textbox
              txtResult = document.createElement('input');
              txtResult.type = 'text';
              txtResult.maxLength = 15;
              txtResult.id = 'txtResult';
              // disables the keypress events
              txtResult.setAttribute('onkeypress', 'return false;');
              // appends the textbox to the div
              divContainer.appendChild(txtResult);
              this.createTableElements();
        }  // end of createCalculator
    } // end of class

    // data for the calculator
    var opArray = ['+', '^', 'sqrt', '-', 'B', '1/x', '/', '.', 'log', 'C', '=', '*'];
    var numArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    var classArray = ['clsNumber', 'clsOperator', 'clsSingleOp', 'clsBack', 'clsClear'];
    var divContainer = document.getElementById('divCalculator');
    // instantiates the calculator class
    var newCalculator = new calculator(classArray, opArray, numArray, divContainer);
    // calls the function to create calculator
    newCalculator.createCalculator();
} // end of generateCalculator function


///////////////////////////////// End of Calculator generator class ////////////////////////////////////////////////////

//////////////////////////////// Start of Evaluation of expression class ///////////////////////////////////////////////////

// calls when any button
// on the calculator is clicked and
// performs appropriate/ intended actions
function getButtonClickedValue(btnClickValue) {
    // getValue class
    function getValue(txtBoxObj, valueButton, buttonClassName) {
          //----------Private variables ------//

          var valueButtonClicked = valueButton;
          // gets the object of result text box
          var textBoxObject = txtBoxObj;
          // gets the CSS class name of the object/button clicked
          var className = buttonClassName;
          //document.getElementById('txtResult');
          // gets the length of the expression
          var textBoxLength =  textBoxObject.value.length;
          var stringLength = 0;
          var retResult = false;

          //--------------------------Public methods----------------------//

          // Returns the length of the result textbox
          this.getTextboxLength = function() {
                if(textBoxObject.value !== "") {
                    return textBoxObject.value.length;
                }
                else {
                    return 0;
                }
          }
          this.evaluate = function(posOperator, operatorType) {
                // actually evaluates the expression and output the result
                var evaluatedExponentNumber, resultNumber, secondNumber, firstNumber;
                // takes the left part of the string i.e the first number
                firstNumber =  textBoxObject.value.substring(0, posOperator);
                // takes the right part of the string i.e. the second number
                secondNumber = textBoxObject.value.substring(posOperator + 1, this.getTextboxLength());
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
                    textBoxObject.value = resultNumber;
                }
          }
          // checks for the correct position of operators
          //and calls for the evaluation of the expression
          this.verifyExpression = function(operator) {
                // takes the length of the expression to be evaluated
                var resultLength =  textBoxObject.value.length;
                // checks for the correct position of operator and calls for evaluation of the expression
                this.findOperatorPosition(textBoxObject.value, 2);
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
          }
          this.findOperatorPosition = function(expression, caseValue) {
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
                        this.evaluate(posOperator,operator);
                    break;
                }
          }

          // distinguishes the button clicks and verify expression
          this.distinguishButtonClick = function(btnClass) {
                switch (btnClass) {
                  // this case block handles all the number inputs
                  case "clsButton clsNumber":
                      // appends the numbers
                      // verifies the length of the input string against the maxlength of the textbox
                      if(this.getTextboxLength() < 15 && textBoxObject.value !== 'Infinite') {
                          textBoxObject.value = textBoxObject.value + valueButtonClicked;
                      }
                  break;
                  // this case block handles the operator input
                  case "clsButton clsOperator":
                      // if the operator is '=', the evaluate the expression directly
                      if(valueButtonClicked === '=') {
                          // the function takes 'calculate' as parameter to distinguish it from other operator parameters
                          if(textBoxObject.value !== "") {
                              this.verifyExpression('calculate');
                          }
                      }
                      else{
                          // checks if expression is not null or empty
                          if(textBoxObject.value !== "") {
                              retResult = this.findOperatorPosition(textBoxObject.value, 1);
                          }
                          // if true, the operator is appended to the expression
                          if(retResult && textBoxObject.value !== 'Infinite' && textBoxObject.value !== '') {
                              textBoxObject.value = textBoxObject.value + valueButtonClicked;
                          }
                          // if false, expression is evaluated
                          else {
                              if(textBoxObject.value !== '') {
                                  this.verifyExpression(valueButtonClicked);
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
                          if(!isNaN(textBoxObject.value) && textBoxObject.value !== "" && parseFloat(textBoxObject.value) >= 0) {
                              textBoxObject.value = Math.log(parseFloat(textBoxObject.value)) ;
                          }
                      }
                  break;
                }
          }// distinguishButtonClick function ends
    }  // getValue function ends

    // gets the result textbox object
    var txtbxObj = document.getElementById('txtResult');
    if(getValue !== null){
        // instantiates the getValue class
        var getVal = new getValue(txtbxObj, btnClickValue.value, btnClickValue.className);
        // calls distinguishButtonClick method to check and evaluate the expression
        getVal.distinguishButtonClick(btnClickValue.className);
    }
} // getButtonClickedValue function ends











///////////// Calculator code ends /////////////////////////////////////////////////////////////////////////////////
