function MM_reloadPage(init) {  //reloads the window if Nav4 resized
  if (init==true) with (navigator) {if ((appName=="Netscape")&&(parseInt(appVersion)==4)) {
    document.MM_pgW=innerWidth; document.MM_pgH=innerHeight; onresize=MM_reloadPage; }}
  else if (innerWidth!=document.MM_pgW || innerHeight!=document.MM_pgH) location.reload();
}
MM_reloadPage(true);
 
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
 
function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}
 
function navbarOver(src,clrOver) { if (!src.contains(event.fromElement)){ src.style.cursor = 'hand'; src.bgColor = clrOver; src.children.tags('a')[0].style.color='#FF0000'; }}
 
function navbarOut(src,clrIn) { if (!src.contains(event.toElement)) { src.style.cursor = 'default'; src.bgColor = clrIn;  src.children.tags('a')[0].style.color='#333333';}}

function MM_findObj(n, d) { //v4.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && document.getElementById) x=document.getElementById(n); return x;
}
 
function MM_showHideLayers() { //v3.0
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}

	function getday(){
		
		var now=new Date();
		var year=now.getYear();
		InForm.Year.value = (year<1900?(1900+year):year);
		InForm.Month.selectedIndex=now.getMonth();
		InForm.Day.selectedIndex=now.getDate()-1;
		
		Main(document.InForm);
		
	}
function chk(){
	if(InForm.lomin.value=="")
		InForm.lomin.value=0;
	if(InForm.lamin.value=="")
		InForm.lamin.value=0;
	var y = parseInt(InForm.Year.value, 10);
	if(y!=InForm.Year.value){
		alert("请输入一个整数");
		InForm.Year.focus();
		return false;
	}
	if(y<1950||y>2050){
		alert("有效年份为1950到2050");
		InForm.Year.focus();
		return false;
	}
	var m=InForm.Month.selectedIndex+1;
	var d=InForm.Day.selectedIndex+1;
	if(m==2&&(d==30||d==31)){
		alert("请输入合法日期");
		InForm.Day.focus();
		return false;
	}
	if(m==2&&d==29&&(y%4)!=0){
		alert("请输入合法日期");
		InForm.Day.focus();
		return false;
	}
	if((m==4||m==6||m==9||m==11)&&d==31){
		alert("请输入合法日期");
		InForm.Day.focus();
		return false;
	}
	var lo=InForm.Glong.value;
	var la=InForm.Glat.value;
	var lomin=InForm.lomin.value;
	var lamin=InForm.lamin.value;
	if(parseInt(lo)!=lo){
		alert("经度度数应为一个整数");
		InForm.Glong.focus();
		return false;
	}
	if(parseInt(lomin)!=lomin){
		alert("经度的分应为一个整数");
		InForm.lomin.focus();
		return false;
	}
	if(parseInt(la)!=la){
		alert("纬度度数应为一个整数");
		InForm.Glat.focus();
		return false;
	}
	if(parseInt(lamin)!=lamin){
		alert("纬度的分应为一个整数");
		InForm.lamin.focus();
		return false;
	}
	if(parseInt(lo)<0||parseInt(lo)>180){
		alert("经度度数在0到180之间");
		InForm.Glong.focus();
		return false;
	}
	
	if(parseInt(lomin)<0||parseInt(lomin)>59){
		alert("经度的分应在0到59之间");
		InForm.lomin.focus();
		return false;
	}
	if(parseInt(la)<0||parseInt(la)>90){
		alert("纬度度数在0到90之间");
		InForm.Glat.focus();
		return false;
	}
	if(parseInt(lamin)<0||parseInt(lamin)>59){
		alert("纬度的分在0到59之间");
		InForm.lamin.focus();
		return false;
	}
	var t=InForm.TimeZone.value;
	if(t==""){
		alert("请输入时区");
		InForm.TimeZone.focus();
		return false;
	}
	if(t!=parseInt(t)){
		alert("请输入一个整数");
		InForm.TimeZone.focus();
		return false;
	}
	if(parseInt(t)<0||parseInt(t)>14){
		alert("时区应在0到14之间");
		InForm.TimeZone.focus();
		return false;
	}
	return true;
}
 
function Main(InForm) {
	if(chk()==false)
		return;
	var OutString = "";
	var calend;
	var quady = new Array;
	var sunp = new Array;
	var moonp = new Array;
	var y, m, day, glong, glat, tz, numday, mj, lst1, i;
	var rads = 0.0174532925, sinmoonalt;
	
	y = parseInt(InForm.Year.value, 10);
	m = InForm.Month.selectedIndex+1;
	day = InForm.Day.selectedIndex+1;
	if(InForm.lo[0].checked)
		glong = parseInt(InForm.Glong.value)+parseFloat(InForm.lomin.value)/60;
	else
		glong = 0-(parseInt(InForm.Glong.value)+parseFloat(InForm.lomin.value)/60);
	if(InForm.la[0].checked)
		glat = parseInt(InForm.Glat.value)+parseFloat(InForm.lamin.value)/60;
	else
		glat = 0-(parseInt(InForm.Glat.value)+parseFloat(InForm.lamin.value)/60);
	if(InForm.tz.selectedIndex==0)
		tz = parseFloat(InForm.TimeZone.value);
	else
		tz = 0-parseFloat(InForm.TimeZone.value);
	mj = mjd(day, m, y, 0.0);
	result.innerHTML = Cal(mj, tz, glong, glat);
}
 
function hrsmin(hours) {
	var hrs, h, m, dum;
	hrs = Math.floor(hours * 60 + 0.5)/ 60.0;
	h = Math.floor(hrs);
	m = Math.floor(60 * (hrs - h) + 0.5);
	if(h<10)h="0"+h;
	if(m<10)m="0"+m;
	dum = h +":"+ m;
	
	if (dum < 1000) dum = "0" + dum;
	if (dum <100) dum = "0" + dum;
	if (dum < 10) dum = "0" + dum;
	return dum;
	}
 
 
function ipart(x) {
	var a;
	if (x> 0) {
	    a = Math.floor(x);
		}
	else {
		a = Math.ceil(x);
		}
	return a;
	}
 
 
function frac(x) {
	var a;
	a = x - Math.floor(x);
	if (a < 0) a += 1;
	return a;
	}
 
 
function round(num, dp) {
   return Math.round (num * Math.pow(10, dp)) / Math.pow(10, dp);
 }
 
 
function range(x) {
	var a, b;
	b = x / 360;
	a = 360 * (b - ipart(b));
	if (a  < 0 ) {
		a = a + 360
	}
	return a
}
 
 
function mjd(day, month, year, hour) {
	var a, b;
	if (month <= 2) {
		month = month + 12;
		year = year - 1;
		}
	a = 10000.0 * year + 100.0 * month + day;
	if (a <= 15821004.1) {
		b = -2 * Math.floor((year + 4716)/4) - 1179;
		}
	else {
		b = Math.floor(year/400) - Math.floor(year/100) + Math.floor(year/4);
		}
	a = 365.0 * year - 679004.0;
	return (a + b + Math.floor(30.6001 * (month + 1)) + day + hour/24.0);
}	
 
 
 
function quad(ym, yz, yp) {
	var nz, a, b, c, dis, dx, xe, ye, z1, z2, nz;
	var quadout = new Array;
 
	nz = 0;
	a = 0.5 * (ym + yp) - yz;
	b = 0.5 * (yp - ym);
	c = yz;
	xe = -b / (2 * a);
	ye = (a * xe + b) * xe + c;
	dis = b * b - 4.0 * a * c;
	if (dis > 0)	{
		dx = 0.5 * Math.sqrt(dis) / Math.abs(a);
		z1 = xe - dx;
		z2 = xe + dx;
		if (Math.abs(z1) <= 1.0) nz += 1;
		if (Math.abs(z2) <= 1.0) nz += 1;
		if (z1 < -1.0) z1 = z2;
		}
	quadout[0] = nz;
	quadout[1] = z1;
	quadout[2] = z2;
	quadout[3] = xe;
	quadout[4] = ye;
	return quadout;
	}
 
 
function lmst(mjday, glong) {
	var lst, t, d;
	d = mjday - 51544.5
	t = d / 36525.0;
	lst = range(280.46061837 + 360.98564736629 * d + 0.000387933 *t*t - t*t*t / 38710000);
	return (lst/15.0 + glong/15);
	}
 
 
function minisun(t) {
	var p2 = 6.283185307, coseps = 0.91748, sineps = 0.39778;
	var L, M, DL, SL, X, Y, Z, RHO, ra, dec;
	var suneq = new Array;
 
	M = p2 * frac(0.993133 + 99.997361 * t);
	DL = 6893.0 * Math.sin(M) + 72.0 * Math.sin(2 * M);
	L = p2 * frac(0.7859453 + M / p2 + (6191.2 * t + DL)/1296000);
	SL = Math.sin(L);
	X = Math.cos(L);
	Y = coseps * SL;
	Z = sineps * SL;
	RHO = Math.sqrt(1 - Z * Z);
	dec = (360.0 / p2) * Math.atan(Z / RHO);
	ra = (48.0 / p2) * Math.atan(Y / (X + RHO));
	if (ra <0 ) ra += 24;
	suneq[1] = dec;
	suneq[2] = ra;
	return suneq;
	}
 
function sin_alt(iobj, mjd0, hour, glong, cglat, sglat) {
	var mjday, t, ra, dec, tau, salt, rads = 0.0174532925;
	var objpos = new Array;
	mjday = mjd0 + hour/24.0;
	t = (mjday - 51544.5) / 36525.0;
	if (iobj == 1) {
		objpos = minimoon(t);
				}
	else {
		objpos = minisun(t);
		}
	ra = objpos[2];
	dec = objpos[1];
	tau = 15.0 * (lmst(mjday, glong) - ra);
	salt = sglat * Math.sin(rads*dec) + cglat * Math.cos(rads*dec) * Math.cos(rads*tau);
	return salt;
	}
 
function getzttime(mjday, tz, glong) {
	var sglong, sglat, date, ym, yz, utrise, utset, j;
	var yp, nz, hour, z1, z2, iobj, rads = 0.0174532925;
	var quadout = new Array;
   
	sinho = Math.sin(rads * -0.833);		
	date = mjday - tz/24;
	hour = 1.0;
	ym = sin_alt(2, date, hour - 1.0, glong, 1, 0) - sinho;
 
	while(hour < 25) {
		yz = sin_alt(2, date, hour, glong, 1, 0) - sinho;
		yp = sin_alt(2, date, hour + 1.0, glong, 1, 0) - sinho;
		quadout = quad(ym, yz, yp);
		nz = quadout[0];
		z1 = quadout[1];
		z2 = quadout[2];
		xe = quadout[3];
		ye = quadout[4];
 
		if (nz == 1) {
			if (ym < 0.0) 
				utrise = hour + z1;			
			else 
				utset = hour + z1;
			
		} 
		if (nz == 2) {
			if (ye < 0.0) {
				utrise = hour + z2;
				utset = hour + z1;
			}
			else {
				utrise = hour + z1;
				utset = hour + z2;
			}
		} 
		ym = yp;
		hour += 2.0;
	} 
	var zt=(utrise+utset)/2;
	if(zt<utrise)
		zt=(zt+12)%24;
	return zt;
}

function Cal(mjday, tz, glong, glat) {

	var sglong, sglat, date, ym, yz, above, utrise, utset, j;
	var yp, nz, rise, sett, hour, z1, z2, iobj, rads = 0.0174532925;
	var quadout = new Array;
	var   always_up = "日不落";
	var always_down = "日不出";
	var outstring = "";
    var resobj = {};

	sinho = Math.sin(rads * -0.833);		
	sglat = Math.sin(rads * glat);
	cglat = Math.cos(rads * glat);
	date = mjday - tz/24;

	rise = false;
	sett = false;
	above = false;
	hour = 1.0;
	ym = sin_alt(2, date, hour - 1.0, glong, cglat, sglat) - sinho;
	if (ym > 0.0) above = true;
	while(hour < 25 && (sett == false || rise == false)) {
		yz = sin_alt(2, date, hour, glong, cglat, sglat) - sinho;
		yp = sin_alt(2, date, hour + 1.0, glong, cglat, sglat) - sinho;
		quadout = quad(ym, yz, yp);
		nz = quadout[0];
		z1 = quadout[1];
		z2 = quadout[2];
		xe = quadout[3];
		ye = quadout[4];
 
		if (nz == 1) {
			if (ym < 0.0) {
				utrise = hour + z1;
				rise = true;
			}
			else {
				utset = hour + z1;
				sett = true;
			}
		} 
 
		if (nz == 2) {
			if (ye < 0.0) {
				utrise = hour + z2;
				utset = hour + z1;
			}
			else {
				utrise = hour + z1;
				utset = hour + z2;
			}
		} 
 
		ym = yp;
		hour += 2.0;
 
	} 
 
	if (rise == true || sett == true ) {
		if (rise == true) {
            resobj["rise"] = hrsmin(utrise);
            outstring += "&nbsp;&nbsp;日出时刻:" + hrsmin(utrise)+"<BR>";
        }
		else{
            outstring += "&nbsp;&nbsp;日不出或日不落"+"<BR>";	
            resobj["pole"] = "日不出或日不落";
        }
		var zt=getzttime(mjday, tz, glong);
        resobj["center"] = hrsmin(zt);
		outstring+= "&nbsp;&nbsp;日中时刻:" + hrsmin(zt)+"<BR>";
		if (sett == true){ 
            outstring += "&nbsp;&nbsp;日没时刻:" + hrsmin(utset);
            resobj["set"] = hrsmin(utset);
        }else {
            outstring += "&nbsp;&nbsp;日不出或日不落";
            resobj["pole"] = "日不出或日不落";
        }
	}
	else {
		if (above == true){
            outstring += always_up;
            var zt=getzttime(mjday, tz, glong);
            resobj["center"] = hrsmin(zt);
            resobj["pole"] = "极昼";
            outstring+="<BR>"+"&nbsp;&nbsp;日中时刻:"+hrsmin(zt);
		} else {
            outstring += always_down;
            resobj["pole"] = "极夜";
        }
	}		
	return resobj;
}
 

