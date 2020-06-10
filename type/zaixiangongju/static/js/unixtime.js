var unixTimer = 0;

// unix ʱ��ת����ʱ��
function unix2human() {
    var unixTimeValue = new Date(document.unix2beijing.timestamp.value * 1000);
    beijingTimeValue = unixTimeValue.toLocaleString();
	document.unix2beijing.result.value = beijingTimeValue;
}
// ����ʱ��ת unix
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

// ˢ��ʱ��
function currentTime() {
	var timeNow = new Date();
	document.getElementById("currentunixtime").innerHTML = Math.round(timeNow.getTime()/1000);
}

// �Զ�������ʾʱ��
function startTimer() {
	unixTimer = setInterval("currentTime()", 1000);
	currentTime();
}

// ֹͣ�Զ�����ʱ��
function stopTimer() {
	clearInterval(unixTimer);
}

// Ĭ�Ͽ���ˢ��ʱ��
startTimer();

// ʱ��������ֵΪ��ǰʱ��
var timeNow = new Date();
document.getElementById("firstTimestamp").value = Math.round(timeNow.getTime() / 1000);
