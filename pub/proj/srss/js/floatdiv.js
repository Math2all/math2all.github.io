function elemOffset(elem)
{
     var t = elem.offsetTop;  
     var l = elem.offsetLeft;  
     while( elem = elem.offsetParent) 
     {  
          t += elem.offsetTop;  
          l += elem.offsetLeft;  
     }
     return { x : l , y : t };
}

function mousePosition(e) {
    if(e.pageX && e.pageY) {
        return { x : e.pageX, y : e.pageY };
    }
    var scrollElem = (document.compatMode && document.compatMode!="BackCompat")?
        document.documentElement : document.body;   
    return { x: e.clientX + scrollElem.scrollLeft, y: e.clientY + scrollElem.scrollTop };
}
function $(id){
    return document.getElementById(id);
}

var hday_divs = [];
function FloatDiv(parentElement){
    parentElement = parentElement || document.body;
    FloatDiv.$$nextid = FloatDiv.$$nextid || 1;
    if(!FloatDiv.divs)FloatDiv.divs=[];
    this.pointer = {xm:0, xo:0, ym:0, yo:0};

    var formal = '<div class="t"><div class="tp"></div></div><div class="lt"></div><div class="rt"></div><div class="l"></div><div class="r"></div><div class="lb"></div><div class="rb"></div><div class="b"></div>';
    var divscontainer = $("floatdivs");
    if(!divscontainer){
        var divscontainer = document.createElement("div");
        divscontainer.id="floatdivs";
        divscontainer.style.height=0;
        parentElement.appendChild(divscontainer);
    }
    var c_div = this.div = document.createElement("div");
    FloatDiv.divs.push(c_div);
    c_div.id = "_float_div_" + (FloatDiv.$$nextid++);
    c_div.className = "box-dea";
    c_div.innerHTML = formal;
    c_div.content = document.createElement("div");
    c_div.content.className = "content";
    c_div.appendChild(c_div.content);
    divscontainer.appendChild(c_div);
    /*
    document.onmousemove = function(e){
        e = e || window.event;
        var pos = mousePosition(e);
        document.title = pos.x + "," + pos.y;
        $("followbox").style.left = pos.x - 100 + "px";
        $("followbox").style.top = pos.y + 32 + "px";
    }
    */
}
FloatDiv.clear = function(){
    FloatDiv.divs = [];
    if($("floatdivs")) $("floatdivs").innerHTML="";
}
FloatDiv.MAX_SIZE={width:360, height:640};
FloatDiv.prototype.setText = function(text, explain){
    if(this.div.content.innerText === undefined || explain)
        this.div.content.innerHTML = text;
    else
        this.div.content.innerText = text;
    if(this.div.content.getElementsByTagName("strong").length > 0){
        for(var tsp = this.div.content.firstChild; tsp; tsp = tsp.nextSibling){
            if(tsp.nodeType==1 && tsp.tagName.toLowerCase() == "span"){
                tsp.style.textAlign = "left";
            }
        }
    }
    /*this.div.content.title = text;*/
    return this;/*noti:to continous setting*/
}
FloatDiv.prototype.getText = function(explain){
    if(explain)
        return this.div.content.innerHTML;
    else
        return this.div.content.innerText;
}
FloatDiv.prototype.setHeight = function(height){
    if(height) height += "px";
    this.lastSetHeight = height;
    this.div.style.height = height;
    this.div.content.style.lineHeight = height;
    if(app.browser.isie6){
        var ctts = this.div.getElementsByTagName("div");
        for(var ci = 0; ci < ctts.length; ci++){
            if(ctts[ci].className == "l" || ctts[ci].className == "r"){
                ctts[ci].style.height = height;
            }
        }
    }
    return this;
}
FloatDiv.prototype.getHeight = function(){
    return this.div.style.height.replace(/\D/g,"");
}
FloatDiv.prototype.setWidth = function(width){
    if(width) width += "px";
    this.lastSetWidth = width;
    this.div.style.width = width;
    return this;
}
FloatDiv.prototype.getWidth = function(){
    return this.div.style.width.replace(/\D/g,"");
}
FloatDiv.prototype.setOpacity = function(opacity/* 0~100 */){
    if(opacity < 0) opacity=0; else if(opacity > 100) opacity = 100;
    var elem = this.div;
    if (elem.filters) {
        elem.style.filter ="alpha(opacity="+ opacity +")";
    } else {
        elem.style.opacity = opacity / 100;
    }
    return this;
}
FloatDiv.prototype.getOpacity = function(){
    var elem = this.div;
    if(elem.filters){
        var t = elem.style.filter;
        t.match(/opacity=(\d+)/i);
        var ti = parseInt(RegExp.$1);
        if(isNaN(ti)){
            ti = 0;
        }
        return ti;
    }else{
        return Math.round(this.div.style.opacity * 100);
    }
}
function checkNaN(obj, name){
    if(isNaN(obj[name])) obj[name]=0;
}
/*
 * x/y : "23%+9" / "50%" / 8 / "8"
 */
FloatDiv.prototype.setPointer = function(x, y){
    var pointer = {xm:0, xo:0, ym:0, yo:0};
    if(x.indexOf("%")!=-1){
        var xs = x.split("%");
        pointer.xm = parseFloat(xs[0]);
        pointer.xo = parseInt(xs[1]);
    }else{
        pointer.xo = parseInt(x);
    }
    if(y.indexOf("%")!=-1){
        var ys = y.split("%");
        pointer.ym = parseFloat(ys[0]);
        pointer.yo = parseInt(ys[1]);
    }else{
        pointer.yo = parseInt(y);
    }
    checkNaN(pointer, "xm");
    checkNaN(pointer, "xo");
    checkNaN(pointer, "ym");
    checkNaN(pointer, "yo");
    this.pointer = pointer;
    this.refresh();
    return this;
}
FloatDiv.prototype.setPosition = function(t,r,b,l){
    if(this.position){
        if(this.position.t == t && this.position.r == r && this.position.b == b && this.position.l == l) return;
    }
    this.position = {t:t, r:r, b:b, l:l};
    this.refresh();
    return this;
}
FloatDiv.prototype.refresh = function(){
    var pointer = this.pointer;
    var pos = this.position || {t:0, l:0};
    var t = pos["t"], r = pos["r"], b = pos["b"], l = pos["l"];
    var w = this.div.offsetWidth;
    var h = this.div.offsetHeight;
    if(t!==null && t!==undefined){
        this.div.style.top = (t - (h * pointer["ym"] / 100 + pointer["yo"])).toString() + "px";
    }else{this.div.style.top = ""};
    if(r!==null && r!==undefined){
        this.div.style.right = (r + (w * (1-pointer["xm"] / 100) + pointer["xo"])).toString() + "px";
    }else{this.div.style.right = ""};
    if(b!==null && b!==undefined){
        this.div.style.bottom = (b + (h * (1-pointer["ym"] / 100) + pointer["yo"])).toString() + "px";
    }else{this.div.style.bottom = ""};
    if(l!==null && l!==undefined){
        this.div.style.left = (l - (w * pointer["xm"] / 100 + pointer["xo"])).toString() + "px";
    }else{this.div.style.left = ""};
    return this;
}
FloatDiv.prototype.eventMouseOver = function(callback){
    var args = [];
    for(var i=1; i<arguments.length; i++){
        args.push(arguments[i]);
    }
    var thisobj = this;
    function mouseoverEvent(e){
        args.unshift(e);
        if(callback) callback.apply(thisobj, args);
    }
    
    if(app.browser.isie){
        this.div.onmouseenter = mouseoverEvent;
    }else{
        this.div.onmouseover = mouseoverEvent;
    }
    return this;
}
FloatDiv.prototype.eventMouseOut = function(callback){
    var args = [];
    for(var i=1; i<arguments.length; i++){
        args.push(arguments[i]);
    }
    var thisobj = this;

    function mouseoutEvent(e){
        args.unshift(e);
        if(callback) callback.apply(thisobj, args);
    }

    if(app.browser.isie){
        this.div.onmouseleave = mouseoutEvent;
    }else{
        this.div.onmouseout = mouseoutEvent;
    }
    return this;
}
FloatDiv.prototype.deactive = function(){
    this.div.className = "box-dea";
    this.div.style.zIndex = "";
    return this;
}
FloatDiv.prototype.active = function(){
    var thisobj = this;
    this.div.style.zIndex = "99";
    this.div.className = "box";
    if(app.browser.isie6){
        this.div.content.onresize = function(){
            var ctts = thisobj.div.getElementsByTagName("div");
            for(var ci = 0; ci < ctts.length; ci++){
                if(ctts[ci].className == "l" || ctts[ci].className == "r"){
                    ctts[ci].style.height = this.scrollHeight + "px";
                }
            }
        }
    }
    return this;
}

FloatDiv.prototype.autoSize = function(){
    var thisobj = this;
    var w = this.div.offsetWidth;
    var wc = this.div.content.clientWidth;
    var h = this.div.offsetHeight;
    var hc = this.div.content.clientHeight;
    this.div.content.style.overflowX = "auto";
    if(this.div.content.style.textOverflow)this.div.content.style.textOverflow = "inherit";
    this.div.style.width = this.div.content.scrollWidth + (w - wc) + "px";
    this.div.style.height = /*this.div.content.scrollHeight + (h - hc) + "px"*/ "auto";
    this.refresh();
    return this;
}
FloatDiv.prototype.fixedSize = function(){
    this.div.onresize = null;
    this.div.content.style.overflowX = "";
    if(this.div.content.style.textOverflow) this.div.content.style.textOverflow = "";
    if(this.lastSetWidth) this.div.style.width = this.lastSetWidth;
    if(this.lastSetHeight) this.div.style.height = this.lastSetHeight;
    this.refresh();
    return this;
}
FloatDiv.prototype.bringToFront = function(){
    if(FloatDiv.lastTop) FloatDiv.lastTop.div.style.zIndex = "";
    FloatDiv.lastTop = this;
    this.div.style.zIndex = "999";
    return this;
}

