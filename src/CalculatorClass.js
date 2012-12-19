    // Calculator class
    function Calculator(container) {
        /*------------------------------Private variables ----------------------*/
        var classNames = ['clsNumber', 'clsOperator', 'clsSingleOp', 'clsBack', 'clsClear']; // set of class names
        var operators = ['+', '^', 'sqrt', '-', 'B', '1/x', '/', '.', 'log', 'C', '=', '*']; // set of operators
        var numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];       // set of numbers
        var container = container;       // html div object

        /*--------------------------------Private methods/functions---------------------------------*/
        // creates table data-td for the table
        function createTableData(tdObject, elementType, className, value, title, tableRowObject, callback) {
            // creates table data- td for the table
            var inputTag;
            // creates input element
            inputTag = document.createElement('input');
            inputTag.type = 'button';
            inputTag.className = className;
            inputTag.value = value;
            inputTag.setAttribute('onclick', 'getButtonClickedValue(this)');
            // assigns title to operator tds
            title !== "" ? (inputTag.title = title) : "";
            // appends input to td
            tdObject.appendChild(inputTag);
            // appends td to table row
            tableRowObject.appendChild(tdObject);
            callback();
        }


        // creates operator buttons in the calculator
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
                            title = 'Decimal';
                        break;
                        case '=':
                            title = 'Equals';
                        break;
                        case '*':
                            title = 'Multiply';
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
                    createTableData(tableData, 'button', className, operator, title, tableRowObj, function() {
                        console.log('function createTableData() executed successfully');
                    });
                    // appends the row to the table object
                    tableObj.appendChild(tableRowObj);
                }
        }


        // creates number buttons in the calculator
        function createNumberButtons(min, max, classNameNumber, tableRowObj, tableObj) {
            var counter;
            for (counter = min; counter <= max; counter  = counter + 1) {
                tableData = document.createElement('td');
                // creates number buttons
                createTableData(tableData, 'button', classNameNumber, counter, '', tableRowObj, function() {
                    console.log('function createTableData() executed successfully');
                });
                // appends the row to the table object
                tableObj.appendChild(tableRowObj);
            }
        }


        // creates table elements
        function createTableElements(callback) {
                var counter, table, classNameNumber, tableRow, operatorLength, numberLength, numberOfRows, quotient, remainder, rowCreated;
                // creates the table object
                table = document.createElement('table');
                // gets the operator array length
                operatorLength = operators.length;
                // gets the numbers array length
                numberLength = numbers.length;
                // finds the number of rows the calculator will have
                quotient = parseInt((operatorLength + numberLength) / 6);
                remainder = (operatorLength + numberLength)%6;
                // calculates the number of rows to be created
                if(quotient > 0) {
                     remainder > 0 ? (numberOfRows = quotient + 1) : (numberOfRows = quotient);

                }
                classNameNumber = 'clsButton ' + classNames[0];
                rowCreated = 0;
                if(numberOfRows > 0){
                     // creates rows dynamically with given numbers and operators
                     for(counter = 1; counter <= numberOfRows; counter = counter + 1) {
                         tableRow = document.createElement('tr');
                         if(numberLength > 3*counter) {
                            if (counter === 1) {
                                createNumberButtons(0, 2, classNameNumber, tableRow, table);
                                rowCreated = 2;
                            }
                            else if (counter === 2) {
                                createNumberButtons(3, 5, classNameNumber, tableRow, table);
                                rowCreated = 5;
                            }
                            else if (counter === 3) {
                                createNumberButtons(6, 8, classNameNumber, tableRow, table);
                                rowCreated = 8;
                            }
                            else if (counter === 4) {
                                createNumberButtons(9, 9, classNameNumber, tableRow, table);
                                rowCreated = 9;
                            }
                         }
                         else {
                                // handles the incomplete rows for numbers
                                if(rowCreated > 0) {
                                     createNumberButtons(rowCreated+1, numberLength-1, classNameNumber, tableRow, table);
                                }
                                else{
                                     createNumberButtons(rowCreated, numberLength-1, classNameNumber, tableRow, table);
                                }

                         }
                         // create operators' rows and append them to numbers' rows
                         if(operatorLength > 3*counter) {
                             if (counter === 1) {
                                 createOperatorButtons(0, 2, classNames, operators, tableRow, table);
                                 rowCreated = 2;
                             }
                             else if (counter === 2) {
                                 createOperatorButtons(3, 5, classNames, operators, tableRow, table);
                                 rowCreated = 5;
                             }
                             else if (counter === 3) {
                                 createOperatorButtons(6, 8, classNames, operators, tableRow, table);
                                 rowCreated = 8;
                             }
                             else if (counter === 4) {
                                 createOperatorButtons(9, 12, classNames, operators, tableRow, table);
                                 rowCreated = 12;
                             }
                          }
                          else {
                                 // handles the incomplete rows for operators
                                 if(rowCreated > 0) {
                                      createOperatorButtons(rowCreated+1, operatorLength-1, classNames, operators, tableRow, table);
                                 }
                                 else {
                                      createOperatorButtons(rowCreated, operatorLength-1, classNames, operators, tableRow, table);
                                 }
                          }
                     }
                }
                // appends the table to the div object
                container.appendChild(table);
                callback();
        }


        //------------------------- Public methods --------------------------------//

        // this method creates the result textbox and calculator
        this.createCalculator = function(callback) {
              // create result textbox
              txtResult = document.createElement('input');
              txtResult.type = 'text';
              txtResult.maxLength = 15;
              txtResult.id = 'txtResult';
              // disables the keypress events
              txtResult.setAttribute('onkeypress', 'return false;');
              // appends the textbox to the div
              container.appendChild(txtResult);
              createTableElements(function() {
                console.log('function createTableElements() executed successfully');
              });
              callback();
        }  // end of createCalculator
    } // end of class

 ///////////////////////////////////////// End of Calculator Class ////////////////////////////////////////////////////////////
