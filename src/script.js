// calls when any button
// on the calculator is clicked and
// performs appropriate/ intended actions
function writeValues(getValue){
        var firstNumber = 0;
        var secondNumber = 0;
        var posPlus;
        var posMinus;
        var posMultiply;
        var posDivide;
        var posExponent;
        var posPeriod;
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
               if(textBoxObject.value != "" && posPlus == -1 && (posMinus == -1 || posMinus == 0) && posMultiply == -1 && posDivide == -1
               && posExponent == -1 && posPeriod >= -1){
                    //if(posPeriod > -1){
                        //if((posPlus >= -1 && posPeriod < posPlus) || (posMinus >= -1 && posPeriod < posMinus) || (posMultiply >= -1 && posPeriod < posMultiply)
                        //|| (posDivide > -1 && posPeriod < posDivide) || (posExponent > -1 && posPeriod < posExponent))
                        //textBoxObject.value = textBoxObject.value + valueButtonClicked;
                    //}
                    //else{

                    //}
                    textBoxObject.value = textBoxObject.value + valueButtonClicked;
               }
               break;
            case "=":
                var resultLength =  textBoxObject.value.length;
                // finds the position of mathematical operators
                posPlus =  textBoxObject.value.indexOf("+");
                posMinus =  textBoxObject.value.indexOf("-");
                posMultiply = textBoxObject.value.indexOf("*");
                posDivide = textBoxObject.value.indexOf("/");
                posExponent = textBoxObject.value.indexOf("^");
                // adds two numbers
                if(posPlus > 0){
                   // takes the left part of the string i.e the first number
                   firstNumber =  textBoxObject.value.substring(0, posPlus);
                   // takes the right part of the string i.e. the second number
                   secondNumber = textBoxObject.value.substring(posPlus+1, resultLength);
                   // adds the numbers
                   if(!isNaN(parseFloat(firstNumber) + parseFloat(secondNumber))){
                        textBoxObject.value = parseFloat(firstNumber) + parseFloat(secondNumber);
                   }
                }
                // subtract the two numbers
                else if(posMinus > 0){
                   // takes the left part of the string i.e the first number
                   firstNumber =  textBoxObject.value.substring(0, posMinus);
                   // takes the right part of the string i.e. the second number
                   secondNumber = textBoxObject.value.substring(posMinus+1, resultLength);
                   // subtract the numbers
                   if(!isNaN(parseFloat(firstNumber) - parseFloat(secondNumber))){
                        textBoxObject.value = parseFloat(firstNumber) - parseFloat(secondNumber);
                   }
                }
                // multiplies the two numbers
                else if(posMultiply > 0){
                   // takes the left part of string
                   firstNumber =  textBoxObject.value.substring(0, posMultiply);
                   // takes the right part of the string
                   secondNumber = textBoxObject.value.substring(posMultiply+1, resultLength);
                   // multiplies the numbers
                   if(!isNaN(parseFloat(firstNumber) * parseFloat(secondNumber))){
                        textBoxObject.value = parseFloat(firstNumber) * parseFloat(secondNumber);
                   }
                }
                // divides the two numbers
                 else if(posDivide > 0){
                   // takes the left part of the string
                   firstNumber =  textBoxObject.value.substring(0, posDivide);
                   // takes the right part of the string
                   secondNumber = textBoxObject.value.substring(posDivide+1, resultLength);
                   // divides the numbers
                   // checks if the denominator is 0 or not
                   if(parseFloat(secondNumber) > 0){
                        if(!isNaN(parseFloat(firstNumber) / parseFloat(secondNumber))){
                            textBoxObject.value = parseFloat(firstNumber) / parseFloat(secondNumber);
                        }
                        // for restricting the number of digits after the period
                        //var posPeriod = textBoxObject.value.indexOf(".");
                        //if(posPeriod > 0){
                        //}
                   }
                   // if the denominator is zero, result text box give 'infinite' text
                   else{
                        textBoxObject.value = "Infinite";
                   }
                 }
                 // multiplies the two numbers
                 else if(posExponent > 0){
                    // takes the left part of string
                    firstNumber =  textBoxObject.value.substring(0, posExponent);
                    // takes the right part of the string
                    secondNumber = textBoxObject.value.substring(posExponent+1, resultLength);
                    // multiplies the numbers
                    if(!isNaN(parseFloat(firstNumber) ^ parseFloat(secondNumber))){
                         textBoxObject.value = Math.pow(parseFloat(firstNumber),parseFloat(secondNumber));
                    }
                 }
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
              if(!isNaN(textBoxObject.value) && textBoxObject.value != "" && parseFloat(textBoxObject.value) >= 0){
                    textBoxObject.value = Math.sqrt(parseFloat(textBoxObject.value)) ;
              }
              break;
              case "1/x":
              // calculates the reciprocal of the number
              if(!isNaN(textBoxObject.value) && textBoxObject.value != ""){
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
///////////// Calculator code ends /////////////////////////////////////////////////////////////////////////////////

//////////////////// Practice code starts //////////////////////////////////////////////////////////////////////////

/*function sample(){
    /*var book = {
    name: 'Catch-22',
    published: 1961,
    doWork: function(){
      alert('a function defined');
    }
    author: {
        firstname: 'Joseph',
        lastname: 'Heller',
    }
    };*/

    /*function Vehicle(name){
        this.Name = name;
        this.Color = 'Red';
        this.driveHow: function(){
            alert('The vehicle ' + this.Name + ' not drivable');
        }
    } */

     // defines a class
     /*function Hero(name) {
        this.name = name;
        this.occupation = 'Ninja';
        this.whoAreYou = function() {
            alert("I'm " + this.name + " and I'm a " + this.occupation);
     }
     }
     var h1 = new Hero('Michelangelo');
     var h2 = new Hero('Donatello');
     h1.whoAreYou();   */
     //console.log(h2.name);
     //console.log(h2.occupation);
     //var vehicle1 = new Vehicle('Honda');
     //vehicle1.driveHow();
     //alert(book.author.doWork());
     //alert(animal.legs.fingers);

     /*function Person(name){
        // private variable and function
        var age = 100;
        // private function
        function howtowork(){age = age - 1; alert(age);}
        // privileged function
        this.privilegeWork = function(){
            howtowork();
            if (age >= 100)  {alert('Age greater than and equal to 100');}
            else{alert('Age is less than 100');}
            //return true;
        }
        // public properties
        this.Name = name;

        // public methods
        Person.prototype.socialize = function(){alert('Public method and legs: ' + this.hasLegs); howtowork();}

        // prototype properties
        Person.prototype.hasLegs = true;

        // static properties
        Person.staticLegs = false;
     }
      var person1 = new Person('myname');

      //person1.privilegeWork();
      //person1.socialize();
      //alert(person1.hasLegs);
      //for(var i in person1){
        //console.log('property: ' + i + ' in ' + person1[i] );
      //}

      //alert('Checks for the prototype property: ' + person1.hasLegs.isPrototypeOf())
      // Inheritance from a parent class to child class
      // Changing the prototype of child class of parent type
      Suan.prototype = new Person('Susan');
      // changing the prototupe constructor of the child class of child class type
      Suan.prototype.constructor = Suan;
      Suan.prototype.baseClass = Person.prototype.constructor;
      // definition of child class
      function Suan(name){
        var myOffice = 'ABX Company';
        this.Name = name;
        // public function
        this.myFunction = function(){
            alert('In child class now');
        }
        this.privilegeWork = simpleHelp;

        function simpleHelp(){
            alert('Inside simple help and my ofc is: '+ myOffice);
        }
      }
      // creating the child class object
      var Suan1 = new Suan('Susan2');
      // calling the parent class method - the inherited method
      //Suan1.socialize();
      //alert(Suan.prototype.baseClass);

      //Suan1.helpMe();

      // Polymorphism - baseClass and child class have the same method name with different
      // implementation
      //Suan1.privilegeWork();
      //person1.privilegeWork();

      // calling the child class method
      //Suan1.myFunction();
      //alert(Suan.prototype.constructor);
      //Suan1.howtowork();
     // function that uses the Person class
     //function usePersonClass(){
     //}

     // base class
     function Area(shapeName){
        this.shape = shapeName;
        this.getArea = getArea;

        function getArea(){
            alert('Area of the '+ this.shape +' is: ' + this.area);
        }
     }

     Circle.prototype = new Area('circle');
     Circle.prototype.constructor = Circle;
     Circle.prototype.baseClass = Area.prototype.constructor;

     function Circle(radius){
        this.area = 3.14 * (Math.pow(radius,2));
     }


     var circleArea = new Circle(10);
     circleArea.getArea();
}*/
