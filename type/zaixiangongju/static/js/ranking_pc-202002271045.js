/**
 * static.cms - v1.0.0  License By 
 * WEB小组  
 */
$(function(){function a(a){var i=new RegExp("(^|&)"+a+"=([^&]*)(&|$)"),s=window.location.search.substr(1).match(i);return null!=s?unescape(s[2]):null}function i(a,i,s){var t=parseInt(a),n=i>1e4?(i-i%1e3)/1e4+"万":i;switch(s||(t+=3),t){case 6:return'<span class="num">近24小时预定 <span>'+n+"</span> 件</span>";case 5:return'<span class="num">近2小时预定 <span>'+n+"</span> 件</span>";case 7:return'<span class="num">热度值 <span>'+i+"</span></span>";case 8:return'<span class="num">近2小时疯抢 <span>'+n+"</span> 件</span>";case 9:return'<span class="num">近24小时疯抢 <span>'+n+"</span> 件</span>";case 10:return'<span class="num">热度值 <span>'+i+"</span></span>";default:return""}}function s(a,i){var s="",t="";return a?(s="到手",t="presell11"):(t="handpick11",i>0&&(s="券后")),[s,t]}var t=a("cid"),n=$("meta[name='api']").attr("content"),e="0"===activity_rank_type,l=$(".list-tab > a").length;if(l>3){var c=1200/l+"px";$(".list-tab > a").css({width:c})}var r=e?"/api/goods/rushing-ranking/goods-list2/v3":"/api/goods/rushing-ranking/no-goods-list2/v3";$.ajax({url:n+r,type:"GET",data:{type:type,cId:t||"0",market_id_db:market_id},success:function(a){if(0===a.code){var t=a.data;if(void 0===t||0===t.length)return $(".no-goods").show(),!1;for(var n="",l=ActivityConfig?JSON.parse(ActivityConfig):{},c=e?"https://img.alicdn.com/imgextra/i1/2053469401/O1CN01LqPxLk2JJhymrIhnU_!!2053469401.png":"https://img.alicdn.com/imgextra/i1/2053469401/O1CN01eOkqSo2JJhyhSpO73_!!2053469401.png",r=0;r<t.length;r++){var d=t[r],p=configObjGen(d,l),o=p.single_pc_label_switch||"0",u='<li class="'+(r<3?"top":"")+'"><div class="rank">'+(r>=3?r+1:"")+'</div><a href="'+(detail_bace_url+"&id="+d.id)+'" target="_blank"><div class="img-block"><img class="img" src="'+d.pic+'" width="100%"  alt="">'+("1"==o&&d.normalLabelText?'<div class="tag_double-eleven_list"><img src="'+c+'"/><div>'+d.normalLabelText+"</div></div>":"")+'</div><div class="cont"><p class="tit">'+d.dtitle+"</p>"+i(type,parseInt(d.salesNum),e)+'<div class="line-block" title="优惠券已领 '+d.quanOver+' 张"><div class="line" ><em data-width="'+(d.quanOver/(d.quanOver+d.quanNum)*100>100?100:d.quanOver/(d.quanOver+d.quanNum)*100)+'%"></em></div></div><div class="wrap"><div class="price fl"><b>'+s(e,d.quanJine)[0]+'</b> ¥ <span style="margin-right: 5px">'+d.jiage+'</span><i class="'+s(e,d.quanJine)[1]+'"><b>¥</b> '+d.yuanjia+'</i></div><div class="ico fr">'+(2==d.huodongType?'<i class="qiang tag_tit" data-id="tqg" data-title="此商品正在参加淘抢购"></i>':"")+(3==d.huodongType?'<i class="ju tag_tit" data-id="jhs" data-title="此商品正在参加聚划算"></i>':"")+(1==d.istmall?'<i class="tmall tag_tit" data-id="tm" data-title="天猫"></i>':"")+"</div></div></div></a></li>";n+=u}$(".goods-list").show(),$("#activityGoods").html(n),$(".line-block .line em").each(function(){$(this).width($(this).attr("data-width"))})}},error:function(a){}})});