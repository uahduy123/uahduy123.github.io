//Bài 1
function square (x) {
    console.log("square("+ x + ")" + " = " + x*x);
    return x*x;
}

//Bài 2
function centuryFromYear(year) {
    
    var century = Math.ceil(year/100);
    
    return century;
}
console.log(centuryFromYear("2190"));


//Bài 3:
function shorten (inputString) {
    var shortenString = inputString.substring(0,10);
    shortenString += "...";
    console.log('Kết quả: ' + shortenString);
    return shortenString;
}


//Bài 4

function jsUcfirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
console.log(jsUcfirst("Trần Duy Hậu"));



//Bài 5:
function minArray(arr) {
    var sortedArr = arr.sort( function(a,b) {
        return a-b
    });
    var min = sortedArr[0];
    console.log("số nhỏ nhất: " + min);
    return min;
}


//Bài 6:
function sortThenPrint (names) {
    sortedNames = names.sort( function (a,b) {
        return a.toLowerCase() > b.toLowerCase()?1:-1;
    });
    console.log("Kết quả: " + sortedNames);
    strToPrint = sortedNames.join("<br>");
    //document.write(strToPrint);
    // console.log(strToPrint);
    document.getElementById("exerciseResult_6").innerHTML = strToPrint;
    return sortedNames;
}

// Test code
square(12);
countCentury(2019);
shorten("012345678901234567890123456789012345678901234567890123456789");
convertString("duy hậu");
minArray([7, 5 , 9, 1, 3]);
//sortThenPrint (["hậu", "quỳnh", "tùng", "quý", "hậu"]);
