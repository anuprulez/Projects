// creates calculator
function generateCalculator() {
    'use strict';
    var classNamesArray, operatorsArray, divContainer, txtResult;
    classNamesArray = ['clsNumber', 'clsOperator', 'clsSingleOp', 'clsBack', 'clsClear'];
    operatorsArray = ['+', '^', 'sqrt', '-', 'B', '1/x', '/', '.', 'log', 'C', '=', '*'];
    divContainer = document.getElementById('divCalculator');
    // creates result textbox
    txtResult = document.createElement('input');
    txtResult.type = 'text';
    txtResult.maxLength = 15;
    txtResult.id = 'txtResult';
    // appends the textbox to the div
    divContainer.appendChild(txtResult);
    // creates buttons in the calculator
    createTableElements('0-9', classNamesArray, operatorsArray, divContainer);
}
// create elements in the calculator
function createTableElements(numberRange, classNamesArray, operatorsArray, divContainer) {
    var counter, tableData, min, max, rangeSplit, table, classNameNumber, start, end, firstTableRow, secondTableRow, thirdTableRow, fourthTableRow;
    // creates the table object
    table = document.createElement('table');
    // creates first row of the calculator
    firstTableRow = document.createElement('tr');
    // splits the number range
    rangeSplit = numberRange.split('-');
    min = rangeSplit[0];
    max = rangeSplit[1];
    // creates first row
    // creates the numbers
    classNameNumber = 'clsButton ' + classNamesArray[0];
    createNumberButtons(max - 2, max, classNameNumber, firstTableRow);
    // creates buttons of operators for the first row
        // creates operators
    start = 0;
    end = 2;
    createOperatorButtons(start, end, classNamesArray, operatorsArray, firstTableRow, table);

    // creates second table row
    // creates the numbers
    secondTableRow = document.createElement('tr');
    createNumberButtons(max - 5, max - 3, classNameNumber, secondTableRow);
    start = 3;
    end = 5;
    // creates operators
    createOperatorButtons(start, end, classNamesArray, operatorsArray, secondTableRow, table);

    // creates third table row
    // creates the numbers
    thirdTableRow = document.createElement('tr');
    createNumberButtons(max - 8, max - 6, classNameNumber, thirdTableRow);
    start = 6;
    end = 8;
    // creates operators
    createOperatorButtons(start, end, classNamesArray, operatorsArray, thirdTableRow, table);

    // creates fourth table row
    // creates the numbers
    fourthTableRow = document.createElement('tr');
    createNumberButtons(max - 9, max - 9, classNameNumber, fourthTableRow);
    start = 9;
    end = 11;
    // creates operators
    createOperatorButtons(start, end, classNamesArray, operatorsArray, fourthTableRow, table);
    // appends the table to the div object
    divContainer.appendChild(table);
}
// creates number buttons
function createNumberButtons(min, max, classNameNumber, tableRowObj) {
    var counter;
    for (counter = min; counter <= max; counter  = counter + 1) {
        tableData = document.createElement('td');
        // creates number buttons
        createTableData(tableData, 'button', classNameNumber, counter, '', tableRowObj);
    }
}

// creates operator buttons
function createOperatorButtons(start, max, classNames, operatorNames, tableRowObj, tableObj) {
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
        createTableData(tableData, 'button', className, operator, title, tableRowObj);
        // appends the row to the table object
        tableObj.appendChild(tableRowObj);
    }
}

// creates table data- td for the table
function createTableData(tdObject, elementType, className, value, title, tableRowObject) {
    var inputTag;
    // creates input element
    inputTag = document.createElement('input');
    inputTag.type = 'button';
    inputTag.className = className;
    inputTag.value = value;
    inputTag.setAttribute('onclick', 'writeValues(this)');
    if(title !== "") {
        inputTag.title = title;
    }
    // appends input to td
    tdObject.appendChild(inputTag);
    // appends td to table row
    tableRowObject.appendChild(tdObject);
}


// actually evaluates the expression and output the result
function evaluate(posOperator, operatorType) {
    var textBoxObject = document.getElementById('txtResult');
    var resultLength =  textBoxObject.value.length;
    var evaluatedExponentNumber;
    var resultNumber, secondNumber, firstNumber;
    // takes the left part of the string i.e the first number
    firstNumber =  textBoxObject.value.substring(0, posOperator);
    // takes the right part of the string i.e. the second number
    secondNumber = textBoxObject.value.substring(posOperator + 1, resultLength);;
    if(!isNaN(firstNumber) && secondNumber !== ''){
        // checks for the operator and performs appropriate actions
        switch(operatorType) {
            case '/':
                if (parseFloat(secondNumber) > 0) {
                    if (!isNaN(parseFloat(firstNumber) / parseFloat(secondNumber))) {
                        resultNumber = parseFloat(firstNumber) / parseFloat(secondNumber);
                    }
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

// checks if mathematical operators exist
// it takes two parameters, first being the mathematical operator and second being the caseValue as position of
// operators are needed for different purposes
function findOperatorPosition(expression, caseValue) {
    //alert(expression);
    //var operatorRegex = "/[+-*\/.]/";
    //var result = operatorRegex.test(expression);
    //alert('')
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
                if(posMinus == 0) {
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
            evaluate(posOperator,operator);
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
                if(textBoxObject.value !== "") {
                    verifyExpression('calculate');
                }
            }
            else{
                // checks if expression is not null or empty
                if(textBoxObject.value !== "") {
                    retResult = findOperatorPosition(textBoxObject.value, 1);
                }
                // if true, the operator is appended to the expression
                if(retResult && textBoxObject.value !== 'Infinite' && textBoxObject.value !== '') {
                    textBoxObject.value = textBoxObject.value + valueButtonClicked;
                }
                // if false, expression is evaluated
                else {
                    if(textBoxObject.value !== '')  {
                        verifyExpression(valueButtonClicked);
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
}

///////////// Calculator code ends /////////////////////////////////////////////////////////////////////////////////
