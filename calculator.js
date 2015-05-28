// Fetching all the keys from the document
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', '*', '/'];
var decimalAdded = false;
var assessment= false;
var exp = '';;

// Adding onclick events to the keys and defining their operations
for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {
		// Get the input and button values
		var input = document.querySelector('.screen');
		var inputVal = input.innerHTML;
		var btnVal = this.innerHTML;		//Appends the key values to the input string
		
		
		// Execution of the clear key will erase everything
		if(btnVal == 'C') {
			input.innerHTML = '0';
			exp = '0';
			decimalAdded = false;
		}
		
		//Additional functionality to calculate the square root
		else if(btnVal == 'sqrt'){
			
		}
		
		// If eval key is pressed, calculate and display the result
		else if(btnVal == '=') {
			var equation = exp;
			var lastChar = equation[equation.length - 1];
		
			
			// If the last character of the equation is operator or decimal, removes it
			if(operators.indexOf(lastChar) > -1 || lastChar == '.')
				equation = equation.replace(/.$/, '');
			
			if(equation){
				input.innerHTML = eval(equation);
				exp = input.innerHTML;
			}
				
			decimalAdded = false;
			assessment=true;
		}
		
		
		else if(operators.indexOf(btnVal) > -1) {
			
			//Stores the last character of the equation
			var lastChar = inputVal[inputVal.length - 1];
			if(assessment == true){
				assessment=false;
			}
			
			// An operator is added only if the last character of the equation is not a operator. 
			//Also checks if the equation is empty
			if(inputVal != '' && operators.indexOf(lastChar) == -1) {
				input.innerHTML += btnVal;
				exp += btnVal;
			}
			
			//Minus sign is allowed to be the first character in the equation
			else if(inputVal == '' && btnVal == '-') {
				input.innerHTML += btnVal;
				exp += btnVal;
			}
			
			// In case of two consecutive operators, retains the most recently clicked operator in the equation
			if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
				
				input.innerHTML = inputVal.replace(/.$/, btnVal);
				exp = exp.replace(/.$/, btnVal);
			}
			
			decimalAdded =false;
		}
		
		//The 'decimalAdded' flag keeps track of the decimals in the equation and prevents the addition of more than one decimal flag for a number
		//The 'decimalAdded' flag will be reset once operator, eval or clear key is clicked
		else if(btnVal == '.') {
			if(assessment == true){
				input.innerHTML = '';
				exp = '';
				assessment = false;
			}	
			if(!decimalAdded) {
				input.innerHTML += btnVal;
				exp += btnVal;
				decimalAdded = true;
			}
		}
		
		// Appends any other pressed key
		else {
			if (assessment == true){
				input.innerHTML = '';
				exp = '';
				assessment=false;
			}
			input.innerHTML += btnVal;
			exp += btnVal;
		}
		
		// prevent page jumps
		e.preventDefault();
	} 
}