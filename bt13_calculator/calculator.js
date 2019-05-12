function getNumber(num) {
	var input_var = document.getElementById('input');
	switch(num){
		case 1:
		input_var.value+= '1' ;
		break;

		case 2:
		input_var.value+='2';
		break;

		case 3:
		input_var.value+='3';
		break;

		case 4:
		input_var.value+='4';
		break;

		case 5:
		input_var.value+='5';
		break;

		case 6:
		input_var.value+='6';
		break;

		case 7:
		input_var.value+='7';
		break;

		case 8:
		input_var.value+='8';
		break;

		case 9:
		input_var.value+='9';
		break;

		case 0:
		input_var.value+='0';
		break;
	}
}

function clearScreen(){
	document.getElementById('input').value='';
	document.getElementById('answer').value='';
}

function getOperand(operand){
	var input_var=document.getElementById('input');
	var answer=document.getElementById('answer');
	switch(operand){
		case '+':
		input_var.value+='+';
		break;

		case '-':
		input_var.value+='-';
		break;

		case 'x':
		input_var.value+='*';
		break;

		case '/':
		input_var.value+='/';
		break;

		case '.':
		input_var.value+='.';
		break;

		case '(':
		input_var.value+='(';
		break;

		case ')':
		input_var.value+=')';
		break;

		case '^2':
		answer.value=input_var.value*input_var.value;
		input_var.value+='(^2)';		
		break;

		case '&#8730':
		
		input_var.value+='del';
		break;
	}
}

function back(){
	var input_var=document.getElementById('input');
	var x = input_var.value;
	if (x.length>0) {
		x=x.slice(0,x.length-1);
		input_var.value = x;
	}
}

function tinhGiaiThua(){
	var input_var=document.getElementById('input');
	var answer=document.getElementById('answer');

	input_var.value+='!';
	let n = parseInt(input_var.value)
	for(let a=1;n>=1;n--){
		a=a*n;
		answer.value=a;
	}
}


function compute(){
	var input_var=document.getElementById('input');
	var ans = eval(input_var.value);
	
	document.getElementById('answer').value=ans;

}

function close_window() {
  if (confirm("Close Window?")) {
    close();
  }
}