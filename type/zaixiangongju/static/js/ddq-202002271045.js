/**
 * static.cms - v1.0.0  License By 
 * WEB小组  
 */
var time_tab=function(e){if(!$(".release-time-main ul").hasClass("tab_scroll")){$(".release-time-main ul").addClass("tab_scroll");var a,s=parseInt($(".release-time-main ul").css("left")),i=$(".release-time-main ul").width(),t=$(".release-time-main ul li").eq(0).width();if(!(s<2*t&&e>0||s>3*t-i&&e<0))return $(".release-time-main ul").removeClass("tab_scroll"),!1;var l=$(".release-time-main ul li.cur").index();"即将开始"==$(".release-time-main ul li").eq(l-e).find("p").text()?($(".ddq_text_buy").addClass("hide"),$(".ddq_text_next").removeClass("hide")):($(".ddq_text_next").addClass("hide"),$(".ddq_text_buy").removeClass("hide")),$(".release-time-main ul li").removeClass("cur"),$(".release-time-main ul li").eq(l-e).addClass("cur"),fillContent($(".release-time-main ul li.cur").data("type")),a=s+e*t+"px",$(".release-time-main ul").css("left",a),setTimeout(function(){$(".release-time-main ul").removeClass("tab_scroll")},200),$("body,html").animate({scrollTop:$(".sf_wrap .main").offset().top-75},200)}};$(".paly-btn").on("click",function(){time_tab($(this).data("r"))}),$(".section_item").on("click",function(){if(!$(this).parents("li").hasClass("cur")){var e=$(this).parents("li").index(),a=$(".release-time-main ul li.cur").index();time_tab(a-e)}}),$(window).scroll(function(){var e=$(window).scrollTop(),a=$(".main").offset().top-$(".release-time").height()-parseInt($(".release-time").css("margin-bottom"));e>=a?$(".sf_wrap").addClass("fixed"):$(".sf_wrap").removeClass("fixed")});var ddqPriceGen=function(e){var a=!!(e.market_group&&e.market_group.split(",").indexOf("6")>-1);return a?accSub(accSub(e.yuanjia,e.hz_quan_over),e.quan_jine):e.huodong_type<4?parseFloat((e.yuanjia-e.quan_jine).toFixed(2)):parseFloat(e.jiage)},fillContent=function(e){MtaH5.pgv(),MtaH5.clickStat("showpage",{uid:$cmsApi.getMtaCookie(),time:((new Date).getHours()<10?"0"+(new Date).getHours():(new Date).getHours())+":"+((new Date).getMinutes()<10?"0"+(new Date).getMinutes():(new Date).getMinutes()),name:"咚咚抢",siteid:standId,domainid:window.location.hostname.replace("www.","")}),$(".release-list").addClass("filling"),$(".ddq_loadding").removeClass("hide"),$(".release-list ul").html("");var a=dataDef[e];setTimeout(function(){$(".ddq_loadding").addClass("hide"),void 0==a?$(".release_next img").removeClass("hide"):$(".release_next img").addClass("hide");for(var e=ActivityConfig?JSON.parse(ActivityConfig):{},s=0;s<a.length;s++){var i=s,t='<li><a href="'+goodsUrl+a[i].id+'" target="_blank">',l=(a[i].market_group||"",configObjGen(a[i],e)),n=l.single_pc_label_switch||"0",o=l.long_label||"";if(2!=a[i].huodong_type&&3!=a[i].huodong_type||(t+='<div class="goods_hdtype goods_hdtype_zhe"></div>'),t+='<div class="goods_pic"><img src="'+a[i].pic+'_310x310.jpg" alt="">'+("1"===n?'<div class="tag_double-eleven"><img src="'+o+'" /><span>'+activityTagStr(a[i].quan_m_link,a[i].hz_quan_over)+"</span></div>"+redPocketGen(a[i],""):"")+"</div>",t+='<div class="goods_info"><div class="goods_tit_des"><h3>'+a[i].d_title+"</h3><p>"+(null!=a[i].new_words?a[i].new_words:"")+"</p></div>",t+='<div class="goods_price_coupon"><span class="goods_price"><b><i>￥</i>'+ddqPriceGen(a[i])+'</b>券后价</span><span class="goods_price_old">￥'+parseFloat(a[i].yuanjia)+'</span><div class="goods_coupon"><span class="c_l c_coupon"></span><span class="c_r c_coupon"></span>券 ￥'+parseFloat(a[i].quan_jine)+"</div></div>",new Date(a[i].paiqi)-new Date>newTimeDelay)var d="goods-soon",r="即将开始";else var d=0==a[i].quan_num?"goods-over":"",r=0==a[i].quan_num?"活动结束":"马上抢";new Date(a[i].quan_time)<new Date($today)&&a[i].quan_over>800&&(d="goods-over",r="活动结束"),t+='<div class="goods_gobuy_seller '+("goods-soon"==d?'goods_gobuy_seller_soon"':'"')+'><span class="goods_seller fl"><i></i><b>'+a[i].xiaoliang+"</b>人已抢</span>",t+='<span class="goods_buy_btn '+d+'">'+r+"</span></div></div>",t+="</a></li>",$(".release-list ul").append(t),i==a-1&&setTimeout(function(){$(".release-list").removeClass("filling")},200)}},200)};fillContent($(".release-time-main ul li.cur").data("type"));