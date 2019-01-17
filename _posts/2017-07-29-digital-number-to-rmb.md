---
layout: post
title:  数字转人民币大写
date:   2017-07-29
categories: 小工具
excerpt: 小工具
---


<link href="/imgs/2017-07-29-digital-number-to-rmb/base.css" rel="stylesheet" type="text/css" />
<style type="text/css">
.box {
	width:950px;
	margin-left:auto;
	margin-right:auto;
	line-height:180%;
	font-size:13px;
}
h3 {
	color:#e35d04;
	text-align:center;
	background:#e4efff;
	font-size:14px;
	padding:6px 0 4px 0
}
.button {
	width:130px;
	height:27px;
	line-height:27px;
	font-size:13px;
	letter-spacing:0;
	text-align:center;
	color:#fff;
	background:url("/imgs/2017-07-29-digital-number-to-rmb/bg_search1.gif) no-repeat;
	margin-left:65px;
	border:none;
	cursor:pointer
}
p {
	margin:15px 0
}
.input2, .inputtext, .inputtext-bor {
	height:30px;
	line-height:30px
}
input {
	font-size:14px;
}
#jg {
	/* 显示框样式表*/
FOTN-SIZE:14PX;
	padding:3px;
	border:1px solid #888;
	width:96%;
	text-align:right;
}
a:visited, a:link {
	text-decoration:none;
}
* {
	margin:0;
}
/*
body {
	background-color: #99CC66;
}*/
table {
	border:2px solid #fff;
}
#main {
	/* 包含表格层样式*/
margin:150px auto 0 auto;
	padding:20px;
	background-color: #999966;
	border-top:1px solid #FFF;
	border-bottom:1px solid #FFF;
}
#copyright {
	font-size:12px;
	color:#555;
	background-color: #CCCC66;
	padding:3px;
	text-align:center;
	border:1px solid #eee;
}
</style>
<script language="JavaScript" type="text/JavaScript">
function convertCurrency(currencyDigits) { 
// Constants: 
    var MAXIMUM_NUMBER = 99999999999.99; 
    // Predefine the radix characters and currency symbols for output: 
    var CN_ZERO = "零"; 
    var CN_ONE = "壹"; 
    var CN_TWO = "贰"; 
    var CN_THREE = "叁"; 
    var CN_FOUR = "肆"; 
    var CN_FIVE = "伍"; 
    var CN_SIX = "陆"; 
    var CN_SEVEN = "柒"; 
    var CN_EIGHT = "捌"; 
    var CN_NINE = "玖"; 
    var CN_TEN = "拾"; 
    var CN_HUNDRED = "佰"; 
    var CN_THOUSAND = "仟"; 
    var CN_TEN_THOUSAND = "万"; 
    var CN_HUNDRED_MILLION = "亿"; 
    var CN_SYMBOL = "人民币"; 
    var CN_DOLLAR = "元"; 
    var CN_TEN_CENT = "角"; 
    var CN_CENT = "分"; 
    var CN_INTEGER = "整"; 
     
// Variables: 
    var integral;    // Represent integral part of digit number. 
    var decimal;    // Represent decimal part of digit number. 
    var outputCharacters;    // The output result. 
    var parts; 
    var digits, radices, bigRadices, decimals; 
    var zeroCount; 
    var i, p, d; 
    var quotient, modulus; 
     
// Validate input string: 
    currencyDigits = currencyDigits.toString(); 
    if (currencyDigits == "") { 
        alert("请输入小写金额！"); 
        return ""; 
    } 
    if (currencyDigits.match(/[^,.\d]/) != null) { 
        alert("小写金额含有无效字符！"); 
        return ""; 
    } 
    if ((currencyDigits).match(/^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/) == null) { 
        alert("小写金额的格式不正确！"); 
        return ""; 
    } 
     
// Normalize the format of input digits: 
    currencyDigits = currencyDigits.replace(/,/g, "");    // Remove comma delimiters. 
    currencyDigits = currencyDigits.replace(/^0+/, "");    // Trim zeros at the beginning. 
    // Assert the number is not greater than the maximum number. 
    if (Number(currencyDigits) > MAXIMUM_NUMBER) { 
        alert("金额过大，应小于1000亿元！"); 
        return ""; 
    } 
     
// Process the coversion from currency digits to characters: 
    // Separate integral and decimal parts before processing coversion: 
    parts = currencyDigits.split("."); 
    if (parts.length > 1) { 
        integral = parts[0]; 
        decimal = parts[1]; 
        // Cut down redundant decimal digits that are after the second. 
        decimal = decimal.substr(0, 2); 
    } 
    else { 
        integral = parts[0]; 
        decimal = ""; 
    } 
    // Prepare the characters corresponding to the digits: 
    digits = new Array(CN_ZERO, CN_ONE, CN_TWO, CN_THREE, CN_FOUR, CN_FIVE, CN_SIX, CN_SEVEN, CN_EIGHT, CN_NINE); 
    radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND); 
    bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION); 
    decimals = new Array(CN_TEN_CENT, CN_CENT); 
    // Start processing: 
    outputCharacters = ""; 
    // Process integral part if it is larger than 0: 
    if (Number(integral) > 0) { 
        zeroCount = 0; 
        for (i = 0; i < integral.length; i++) { 
            p = integral.length - i - 1; 
            d = integral.substr(i, 1); 
            quotient = p / 4; 
            modulus = p % 4; 
            if (d == "0") { 
                zeroCount++; 
            } 
            else { 
                if (zeroCount > 0) 
                { 
                    outputCharacters += digits[0]; 
                } 
                zeroCount = 0; 
                outputCharacters += digits[Number(d)] + radices[modulus]; 
            } 
            if (modulus == 0 && zeroCount < 4) { 
                outputCharacters += bigRadices[quotient]; 
                zeroCount = 0; 
            } 
        } 
        outputCharacters += CN_DOLLAR; 
    } 
    // Process decimal part if there is: 
    if (decimal != "") { 
        for (i = 0; i < decimal.length; i++) { 
            d = decimal.substr(i, 1); 
            if (d != "0") { 
                outputCharacters += digits[Number(d)] + decimals[i]; 
            } 
        } 
    } 
    // Confirm and return the final output string: 
    if (outputCharacters == "") { 
        outputCharacters = CN_ZERO + CN_DOLLAR; 
    } 
    if (decimal == "") { 
        outputCharacters += CN_INTEGER; 
    } 
    outputCharacters = CN_SYMBOL + outputCharacters; 
    return outputCharacters; 
} 
</script>

<div id="page">
  <div id="middle">
    <div class="top1"></div>
    <div class="box_top"></div>
    <div class="box">
       <div class="conversation">
        <div>
          <h1>人民币小写在线转换成大写</h1>
        </div>
        <div style="border-bottom:1px solid #e6e6e6; border-top:1px solid #e6e6e6; padding:15px 0; overflow:hidden; _zoom:1">
          <div style="padding:30px 0; float:left; width:400px"> 小写金额：
            <input name="Digits" type="text" id="Digits" class="input2" onFocus="this.className='inputtext-bor'" onBlur="this.className='inputtext'" value="1688.99" size="40">
            <br/>
            <br/>
            大写金额：
            <input name="Result" type="text" class="input2" id="Result" size="40">
            <br/>
            <br/>
            <input id="Convert" type="button" class="button" value="转换为大写金额" name="Convert" onclick="Result.value = convertCurrency(Digits.value);" >
		   			
 
<script language="javascript">
var a,b,c,d;
function shu(x)
{
if (jg.value==0)
	{
	jg.value=x;
	}
else
{
	if (x==".")
	{
	var kk=jg.value
	if (kk.indexOf(".")<0)
	{jg.value=jg.value+x;}
	}
	else
	{
	jg.value=jg.value+x;
	}
}
//programing by downyi.com
}
function yunsuan(y)
{
	switch (y)
	{
	case "+":
	d="+"
	break
	case "-":
	d="-"
	break
	case "x":
	d="x"
	break
	case "/":
	d= "/"
	}
a=Number(jg.value);
jg.value=""
}
function dengyu()
{
b=Number(jg.value)
if(a!=undefined && b!=0 && d!=undefined)
{
	switch (d)
	{
	case "+":
		c=a+b;
		break;
	case "-":
		c=a-b;
		break;
	case "x":
		c=a*b;
		break;
	
	case "/":
		c=a/b;
	}
jg.value=c;
a=0;
b=0;
d=undefined;
Digits.value=c;
Result.value = convertCurrency(Digits.value);
}
}
function qc()
{
a=0;
b=0;
d=undefined;
jg.value="0";
}
function shanchu()
{
var bs=jg.value;
bs=bs.substr(0,bs.length-1);
jg.value=bs;
jg.focus();
}
function pf()
{
var h=Number(jg.value);
if (h!=0)
	{
	h=h*h;
	jg.value=h;
	}
}
function jc()
{
var p=1;
var q=parseInt(jg.value)
if (q!=0 && q!=NaN)
	{
	for (i=1;i<=q;i++)
		{
		p=p*i;
		}
	jg.value=p;
	}

}
function setfocus()
{
jg.focus();
ts=startTime()
}
function kf()
{
if (jg.value!=".")
{
jg.value=Math.sqrt(Number(jg.value))
}
}

function checkkey()
{
var p=/[^0-9]/
if (p.test(jg.value)==true)
{
jg.value=""
jg.focus
}
}
function startTime()
{
var today=new Date()
var h=today.getHours()
var m=today.getMinutes()
var s=today.getSeconds()
m=checkTime(m)
s=checkTime(s)
document.getElementById('sjxs').innerHTML=h+":"+m+":"+s
t=setTimeout('startTime()',500)
}

function checkTime(i)
{
if (i<10) 
  {i="0" + i}
  return i
}
function timeshow()
{

if (document.getElementById('sjxs').style.display!="none")
{
document.getElementById('sjxs').style.display="none"
}
else
{
document.getElementById('sjxs').style.display="block"
}

}

</script>

<div style="display:none">
<script type="text/javascript">
_uacct = "UA-99189-7";
urchinTracker();
</script>
