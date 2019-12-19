/*
 * ComboBox
 * By Jared Nuzzolillo
 *
 * Updated by Erik Arvidsson
 * /webfx.eae.net/contact.html#erik
 * 2002-06-13 Fixed Mozilla support and improved build performance
 *
 */

Global_run_event_hook = true;
Global_combo_array    = new Array();

function getParentByTagName(elem, tagname){
    for(var pe = elem; pe; pe = pe.parentNode){
        if(pe.nodeType!=1) continue;
        else{
            if(pe.tagName.toLowerCase() == tagname.toLowerCase()) return pe;
        }
    }
    return null;
}
function scrollIntoParentView(elem, parentElem, forceCenter){
    return ;
    parentElem = parentElem || elem.parentNode;
    var is_parent = false;
    var lpos = {x:0,y:0,h:0,w:0};
    for(var pe = elem; pe && pe.parentNode && pe!==window; pe = pe.parentNode) {
        //每次循环，我只把我指定的矩形(lpos)在父对象的矩形中显示出来，然后记录我的点在父对象的什么位置；
        if(parentElem == pe){
            is_parent = true;
            break;
        }

        pobj = {
            s:{l:pe.parentNode.scrollLeft, t:pe.parentNode.scrollTop, w:pe.parentNode.scrollWidth, h:pe.parentNode.scrollHeight},
            c:{w:pe.parentNode.clientWidth, h:pe.parentNode.clientHeight}
        };

        var psz = {w:pe.parentNode.clientWidth, h:pe.parentNode.clientHeight};
        var pscl = {t:pe.parentNode.scrollTop, l:pe.parentNode.scrollLeft, w:pe.parentNode.scrollWidth, h:pe.parentNode.scrollHeight};
        var pos = {x:pe.offsetLeft+lpos.x, y:pe.offsetTop+lpos.y, h:pe.offsetHeight, w:pe.offsetWidth};
        lpos = pos;
        if(pos.x < pscl.l){
            pe.parentNode.scrollLeft = pos.x;
        }else if(pos.x + pos.w > pscl.l + psz.w){
            pe.parentNode.scrollLeft = pos.x + pos.w - psz.w;
        }
        if(pos.y < pscl.t){
            pe.parentNode.scrollTop = pos.y;
        }else if(pos.y + pos.h > pscl.t + psz.h){
            pe.parentNode.scrollTop = pos.y + pos.h - psz.h;
        }
    }
    if(!is_parent) throw new Error("父节点输入错误");
}

var removeAt=function(arr, dx)
{ 
    if(isNaN(dx)||dx>arr.length){self.status='Array_remove:invalid request-'+dx;return false}
    for(var i=0,n=0;i<arr.length;i++)
    {  
        if(arr[i]!=arr[dx])
        {
            arr[n++]=arr[i]
        }
    }
    arr.length-=1
}

function ComboBox_make()
{
    var bt,nm;
    nm = this.name+"txt"; 
    
    this.txtview = document.createElement("span");
/*    this.txtview.type = "text";*/
    /*this.txtview.name = nm;*/
    this.txtview.id = nm;
    this.txtview.className = "combo-input";
    this.view_border.appendChild(this.txtview);
        
    this.valcon = document.createElement("span");
    this.valcon.className = "hidden";
    this.view_border.appendChild(this.valcon)
   
    var tmp = document.createElement("div");
    tmp.appendChild(document.createTextNode("▾"));/*&#9662;*/
    tmp.className = "combo-button";
    
    this.view_border.appendChild(tmp);
    tmp.onfocus = function () { this.blur(); };
    tmp.onclick = new Function ("", this.name + ".toggle()");
    this.txtview.onclick = new Function ("", this.name + ".toggle()");
}

function ComboBox_choose(realval,txtval)
{
    if(this.value == realval){
        return;
    }
    this.value         = realval;
    if(this.selectedSpan) this.selectedSpan.className = "combo-";
    if(this.valcon.innerText === undefined){
        var samstring = this.name+".view_border.childNodes[0].innerHTML='"+txtval+"'"
        this.valcon.innerHTML  = realval;
    }else{
        var samstring = this.name+".view_border.childNodes[0].innerText='"+txtval+"'"
        this.valcon.innerText  = realval;
    }
    window.setTimeout(samstring,1);
    if(this.opslist){
        var spans = this.opslist.getElementsByTagName("span");
        for(var i=0; i<spans.length; i++){
            if(realval == spans[i].getAttribute["value"]){
                this.selectedSpan = spans[i];
                spans[i].className="combo-checked";
            }
        }
    }
    if(this.onchange){this.onchange.apply(this);}
}

function isParentOf(who, ofwho){
    for(var t = ofwho.parentNode; t; t = t.parentNode){
        if(t == who) return true;
    }
    return false;
}
function ComboBox_mouseDown(e)
{
    var obj,len,el,i;
    el = e.target ? e.target : e.srcElement;
    while (el.nodeType != 1) el = el.parentNode;
    var elcl = el.className;
    if(elcl.indexOf("combo-")!=0 || ComboBox.last && !isParentOf(ComboBox.last, el))
    {
        len=Global_combo_array.length;
        for(i=0;i<len;i++)
        {
        
            curobj = Global_combo_array[i];
            
            if(curobj.opslist)
            {
                curobj.opslist.style.display='none';
            }
        }
    }
}

function ComboBox_handleKey(e)
{
    var key,obj,eobj,el,strname;
    eobj = e;
    key  = eobj.keyCode;
    el = e.target ? e.target : e.srcElement;
    while (el.nodeType != 1) el = el.parentNode;
    elcl = el.className;
    if(elcl.indexOf("combo-")==0)
    {
        if(elcl.split("-")[1]=="span")
        {
            strname = el.id.split("txt")[0]
            obj = window[strname];
   
            obj.expops.length=0;
            obj.update();
            obj.build(obj.expops);
            if(obj.expops.length==1&&obj.expops[0].text=="(No matches)"){}//empty
            else{obj.opslist.style.display='block';ComboBox.last=this.view;}
            if(obj.innerText === undefined){
                obj.innerHTML = el.innerHTML;
                obj.valcon.innerHTML = el.innerHTML;
            }else{
                obj.innerText = el.innerText;
                obj.valcon.innerText = el.innerText;
            }
        }
     }
}

function ComboBox_update()
{
    var opart,astr,alen,opln,i,boo;
    boo=false;
    opln = this.options.length
    if(this.txtview.innerText === undefined){
        astr = this.txtview.innerHTML.toLowerCase();
    }else{
        astr = this.txtview.innerText.toLowerCase();
    }
    alen = astr.length
    if(alen==0)
    {
        for(i=0;i<opln;i++)
        {
            this.expops[this.expops.length]=this.options[i];boo=true;
        }
    }
    else
    {
        for(i=0;i<opln;i++)
        {
            opart=this.options[i].text.toLowerCase().substring(0,alen);
            if(astr==opart)
            {
                this.expops[this.expops.length]=this.options[i];boo=true;
            }
        }
    }
    if(!boo){this.expops[0]=new ComboBoxItem("(No matches)","")}
}


function ComboBox_removeAll(){
    this.options.splice(0,this.options.length);
}
function ComboBox_remove(index)
{
    removeAt(this.options,index);
}

function ComboBox_add()
{
    var i,arglen;
    arglen=arguments.length;
    for(i=0;i<arglen;i++)
    {
        this.options[this.options.length]=arguments[i];
    }
}

function ComboBox_build(arr)
{
    var str,arrlen
    arrlen=arr.length;
    str = '<table class="combo-list-width" cellpadding=0 cellspacing=0>';
    var strs = new Array(arrlen);
    for(var i=0;i<arrlen;i++)
    {
        strs[i] = '<tr>' +
   '<td class="combo-item" onClick="'+this.name+'.choose(\''+arr[i].value+'\',\''+arr[i].text+'\');'+this.name+'.opslist.style.display=\'none\';"' +
   'onmouseover="this.className=\'combo-hilite\';" onmouseout="this.className=\'combo-item\'" value="' + arr[i].value + '"><span class="combo-">&nbsp;'+arr[i].text+'&nbsp;</span></td>' +
   '</tr>';
    }
    str = str + strs.join("") + '</table>'
    
    if(this.opslist){this.view.removeChild(this.opslist);}
    
    this.opslist = document.createElement("div")
    this.opslist.innerHTML=str;
    this.opslist.style.display='none';
    this.opslist.className = "combo-list";
    this.opslist.onselectstart=returnFalse;
    this.view.appendChild(this.opslist);
    var spans = this.opslist.getElementsByTagName("span");
    for(var i=0; i<spans.length; i++){
        if(arr[i].value == this.value){
            this.selectedSpan = spans[i];
            spans[i].className="combo-checked";
        }
    }
}

function ComboBox_toggle()
{
    if(this.opslist)
    {
        if(this.opslist.style.display=="block")
        {
            this.opslist.style.display="none";
        }
        else
        {
            this.update();
            this.build(this.options);
            this.view.style.zIndex = ++ComboBox.prototype.COMBOBOXZINDEX;
            this.opslist.style.display="block";
            ComboBox.last = this.view;
            /*
            if(this.selectedSpan){
                if(this.view.scrollIntoViewIfNeeded)
                    this.selectedSpan.scrollIntoViewIfNeeded();
                else{
                    this.selectedSpan.scrollIntoView();
                    //this.view.scrollTop = this.selectedSpan.parentNode.parentNode.offsetTop;
                }
            }
            */
            scrollIntoParentView(this.selectedSpan, getParentByTagName(this.selectedSpan, "table"));
        }
    }
    else
    {
        this.update();
        this.build(this.options);
        this.view.style.zIndex = ++ComboBox.prototype.COMBOBOXZINDEX;
        this.opslist.style.display="block";
        ComboBox.last = this.view;
        scrollIntoParentView(this.selectedSpan, getParentByTagName(this.selectedSpan, "table"));
        /*if(this.selectedSpan){
            if(this.view.scrollIntoViewIfNeeded)
                this.selectedSpan.scrollIntoViewIfNeeded();
            else{
                this.selectedSpan.scrollIntoView();
            }
        }*/
    }
}

function ComboBox()
{
    if(arguments.length==0)
    {
        self.status="ComboBox invalid - no name arg"
    }

    this.name     = arguments[0];
    this.par      = arguments[1]||document.body
    this.view     = document.createElement("div");
    this.view.style.position='relative';
    this.view.className = "combobox";
    this.view_border = document.createElement("div");
    this.view.appendChild(this.view_border);
    this.view_border.className = "combobox-show";
    this.options  = new Array();
    this.expops   = new Array();
    this.value    = ""

    this.build  = ComboBox_build
    this.make   = ComboBox_make;
    this.choose = ComboBox_choose;
    this.add    = ComboBox_add;
    this.toggle = ComboBox_toggle;
    this.update = ComboBox_update;
    this.remove = ComboBox_remove;
    this.clear  = ComboBox_removeAll;

    this.make();
    this.txtview = this.view_border.childNodes[0];
    this.valcon  = this.view_border.childNodes[1];
    
    this.par.appendChild(this.view);

    Global_combo_array[Global_combo_array.length]=this;
    if(Global_run_event_hook){ComboBox_init()}
}

ComboBox.prototype.COMBOBOXZINDEX = 1000; //change this if you must

function ComboBox_init() 
{
 if (document.addEventListener) {
  document.addEventListener("keyup", ComboBox_handleKey, false );
  document.addEventListener("mousedown", ComboBox_mouseDown, false );
 }
 else if (document.attachEvent) {
  document.attachEvent("onkeyup", function () { ComboBox_handleKey(window.event); } );
  document.attachEvent("onmousedown", function () { ComboBox_mouseDown(window.event); } );
 }
 
    Global_run_event_hook = false;
}

function returnFalse(){return false}

function ComboBoxItem(text,value)
{
    this.text  = text;
    this.value = value;
}

document.write('<link rel="stylesheet" type="text/css" href="css/combobox.css">')

