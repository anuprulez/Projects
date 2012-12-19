// creates calculator
function generateCalculator(parameter) {
    var container = document.getElementById('divCalculator');
    // instantiates the calculator class
    var newCalculator = new Calculator(container);
    // calls the function to create calculator
    newCalculator.createCalculator(function(){
        console.log('Calculator created successfully');
    });
} // End of generateCalculator function


// calls when any button on the calculator is clicked
function getButtonClickedValue(btnClickValue) {
    // gets the result textbox object
    var txtbxObj = document.getElementById('txtResult');
    if(btnClickValue !== null){
        // instantiates the ExpressionEvaluate class
        var getValue = new ExpressionEvaluate(txtbxObj, btnClickValue);
        // calls distinguishButtonClick method to check and evaluate the expression
        getValue.distinguishButtonClick(btnClickValue, function(buttonName){
            console.log('Button clicked: ' + buttonName);
        });
    }
} // End of getButtonClickedValue function


///////////// Calculator code ends /////////////////////////////////////////////////////////////////////////////////
