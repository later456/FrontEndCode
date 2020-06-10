function P(u, d, suc,err) {
	var x = null;
	if (window.ActiveXObject) {
		x = new ActiveXObject("Microsoft.XMLHTTP")
	} else {
		x = new XMLHttpRequest()
	}
	x.open("post", u, true);
	x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	x.onreadystatechange = function() {
		if (x.readyState == 4 && x.status == 200 && suc) {
			suc(x.responseText.replace(/<script.+?<\/script>/g,''));
		} else if (x.readyState == 4 && err) {
			err(x,x.status);
		}
	};
	x.send(d);
	return x;
};
function G(s) {
	return document.getElementById(s) ? document.getElementById(s) : {};
};
function J(s){
	var a;
	try{
		a=JSON.parse(s);
	}catch(e){
		try{
			a=eval('(function(){return '+s+';})()');
		}catch(e){
			a={};
		}
	}
	return a;
};
function T(s,c) {
	if(s*1!=s) return '';
	if(c){
		s=(s*1000-(new Date*1));
		return (s<0?'已过期':((s>259200000?(Math.floor(s/86400000)+'天'):(s>18000000?(Math.floor(s/3600000)+'小时'):(s>180000?(Math.floor(s/60000)+'分钟'):(s>1000?(Math.floor(s/1000)+'秒'):(s+'毫秒')))))+'后'));
	}else{
		s=new Date(s*1000);
		return s.getFullYear()+'年'+(s.getMonth()+1)+'月'+s.getDate()+'日 \n '+s.getHours()+':'+s.getMinutes()+':'+s.getSeconds()
	}
};
function H(s) {
	return (s+'').replace(/&/g,'&amp;').replace(/\"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
};
function A(s,c) {
	var a=G("result_alert")
	a.innerHTML = s.replace(/&nbsp;/g,' ');
	if(typeof c=="string" && a.className!=c) a.className = c;
	return true;
};
function S(d) {
	if(d&&d.panel&&d.panel.id&&d.panel.name){
		var a,b,i,t=[d],msg='<option value="">历史</option><option value="0">清空历史记录</option><option value="'+d.panel.id+'">'+H(d.panel.name)+'</option>';
		if(window.localStorage){
			try{
				a=JSON.parse(localStorage.userinfo);
			}catch(e){
				a=[];
			}
			for(i=0,b=a[0]?a[0]:{};b.panel&&b.panel.id;(b=a[++i]?a[i]:{})){
				if(i>20) break;
				if(d.panel.id==b.panel.id) continue;
				t[t.length]=b;
				msg+='<option value="'+b.panel.id+'">'+H(b.panel.name)+'</option>';
			}
			localStorage.userinfo=JSON.stringify(t);
			G('Tool_history').innerHTML=msg.replace(/&nbsp;/g,' ');
		}
		t=Math.floor(new Date/1000);
		msg = '<table width="100%"><tbody><tr><td colspan="2" rowspan="5" align="center"><img class="Tool_head" src="http://tb.himg.baidu.com/sys/portrait/item/'+d.panel.portrait+'"/></td><td>百度id：</td><td>'+d.panel.id+'</td></tr>';
		msg += '<tr><td>用户名：</td><td>'+'<a data-field="{&quot;un&quot;:&quot;'+H(d.panel.name)+'&quot;}" class="j_user_card" href="http://tieba.baidu.com/home/main/?un='+encodeURIComponent(d.panel.name)+'&amp;ie=utf-8&amp;fr=frs" target="_blank">'+H(d.panel.name)+'</a>'+'</td></tr>';
		msg += '<tr><td>覆盖名：</td><td>'+H(d.panel.name!=d.panel.name_show?d.panel.name_show:'无')+'</td></tr>';
		msg += '<tr><td>吧　龄：</td><td>'+d.panel.tb_age+'年</td></tr>';
		msg += '<tr><td>性　别：</td><td>'+(d.user&&d.user.sex?(d.user.sex==1?'男':(d.user.sex==2?'女':(d.user.sex==0?'无':'查不到'))):(d.panel.sex=='male'?'男':(d.panel.sex=='female'?'女':'未知')))+'</td></tr>';
		msg += '<tr><td>关注数：</td><td>'+(d.user&&d.user.concern_num?d.user.concern_num:'查不到！')+'</td><td>结婚对象：</td><td>'+(d.panel.marriage.user_name?('<a data-field="{&quot;un&quot;:&quot;'+H(d.panel.marriage.user_name)+'&quot;}" class="j_user_card" href="http://tieba.baidu.com/home/main/?un='+encodeURIComponent(d.panel.marriage.user_name)+'&amp;ie=utf-8&amp;fr=frs" target="_blank">'+H(d.panel.marriage.user_name)+'</a>'+(d.panel.marriage.status==2?'(已离婚)':'')):'无')+'</td></tr>';
		msg += '<tr><td>粉丝数：</td><td>'+(d.user&&d.user.fans_num?d.user.fans_num:'查不到！')+'</td><td>结婚日期：</td><td>'+T(d.panel.marriage.time).replace(/\n/g,'<br class="visible"/>')+'</td></tr>';
		msg += '<tr><td>主题数：</td><td>'+(d.user&&d.user.thread_num?d.user.thread_num:'查不到！')+'</td><td>回贴数：</td><td>'+(d.user&&d.user.repost_num?d.user.repost_num:'查不到！')+'</td></tr>';
		msg += '<tr><td>贴吧数：</td><td>'+(d.user&&d.user.my_like_num?d.user.my_like_num:'查不到！')+'</td><td>总贴量：</td><td>'+(d.user?d.user.post_num:d.panel.post_num)+'</td></tr>';
		msg += '<tr><td>礼物数：</td><td>'+(d.user&&d.user.gift_num?d.user.gift_num:'查不到！')+'</td><td>T 豆数：</td><td>'+(d.user&&d.user.parr_scores?('(<b class="blue" title="电脑或者安卓上的T豆">'+(d.user.parr_scores.scores_total>0?d.user.parr_scores.scores_total:0)+'</b>)'+'(<b class="red" title="斗地主上存的T豆">'+(d.user.parr_scores.scores_fetch>0?d.user.parr_scores.scores_fetch:0)+'</b>)(<b class="green" title="ios客户端上的T豆">'+(d.user.parr_scores.i_total>0?d.user.parr_scores.i_total:0)+'</b>)'):'查不到！')+'</td></tr>';
		msg += '<tr><td>群组数：</td><td>'+(d.info&&d.info.groupnum?d.info.groupnum:'查不到！')+'</td><td>徽　章：</td><td>'+(function(l){var i,t='',d=(new Date*1);if(l)for(i in l) if(l[i]&&l[i].value>0&&l[i].end_time*1000>d && l[i].category_id && l[i].sprite && l[i].sprite[l[i].value] && l[i]['level_'+l[i].value]){var b=l[i]['level_'+l[i].value];if(b.level_info){l[i].title=b.level_info.title;l[i].intro=b.level_info.intro;};b=l[i].sprite[l[i].value].split(',');if(b[1]) t+='<a data-field="'+JSON.stringify(l[i]).replace(/\"/g,'&quot;')+'" class="icon_tbworld" title="'+l[i].title+'\n'+l[i].intro+(l[i].end_time?('\n过期时间：'+T(l[i].end_time)+' ('+T(l[i].end_time,1)+')'):'')+'" style="background: url(http://tb1.bdstatic.com/tb/cms/com/icon/'+l[i].category_id+'_14.png?stamp='+b[0]+') no-repeat -'+(b[1]*50)+'px 0px;"> </a>'+(i==4?'<br class="visible" />':'');};return t})(d.panel.new_iconinfo)+'</td></tr>';
		if(d.panel.mParr_props&&(d.panel.mParr_props.all_level||d.panel.mParr_props.forum_member)) {
			msg += '<tr><td colspan="4" align="center" bgcolor="#FBB">Ta的会员</td></tr><tr><td colspan="2" align="center" bgcolor="#FBB">会员类型</td><td colspan="2" align="center" bgcolor="#FBB">过期时间</td></tr>';
			if(d.panel.mParr_props.all_level&&d.panel.mParr_props.all_level[1]) msg += '<tr title="贴吧会员"><td colspan="2"><a class="icon_tbworld icon-vip1'+(d.panel.mParr_props.all_level[1].end_time>t?'':'-gray')+'-16"></a>普通会员</td><td colspan="2">'+T(d.panel.mParr_props.all_level[1].end_time).replace(/\n/g,'<br class="visible"/>')+' ('+T(d.panel.mParr_props.all_level[1].end_time,1)+')</td></tr>';
			if(d.panel.mParr_props.all_level&&d.panel.mParr_props.all_level[2]) msg += '<tr title="高级会员"><td colspan="2"><a class="icon_tbworld icon-'+(d.panel.mParr_props.all_level[2].end_time>t?(d.panel.vipInfo&&d.panel.vipInfo.v_level?((d.panel.vipInfo&&d.panel.vipInfo.v_status==3?'crown-year':'crown-super')+'-v'+d.panel.vipInfo.v_level):"vip2-16"):(d.panel.vipInfo&&d.panel.vipInfo.v_level?('crown-super-non'+d.panel.vipInfo.v_level):"vip2-gray-16"))+'"></a>高级会员</td><td colspan="2">'+T(d.panel.mParr_props.all_level[2].end_time).replace(/\n/g,'<br class="visible"/>')+' ('+T(d.panel.mParr_props.all_level[2].end_time,1)+')</td></tr>';
			if(d.panel.mParr_props.forum_member) for(var i in d.panel.mParr_props.forum_member){ msg += '<tr title="单吧会员"><td colspan="2"><a class="icon_tbworld icon-vip3'+(d.panel.mParr_props.forum_member[i].end_time>t?'':'-gray')+'-16"></a><a href="http://tieba.baidu.com/f?ie=utf-8&amp;kw='+encodeURIComponent(d.panel.mParr_props.forum_member[i].forum_name)+'" target="_blank">'+H(d.panel.mParr_props.forum_member[i].forum_name.substring(0,10))+'</a></td><td colspan="2">'+T(d.panel.mParr_props.forum_member[i].end_time).replace(/\n/g,'<br class="visible"/>')+' ('+T(d.panel.mParr_props.forum_member[i].end_time,1)+')</td></tr>';};
		}
		if(d.user&&d.user.intro) msg += '<tr><td colspan="4" align="center" bgcolor="#BAF">Ta的简介</td></tr><tr><td colspan="4">'+H(d.user.intro)+'</td></tr>';
		msg += '</tbody></table>';
		G("result_show").innerHTML=msg.replace(/&nbsp;/g,' ');
		return true;
	}else{return false;}
};
var run=0;
function C(s) {
	if(run) return A('努力查询中……');
	run=1;
	A('查询中……');
	var un=G("Tool_un").value.replace(/^\s+|\s+$/g,'');
	if(!un || un.match(/\s/)) return A('输入错误！','red');
	run=P('index.php','username='+encodeURIComponent(un)+'&type=json',function(s){
		run=0;
		s=J(s);
		if(s.no==0){
			A((s.msg?s.msg:'查询完毕！'),'green');
			S(s);
		}else{
			A((s.msg?s.msg:'无返回数据！'),'red')
		}
	},function(s){
		run=0;
		A('网络错误！','red');
	});
};
window.onload=function(){
	if(window.localStorage){
		var a,b,i,msg='<option value="">历史</option><option value="0">清空历史记录</option>';
		try{
			a=JSON.parse(localStorage.userinfo);
		}catch(e){
			a=[];
		}
		for(i=0,b=(a[0]?a[0]:{});b.panel&&b.panel.id&&b.panel.name;(b=a[++i]?a[i]:{})){
			msg+='<option value="'+b.panel.id+'">'+H(b.panel.name)+'</option>';
		}
		G('Tool_history').innerHTML=msg;
	}
	G('Tool_history').onchange=function(){
		var a,b=0,t;
		try{
			a=JSON.parse(localStorage.userinfo);
		}catch(e){
			a=[];
		}
		if(this.value=='0'){
			a=confirm('是否清空历史记录！！！');
			if(a){
				localStorage.userinfo='[]';
				G('Tool_history').innerHTML='<option value="">历史</option><option value="0">清空历史记录</option>';
			}
		}else if(this.value){
			for(var i=0;i<a.length;i++){
				if(a[i].panel.id==this.value) b=a[i];
			}
			if(b) S(b);
		}else{
			
		}
	}
	if(tmp&&tmp.no==0) S(tmp);
}