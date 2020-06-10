/**
 * static.cms - v1.0.0  License By 
 * WEB小组  
 */
!function(){"use strict";var e,t=function(){var e=/\-([a-z])/g,t=function(e,t){return t.toUpperCase()};return function(o){return o.replace(e,t)}}(),o=function(e,o){var n,i,r,s,a,l;if(window.getComputedStyle?n=window.getComputedStyle(e,null).getPropertyValue(o):(i=t(o),n=e.currentStyle?e.currentStyle[i]:e.style[i]),"cursor"===o&&(!n||"auto"===n))for(r=e.tagName.toLowerCase(),s=["a"],a=0,l=s.length;a<l;a++)if(r===s[a])return"pointer";return n},n=function(e){if(g.prototype._singleton){e||(e=window.event);var t;this!==window?t=this:e.target?t=e.target:e.srcElement&&(t=e.srcElement),g.prototype._singleton.setCurrent(t)}},i=function(e,t,o){e.addEventListener?e.addEventListener(t,o,!1):e.attachEvent&&e.attachEvent("on"+t,o)},r=function(e,t,o){e.removeEventListener?e.removeEventListener(t,o,!1):e.detachEvent&&e.detachEvent("on"+t,o)},s=function(e,t){if(e.addClass)return e.addClass(t),e;if(t&&"string"==typeof t){var o=(t||"").split(/\s+/);if(1===e.nodeType)if(e.className){for(var n=" "+e.className+" ",i=e.className,r=0,s=o.length;r<s;r++)n.indexOf(" "+o[r]+" ")<0&&(i+=" "+o[r]);e.className=i.replace(/^\s+|\s+$/g,"")}else e.className=t}return e},a=function(e,t){if(e.removeClass)return e.removeClass(t),e;if(t&&"string"==typeof t||void 0===t){var o=(t||"").split(/\s+/);if(1===e.nodeType&&e.className)if(t){for(var n=(" "+e.className+" ").replace(/[\n\t]/g," "),i=0,r=o.length;i<r;i++)n=n.replace(" "+o[i]+" "," ");e.className=n.replace(/^\s+|\s+$/g,"")}else e.className=""}return e},l=function(){var e,t,o,n=1;return"function"==typeof document.body.getBoundingClientRect&&(e=document.body.getBoundingClientRect(),t=e.right-e.left,o=document.body.offsetWidth,n=Math.round(t/o*100)/100),n},d=function(e){var t={left:0,top:0,width:0,height:0,zIndex:999999999},n=o(e,"z-index");if(n&&"auto"!==n&&(t.zIndex=parseInt(n,10)),e.getBoundingClientRect){var i,r,s,a=e.getBoundingClientRect();"pageXOffset"in window&&"pageYOffset"in window?(i=window.pageXOffset,r=window.pageYOffset):(s=l(),i=Math.round(document.documentElement.scrollLeft/s),r=Math.round(document.documentElement.scrollTop/s));var d=document.documentElement.clientLeft||0,p=document.documentElement.clientTop||0;t.left=a.left+i-d,t.top=a.top+r-p,t.width="width"in a?a.width:a.right-a.left,t.height="height"in a?a.height:a.bottom-a.top}return t},p=function(e,t){var o=!(t&&t.useNoCache===!1);return o?(e.indexOf("?")===-1?"?":"&")+"nocache="+(new Date).getTime():""},u=function(e){var t=[],o=[];return e.trustedOrigins&&("string"==typeof e.trustedOrigins?o=o.push(e.trustedOrigins):"object"==typeof e.trustedOrigins&&"length"in e.trustedOrigins&&(o=o.concat(e.trustedOrigins))),e.trustedDomains&&("string"==typeof e.trustedDomains?o=o.push(e.trustedDomains):"object"==typeof e.trustedDomains&&"length"in e.trustedDomains&&(o=o.concat(e.trustedDomains))),o.length&&t.push("trustedOrigins="+encodeURIComponent(o.join(","))),"string"==typeof e.amdModuleId&&e.amdModuleId&&t.push("amdModuleId="+encodeURIComponent(e.amdModuleId)),"string"==typeof e.cjsModuleId&&e.cjsModuleId&&t.push("cjsModuleId="+encodeURIComponent(e.cjsModuleId)),t.join("&")},c=function(e,t){if(t.indexOf)return t.indexOf(e);for(var o=0,n=t.length;o<n;o++)if(t[o]===e)return o;return-1},h=function(e){if("string"==typeof e)throw new TypeError("ZeroClipboard doesn't accept query strings.");return e.length?e:[e]},f=function(e,t,o,n,i){i?window.setTimeout(function(){e.call(t,o,n)},0):e.call(t,o,n)},g=function(e,t){if(e&&(g.prototype._singleton||this).glue(e),g.prototype._singleton)return g.prototype._singleton;g.prototype._singleton=this,this.options={};for(var o in y)this.options[o]=y[o];for(var n in t)this.options[n]=t[n];this.handlers={},g.detectFlashSupport()&&C()},m=[];g.prototype.setCurrent=function(t){e=t,this.reposition();var n=t.getAttribute("title");n&&this.setTitle(n);var i=this.options.forceHandCursor===!0||"pointer"===o(t,"cursor");v.call(this,i)},g.prototype.setText=function(e){e&&""!==e&&(this.options.text=e,this.ready()&&this.flashBridge.setText(e))},g.prototype.setTitle=function(e){e&&""!==e&&this.htmlBridge.setAttribute("title",e)},g.prototype.setSize=function(e,t){this.ready()&&this.flashBridge.setSize(e,t)},g.prototype.setHandCursor=function(e){e="boolean"==typeof e?e:!!e,v.call(this,e),this.options.forceHandCursor=e};var v=function(e){this.ready()&&this.flashBridge.setHandCursor(e)};g.version="1.2.0-beta.4";var y={moviePath:"ZeroClipboard.swf",trustedOrigins:null,text:null,hoverClass:"zeroclipboard-is-hover",activeClass:"zeroclipboard-is-active",allowScriptAccess:"sameDomain",useNoCache:!0,forceHandCursor:!1};g.setDefaults=function(e){for(var t in e)y[t]=e[t]},g.destroy=function(){g.prototype._singleton.unglue(m);var e=g.prototype._singleton.htmlBridge;e.parentNode.removeChild(e),delete g.prototype._singleton},g.detectFlashSupport=function(){var e=!1;if("function"==typeof ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(e=!0)}catch(t){}return!e&&navigator.mimeTypes["application/x-shockwave-flash"]&&(e=!0),e};var b=null,w=null,C=function(){var e=g.prototype._singleton,t=document.getElementById("global-zeroclipboard-html-bridge");if(!t){var o={};for(var n in e.options)o[n]=e.options[n];o.amdModuleId=b,o.cjsModuleId=w;var i=u(o),r='      <object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" id="global-zeroclipboard-flash-bridge" width="100%" height="100%">         <param name="movie" value="'+e.options.moviePath+p(e.options.moviePath,e.options)+'"/>         <param name="allowScriptAccess" value="'+e.options.allowScriptAccess+'"/>         <param name="scale" value="exactfit"/>         <param name="loop" value="false"/>         <param name="menu" value="false"/>         <param name="quality" value="best" />         <param name="bgcolor" value="#ffffff"/>         <param name="wmode" value="transparent"/>         <param name="flashvars" value="'+i+'"/>         <embed src="'+e.options.moviePath+p(e.options.moviePath,e.options)+'"           loop="false" menu="false"           quality="best" bgcolor="#ffffff"           width="100%" height="100%"           name="global-zeroclipboard-flash-bridge"           allowScriptAccess="always"           allowFullScreen="false"           type="application/x-shockwave-flash"           wmode="transparent"           pluginspage="http://www.macromedia.com/go/getflashplayer"           flashvars="'+i+'"           scale="exactfit">         </embed>       </object>';t=document.createElement("div"),t.id="global-zeroclipboard-html-bridge",t.setAttribute("class","global-zeroclipboard-container"),t.setAttribute("data-clipboard-ready",!1),t.style.position="absolute",t.style.left="-9999px",t.style.top="-9999px",t.style.width="15px",t.style.height="15px",t.style.zIndex="9999",t.innerHTML=r,document.body.appendChild(t)}e.htmlBridge=t,e.flashBridge=document["global-zeroclipboard-flash-bridge"]||t.children[0].lastElementChild};g.prototype.resetBridge=function(){this.htmlBridge.style.left="-9999px",this.htmlBridge.style.top="-9999px",this.htmlBridge.removeAttribute("title"),this.htmlBridge.removeAttribute("data-clipboard-text"),a(e,this.options.activeClass),e=null,this.options.text=null},g.prototype.ready=function(){var e=this.htmlBridge.getAttribute("data-clipboard-ready");return"true"===e||e===!0},g.prototype.reposition=function(){if(!e)return!1;var t=d(e);this.htmlBridge.style.top=t.top+"px",this.htmlBridge.style.left=t.left+"px",this.htmlBridge.style.width=t.width+"px",this.htmlBridge.style.height=t.height+"px",this.htmlBridge.style.zIndex=t.zIndex+1,this.setSize(t.width,t.height)},g.dispatch=function(e,t){g.prototype._singleton.receiveEvent(e,t)},g.prototype.on=function(e,t){for(var o=e.toString().split(/\s/g),n=0;n<o.length;n++)e=o[n].toLowerCase().replace(/^on/,""),this.handlers[e]||(this.handlers[e]=t);this.handlers.noflash&&!g.detectFlashSupport()&&this.receiveEvent("onNoFlash",null)},g.prototype.addEventListener=g.prototype.on,g.prototype.off=function(e,t){for(var o=e.toString().split(/\s/g),n=0;n<o.length;n++){e=o[n].toLowerCase().replace(/^on/,"");for(var i in this.handlers)i===e&&this.handlers[i]===t&&delete this.handlers[i]}},g.prototype.removeEventListener=g.prototype.off,g.prototype.receiveEvent=function(t,o){t=t.toString().toLowerCase().replace(/^on/,"");var n=e,i=!0;switch(t){case"load":if(o&&parseFloat(o.flashVersion.replace(",",".").replace(/[^0-9\.]/gi,""))<10)return void this.receiveEvent("onWrongFlash",{flashVersion:o.flashVersion});this.htmlBridge.setAttribute("data-clipboard-ready",!0);break;case"mouseover":s(n,this.options.hoverClass);break;case"mouseout":a(n,this.options.hoverClass),this.resetBridge();break;case"mousedown":s(n,this.options.activeClass);break;case"mouseup":a(n,this.options.activeClass);break;case"datarequested":var r=n.getAttribute("data-clipboard-target"),l=r?document.getElementById(r):null;if(l){var d=l.value||l.textContent||l.innerText;d&&this.setText(d)}else{var p=n.getAttribute("data-clipboard-text");p&&this.setText(p)}i=!1;break;case"complete":this.options.text=null}if(this.handlers[t]){var u=this.handlers[t];"string"==typeof u&&"function"==typeof window[u]&&(u=window[u]),"function"==typeof u&&f(u,n,this,o,i)}},g.prototype.glue=function(e){e=h(e);for(var t=0;t<e.length;t++)c(e[t],m)==-1&&(m.push(e[t]),i(e[t],"mouseover",n))},g.prototype.unglue=function(e){e=h(e);for(var t=0;t<e.length;t++){r(e[t],"mouseover",n);var o=c(e[t],m);o!=-1&&m.splice(o,1)}},"function"==typeof define&&define.amd?define(["require","exports","module"],function(e,t,o){return b=o&&o.id||null,g}):"undefined"!=typeof module&&module?(w=module.id||null,module.exports=g):window.ZeroClipboard=g}();