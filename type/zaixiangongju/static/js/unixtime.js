var unixTimer = 0;

// unix 时间转北京时间
function unix2human() {
    var unixTimeValue = new Date(document.unix2beijing.timestamp.value * 1000);
    beijingTimeValue = unixTimeValue.toLocaleString();
	document.unix2beijing.result.value = beijingTimeValue;
}
// 北京时间转 unix
function human2unix() {
    var humanDate = new Date(Date.UTC(document.beijing2unix.year.value, (stripLeadingZeroes(document.beijing2unix.month.value)-1), stripLeadingZeroes(document.beijing2unix.day.value), stripLeadingZeroes(document.beijing2unix.hour.value), stripLeadingZeroes(document.beijing2unix.minute.value), stripLeadingZeroes(document.beijing2unix.second.value)));
	document.beijing2unix.result.value = (humanDate.getTime()/1000 - 8*60*60);
}
function stripLeadingZeroes(input) {
    if((input.length > 1) && (input.substr(0,1) == "0")) {
		return input.substr(1);
	} else {
		return input;
	}
}

// 刷新时间
function currentTime() {
	var timeNow = new Date();
	document.getElementById("currentunixtime").innerHTML = Math.round(timeNow.getTime()/1000);
}

// 自动更新显示时间
function startTimer() {
	unixTimer = setInterval("currentTime()", 1000);
	currentTime();
}

// 停止自动更新时间
function stopTimer() {
	clearInterval(unixTimer);
}

// 默认开启刷新时间
startTimer();

// 时间戳输入框赋值为当前时间
var timeNow = new Date();
document.getElementById("firstTimestamp").value = Math.round(timeNow.getTime() / 1000);
