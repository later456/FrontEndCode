;(function(){
	var spot=function(url,spotName,spotDesc){
		var d=new Date(),
			year=d.getFullYear(),
			mon=d.getMonth()+1,
			day=d.getDate();
		year=addZero(year);
		mon=addZero(mon);
		day=addZero(day);
		var _date=year+'-'+mon+'-'+day;
		var data={
			"spotname":spotName,
			"spotdate":_date,
			"spotdesc":spotDesc
		}
		data=forIn(data);
		var xhr=new XMLHttpRequest();
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4 && xhr.status==200){
				console.log(xhr.responseText);
			}
		}
		xhr.open("POST",url+'spot.php',true);
		xhr.setRequestHeader("Content-type", 'application/x-www-form-urlencoded');
		console.log(data)
		xhr.send(data);
	}
	function addZero(n){
		n=Number(n);
		return n<10?'0'+n:n;
	}
	function forIn (obj) {
		var str='';
		var firstFlag=true;
		for(var k in obj){
			if(obj.hasOwnProperty(k)){
				if(firstFlag){
					str+=encodeURIComponent(k)+'='+encodeURIComponent(obj[k]);
					firstFlag=false;
				}else{
					str+='&'+encodeURIComponent(k)+'='+encodeURIComponent(obj[k]);
				}
			}
		}
		return str;
	}
	window.spot=spot;
})();
