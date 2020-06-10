/**
 * 判断是不是自己的域名
 * @param domain 要进行判断的域名
 * @param my 自己的域名
 * @return 对比结果
 */
function isMyDomain(domain, my) {
    var reg = /^([^\?]*)/;
    var match = domain.match(reg);

    if(match) {
        domain = match[1];
    }
    
    domain = domain + "/";
    
    reg = /([\w-]*\.[\w-]*)\/.*/;
    match = domain.match(reg);
    
    if(match && (match[1] == my)) {
        return true;
    } else {
        return false;
    }
}

// url编码
function urlEncode(str) {
    return (encodeURIComponent(str).replace(/'/g,"%27").replace(/"/g,"%22"));
}


$("#url-form").submit(function(){
    var url = $("#url-input").val();
    
    var reg = /^((https?|ftp|news):\/\/)?([\w-]+\.)+[\w-]+(\.)?(:\d+)?(\/[\w- .\/?%&=#]*)?$/;
    if (!reg.test(url)) {
        $("#url-input").val('');
        $("#result").html("<span class='text-warning'>请输入正确的网址</span>");
        $("#web-scan").html("");
        return false;
    }
    
    // 获取输入的顶级域名
    var a = document.createElement('a'); 
    reg = /^((https?|ftp|news):\/\/)/;
    if (!reg.test(url)) {
        a.href = 'http://' + url; 
    } else {
        a.href = url; 
    }
    // console.log(a.host);
    
    // 孟坤博客
    if(isMyDomain(a.host, 'mkblog.cn')) {
        var tmpHtml = '<ul class="list-group text-center">' + 
                '<li class="list-group-item safe-result">' + 
                '<img src="//pc1.gtimg.com/pcmgr/online_server/images/webadmin/1.png">' + 
                '<span class="text-success">孟坤博客</span>' + 
                '</li>' + 
                '<li class="list-group-item">该网站为孟坤软件旗下站点，请放心访问！</li>' + 
                '</ul>';
        $("#result").html(tmpHtml);
        return false;
    }
    
    // 斗图终结者
    if(isMyDomain(a.host, '52doutu.cn')) {
        var tmpHtml = '<ul class="list-group text-center">' + 
                '<li class="list-group-item safe-result">' + 
                '<img src="//pc1.gtimg.com/pcmgr/online_server/images/webadmin/1.png">' + 
                '<span class="text-success">斗图终结者</span>' + 
                '</li>' + 
                '<li class="list-group-item">该网站为斗图终结者官网，请放心访问！</li>' + 
                '</ul>';
        $("#result").html(tmpHtml);
        return false;
    }
    
    url = urlEncode(url);
    
    $("#result").html("备案信息查询中");
    // 获取网站基础信息
    $.ajax({
        type: "GET", 
        url: "", 
        data: "types=qq&url=" + url,
        dataType : "jsonp",
        success: function(jsonData){
            var tmpHtml;
            if(jsonData.reCode === 0) {
                tmpHtml = '<ul class="list-group text-left">' + 
                '<li class="list-group-item text-center safe-result">';
                switch(jsonData.data.results.whitetype) {
                    case 1:
                        tmpHtml += '<img src="//pc1.gtimg.com/pcmgr/online_server/images/webadmin/6.png">' + 
                        '<span class="text-muted">网站安全情况未知</span>';
                        break;
                        
                    case 2:
                        tmpHtml += '<img src="//pc1.gtimg.com/pcmgr/online_server/images/webadmin/3.png">' + 
                        '<span class="text-danger">网站存在风险</span></li>' + 
                        '<li class="list-group-item">危险原因：' + jsonData.data.results.WordingTitle + '</li>' + 
                        '<li class="list-group-item">危险描述：' + jsonData.data.results.Wording + '</li>';
                        
                        if (jsonData.data.results.detect_time !== "") {
                            var d = new Date();
                            var t = jsonData.data.results.detect_time * 1000;
                            d.setTime(t);
                            var m = d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
                            var dd = d.getDate() > 9 ? d.getDate() : "0" + d.getDate();
                            var h = d.getHours() > 9 ? d.getHours() : "0" + d.getHours();
                            var i = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
                            var s = d.getSeconds() > 9 ? d.getSeconds() : "0" + d.getSeconds();
                            tmpHtml += '<li class="list-group-item">检出时间：' + d.getFullYear() + "-" + m + "-" + dd + " " + h + ":" + i + ":" + s + '</li>';
                        }
                        break;
                        
                    case 3:
                        tmpHtml += '<img src="//pc1.gtimg.com/pcmgr/online_server/images/webadmin/1.png">' + 
                        '<span class="text-success">安全网站</span>';
                        break;
                        
                    case 4:
                        tmpHtml += '<img src="//pc1.gtimg.com/pcmgr/online_server/images/webadmin/1.png">' + 
                        '<span class="text-success">腾讯官方网站</span>';
                        break;
                    
                    case 13:
                        tmpHtml += '<img src="//pc1.gtimg.com/pcmgr/online_server/images/webadmin/2.png">' + 
                        '<span class="text-warning">可信度低</span>';
                        break;
                        
                    case 2001:
                        tmpHtml += '<img src="//pc1.gtimg.com/pcmgr/online_server/images/webadmin/48_money.png">' + 
                        '<span class="text-warning">可能涉及钱财，交易需谨慎</span>';
                        break;
                        
                    default:
                        tmpHtml += '<img src="//pc1.gtimg.com/pcmgr/online_server/images/webadmin/6.png">' + 
                        '<span class="text-muted">网站安全情况未知</span>';
                }
                tmpHtml += '</li>';
                
                if (jsonData.data.results.isDomainICPOk) {    // 已备案
                    tmpHtml += '<li class="list-group-item">备&nbsp;&nbsp;案&nbsp;&nbsp;号：' + jsonData.data.results.ICPSerial + '</li>';
                    tmpHtml += '<li class="list-group-item">主&nbsp;&nbsp;办&nbsp;&nbsp;方：' + jsonData.data.results.Orgnization + '</li>';
                } else {
                    tmpHtml += '<li class="list-group-item">备案信息：未备案</li>';
                }
                
                tmpHtml += '</ul>';
            } else {
                $("#url-input").val('');
                tmpHtml = "<span class='text-warning'>" + jsonData.data + "</span>";
            }
            $("#result").html(tmpHtml);
        }   //success   
    });//ajax
    
    $("#web-scan").html('<p class="text-center"><img src="https://tva1.sinaimg.cn/large/a15b4afegy1fisl7i7xt0g202p02uglp.gif" title="正在扫描网站漏洞信息，请稍后"><br>漏洞信息扫描中</p>');
    
    // url = url.replace("https://", "");
    // url = url.replace("http://", "");
    url = a.host;
    // url = url + "/"
    
    // reg = /([\w-]*\.[\w-]*)\/.*/;
    // match = url.match(reg);
    
    // if(match) {
    //     url = match[1];
    // } else {
    //     return false;
    // }
    
    // 获取网站漏洞扫描信息
    $.ajax({
        type: "GET", 
        url: "", 
        data: "types=webscan&url=" + url,
        dataType : "jsonp",
        success: function(jsonData){
            var tmpHtml;
            if(jsonData.resultcode == 200) {
                tmpHtml = '<ul class="list-group text-left">' + 
                          '<li class="list-group-item text-center"><span style="font-size: 40px">' + jsonData.result.data.score.score + '</span> 分<br>' +
                          jsonData.result.data.score.msg + '</li>' + 
                          '<li class="list-group-item">更新时间：' + jsonData.result.scantime + '</li>' + 
                          '<li class="list-group-item">安全等级：' + jsonData.result.msg + '</li>' + 
                          '<li class="list-group-item">网站漏洞：' + 
                                '<a href="http://webscan.360.cn/index/checkwebsite?url=' + url + '" target="_blank" title="点击查看详情">' + 
                                '<span class="text-danger">高危漏洞 - ' + jsonData.result.data.loudong.high +  ' </span>、' +  
                                '<span class="text-warning">严重漏洞 - ' + jsonData.result.data.loudong.mid +  ' </span>、' + 
                                '<span class="text-muted">警告漏洞 - ' + jsonData.result.data.loudong.low +  ' </span>、' + 
                                '<span class="text-info">轻微漏洞 - ' + jsonData.result.data.loudong.info +  ' </span>' + 
                                '</a>' + 
                          '</li>' + 
                          '<li class="list-group-item">挂马情况：' + jsonData.result.data.guama.msg + '</li>' + 
                          '<li class="list-group-item">欺诈信息：' + jsonData.result.data.xujia.msg + '</li>' + 
                          '<li class="list-group-item">是否篡改：' + jsonData.result.data.cuangai.msg + '</li>' + 
                          '<li class="list-group-item">谷歌屏蔽：' + jsonData.result.data.google.msg + '</li>' + 
                '</ul>';
            } else {
                tmpHtml = "<span class='text-warning'>安全检测出错 - " + jsonData.reason + "</span>";
            }
            $("#web-scan").html(tmpHtml);
        }   //success   
    });//ajax
    
    return false;
});