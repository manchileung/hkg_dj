/*

function hkgreply()
        {
document.getElementById('ctl00$ContentPlaceHolder1$messagetext').value="聽歌啦喂#yup#";
document.forms[0].submit();
$('body').append('<input type="button" onclick="hkgreply()">');  

        }
        
//setTimeout( hkgreply, 480000 );
hkgreply();

*/


function insert(){ 
var insertText = "<table><tr><td>any thing</td></tr></table>"; 
document.getElementById("insert").innerHTML = document.getElementById("insert").innerHTML+insertText; 
} 
