function getStyle(el, style) {
    var value = el.style[toCamelCase(style)];

    if(!value) {
        if(document.defaultView) {
            value = document.defaultView.getComputedStyle(el, "").getPropertyValue(style);
        }
        else if(el.currentStyle) {
            value = el.currentStyle[toCamelCase(style)];
        }

    }
    return value;
}

function toCamelCase( sInput ) {
    var oStringList = sInput.split('-'),
        ret,
        i,
        s;
    if(oStringList.length === 1) { 
        return oStringList[0];
    }
    ret = sInput.indexOf("-") === 0 ?
        oStringList[0].charAt(0).toUpperCase() + oStringList[0].substring(1) : oStringList[0];
    for(i = 1, len = oStringList.length; i < len; i+=1){
        s = oStringList[i];
        ret += s.charAt(0).toUpperCase() + s.substring(1);
    }
    return ret;
}

function setStyle(obj, style, value) {
    obj.style[style] = value;
}

function hasClass(ele,cls) {
    return ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}
function addClass(ele,cls) {
    if (!this.hasClass(ele,cls)) {
        ele.className += " "+cls;
    }
}
function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className=ele.className.replace(reg,' ');
    }
}

function getUrlVars() {
    var vars = {};
        parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function getCookies(c_name) {
    var i,x,y,ARRcookies=document.cookie.split(";");
    for (i=0;i<ARRcookies.length;i+=1) {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        alert(x+"="+y);
    }
}

function formatDate(d) {
    return Ext.util.Format.date(d, 'd.m.y H:i');
}

function addSessionIdToParams(operations) {
    if (operations.getParams() !== null) {
        operations.getParams().sessionId = MyGlobals.sessionId;
    }
    else {
        operations.setParams(
            {
            sessionId: MyGlobals.sessionId
        }
        );
    }
}
