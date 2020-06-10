;(function(){

	
function App(){
	this.gameData=[];
	this.init();
	this.bind();
}
App.prototype={
	constructor:App,
	init:function(){
		//获取相关元素
		this.timeBox=this.$("#time");//时间计时
		this.steps=this.$("#steps");//鼠标点击次数
		this.difficultyBtns=this.$("#difficultyBtns");//难度选择系列按钮
		this.difficultyBtnsItems=this.difficultyBtns.querySelectorAll(".difficultyBtn");
		this.controlBtns=this.$("#controlBtns");//控制系列按钮
		this.playEle=this.$("#play");
		this.app=this.$("#app");//游戏格子
		this.resultBox=this.$("#resultBox");//游戏结果
		//一些数据
		this.difficultType="normal";//游戏难度
		this.gameData=[];//游戏数据矩阵
		this.mixData=[];//随机数组辅助矩阵
		this.userData=[];//用户实际的答案矩阵，和正确答案对比后给出结果
		this.clickNum=0;//鼠标点击次数
		this.playIng=false;//当前是否正在进行游戏中
		this.time=0;//计时的时间
		this.timer=null;//计时的定时器
		this.isGameOver=false;//是否已经点了确认完成按钮了
		//先显示一个空棋盘
		this.render(this.initData());
		//提示区
		this.renderResult(4);
	},
	//绑定事件
	bind:function(){
		var that=this;
		//难度选择按钮点击
		this.difficultyBtns.addEventListener("click",function(e){
			var _id=e.target.id;
			switch (_id){
				case "easy":
					spot('../wlmtplus/spot/',pageNames,'简单难度按钮点击');
					that.difficultType="easy";
					that.clearDifficultBtnLighter(0);
					break;
				case "normal":
					spot('../wlmtplus/spot/',pageNames,'普通难度按钮点击');
					that.difficultType="normal";
					that.clearDifficultBtnLighter(1);
					break;
				case "hard":
					spot('../wlmtplus/spot/',pageNames,'很难难度按钮点击');
					that.difficultType="hard";
					that.clearDifficultBtnLighter(2);
					break;
				default:
					break;
			}
		});
		//控制按钮点击
		this.controlBtns.addEventListener("click",function(e){
			var _id=e.target.id;
			switch (_id){
				case "check":
					spot('../wlmtplus/spot/',pageNames,'确认完成按钮点击');
					that.check();
					break;
				case "play":
					spot('../wlmtplus/spot/',pageNames,'开始游戏按钮点击');
					that.play();
					break;
				case "stop":
					spot('../wlmtplus/spot/',pageNames,'停止游戏按钮点击');
					that.stop();
					break;
				case "see":
					spot('../wlmtplus/spot/',pageNames,'查看答案按钮点击');
					that.see();
					break;
				default:
					break;
			}
		});
		//游戏区域点击计数父级代理点击事件
		this.app.addEventListener("click",function(e){
			if(that.playIng && e.target && e.target.classList.contains("edit")){
				that.clickNum++;
				that.renderSteps(that.clickNum);
			}
		});
	},
	//检查游戏结果是否正确
	check:function(){
		if(!this.playIng || this.isGameOver){
			return;
		}
		this._stop();
		var items=this.app.querySelectorAll("span");
		var _gameData=[];
		var _editNums=0;//总共需要填的数量
		var _wrongNums=0;//错误数量
		var _res=true;//成功
		//取出正确答案
		for(var i=0;i<this.gameData.length;i++){
			for(var j=0;j<this.gameData[i].length;j++){
				_gameData.push(this.gameData[i][j]);
			}
		}
		//进行比对
		for(var i=0;i<items.length;i++){
			if(items[i].classList.contains("edit")){
				_editNums++;
				if(!items[i].innerHTML.trim() || items[i].innerHTML!=_gameData[i]){//不对
					_res=false;
					_wrongNums++;
					items[i].innerHTML="<i>"+items[i].innerHTML+"</i><em>"+_gameData[i]+"</em>"
				}else{//对
					items[i].innerHTML="<b>"+_gameData[i]+"</b>";
				}
			}
		}
		if(_res){
			this.renderResult(1);//提示区
		}else{
			this.renderResult(2,_wrongNums,_editNums);//提示区
		}
	},
	//开始游戏
	play:function(){
		this.playIng=true;
		this.isGameOver=false;
		this.playEle.innerHTML="重新开始";
		this.renderResult(3);//提示区
		this.clickNum=0;
		this.renderSteps(0);//鼠标点击数
		this.stopTime();//停止计时
		this.startTime();//开始计时
		this.createAGameData();//生成新游戏数据
	},
	//停止游戏
	stop:function(){
		this._stop();
		this.render(this.initData());
	},
	_stop:function(){
		this.playIng=false;
		this.isGameOver=true;
		this.playEle.innerHTML="开始游戏";
		this.renderResult(4);//提示区
		this.clickNum=0;
		this.renderSteps(0);
		this.stopTime();
	},
	//查看答案
	see:function(){
		if(!this.playIng || this.isGameOver){
			return;
		}
		this._stop();
		var items=this.app.querySelectorAll("span");
		var _gameData=[];
		//取出正确答案
		for(var i=0;i<this.gameData.length;i++){
			for(var j=0;j<this.gameData[i].length;j++){
				_gameData.push(this.gameData[i][j]);
			}
		}
		//进行比对
		for(var i=0;i<items.length;i++){
			if(items[i].classList.contains("edit")){
				items[i].innerHTML="<strong>"+_gameData[i]+"</strong>";
			}
		}
		this.renderResult(4);//提示区
	},
	//开始计时
	startTime:function(){
		var that=this;
		this.time=0;
		clearInterval(this.timer);
		this.timer=setInterval(function(){
			that.time++;
			that.renderTime();
		},1000);
	},
	//停止计时
	stopTime:function(){
		this.time=0;
		this.renderTime();
		clearInterval(this.timer);
	},
	//显示游戏结果
	renderResult:function(res,num,total){
		var succ=["","厉害了，我的哥!","大神带我飞吧!","可以啊，这位同学!","居然还对了!","掌声鼓励!"],
			fail=["","大哥，行不行啊!","小样，不行啊!","花了这么久时间还错了!","失败乃人生常事!","听说智商不够的人不适合玩数独!"],
			ing=["","我一定会成功的!","相信自己!","正在努力挥洒汗水!","成功就在不远处!","坚持就是胜利!","不成功哪有颜面离开!","对我来说都是小菜一碟!","分分钟解决!","so easy!"],
			wait=["","你还在等什么!","时间不等人!","再犹豫TA就成了别人的人了!","怕什么，来一把!","据说大神都不犹豫!","来都来了，玩一把呗!","瞅啥瞅，不玩一边去!","再犹豫，黄花菜都凉了!","主动一点，我们之间就会有故事!"],
			str="",
			tip="";
		if(res==1){//正确
			tip=succ[this.createARandomNum(0,succ.length-1)];
			str='<p class="result right">666,正确</p>'
				+'<p class="tip">'+tip+'</p>';
		}else if(res==2){//失败
			tip=fail[this.createARandomNum(0,fail.length-1)];
			var _resWord=total==num?"厉害了,全错":'错误'+num+'处';
			str='<p class="result wrong">'+_resWord+'</p>'
				+'<p class="tip">'+tip+'</p>';
		}else if(res==3){//正在进行游戏
			tip=ing[this.createARandomNum(0,ing.length-1)];
			str='<p class="result ing">奋斗中...</p>'
				+'<p class="tip">'+tip+'</p>';
		}else if(res==4){//没有进行游戏
			tip=wait[this.createARandomNum(0,wait.length-1)];
			str='<p class="result wait">来玩玩呗</p>'
				+'<p class="tip">'+tip+'</p>';
		}
		this.resultBox.innerHTML=str;
	},
	//渲染当前计时
	renderTime:function(){
		var sec=this.addZero(this.time%60);
		var min=this.addZero(Math.floor(this.time/60));
		var _time=min+":"+sec;
		this.timeBox.innerHTML=_time;
	},
	//渲染当前鼠标点击次数
	renderSteps:function(num){
		this.steps.innerHTML=num+"次click";
	},
	//清除难度选择按钮高亮样式
	clearDifficultBtnLighter:function(index){
		for(var i=0;i<this.difficultyBtnsItems.length;i++){
			this.difficultyBtnsItems[i].classList.remove("active");
		}
		if(index>=0){
			this.difficultyBtnsItems[index].classList.add("active");
		}
	},
	//生成一个9*9的9宫格数组，填充都为0
	initData:function(){
		var _data=[];
		for(var i=0;i<9;i++){
			_data[i]=[];
			for(var j=0;j<9;j++){
				_data[i][j]=0;
			}
		}
		return _data;
	},
	//生成一个每行都是随机数组的矩阵
	createAMixData:function(){
		var _data=[];
		for(var i=0;i<9;i++){
			var arr=[0,1,2,3,4,5,6,7,8];
			var mixArr=this.randomAArr(arr);
			_data[i]=arr;
		}
		return _data;
	},
	//生成随机一个游戏数据
	createAGameData:function(){
		var time=0;
		while(!this._createAGameData()){
			time++;
			console.log("生成失败"+time+"次，重新生成");
		}
		this.render(this.gameData);
	},
	//实际生成方法
	_createAGameData:function(){
		this.gameData=this.initData();//游戏数据矩阵
		this.mixData=this.createAMixData();//随机数据矩阵
		for(var n=1;n<=9;n++){//填充1--9
			if(!this.fillNmuber(n)){//如果某一行填写失败了就从头开始
				return false;
			};
		}
		return true;
	},
	//填充过渡方法
	fillNmuber:function(num){
		return this._fill(num,0);//从0开始填充
	},	
	//递归调用进行生成
	_fill:function(num,rowIndex){
		if(rowIndex>=9){
			return true;
		}
		var _rowData=this.gameData[rowIndex];//该行数据
		var _mixData=this.mixData[rowIndex];//该行随机列
		for(var j=0;j<9;j++){//列索引0--8列，如果某一列失败的话依次下一列填写
			var cowIndex=_mixData[j];//随机列
			if(_rowData[cowIndex]!=0){//该位置已经有数据了
				continue;
			}
			if(!this.checkIsAble(rowIndex,cowIndex,num)){//不能填写
				continue;
			};
			//填写
			_rowData[cowIndex]=num;
			//检查下一行能不能填写，不能就返回进行下一列
			if(!this._fill(num,rowIndex+1)){
				_rowData[cowIndex]=0;
				continue;
			}
			return true;
		}
		return false;
	},
	//检查某一个位置的数字是否正确
	checkIsAble:function(row,cow,num){
		//检查列是否有重复
		for(var i=0;i<this.gameData.length;i++){
			if(this.gameData[i][cow]==num){
				return false;
			}
		}
		//检查该九宫格是否有重复
		var index=this.convert(row,cow);
		for(var i=0;i<this.gameData.length;i++){
			for(var j=0;j<this.gameData[i].length;j++){
				if(this.convert(i,j)==index && this.gameData[i][j]==num){
					return false;
				}
			}
		}
		return true;
	},
	//根据行列坐标返回宫序号
	convert:function(row,cow){
		return Math.floor(row/3)*3+Math.floor(cow/3);
	},
	//渲染界面
	render:function(data){
		var str="";
		for(var i=0;i<data.length;i++){
			for(var j=0;j<data[i].length;j++){
				var _num=(data[i][j]==0 || data[i][j]>9)?"":data[i][j];
				if(this.difficultRandom()){
					_num="";
				}
				var _gridIndex=this.convert(i,j);
				var _specIndexArr=[0,2,4,6,,8];
				if(_specIndexArr.indexOf(_gridIndex)!=-1){
					if(_num==""){
						str+='<span class="spc edit" contenteditable="true">'+_num+'</span>';
					}else{
						str+='<span class="spc">'+_num+'</span>';
					}
				}else{
					if(_num==""){
						str+='<span class="edit" contenteditable="true">'+_num+'</span>';
					}else{
						str+='<span>'+_num+'</span>';
					}
				}
			}
		}
		this.app.innerHTML=str;
	},
	//获取指定元素
	$:function(str){
		return document.querySelector(str);
	},
	//洗牌算法，随机打乱一个数组
	randomAArr:function(arr){
		var len=arr.length;
		for(var i=0;i<len;i++){
			var _n=this.createARandomNum(i,len-1);
			var _mix=arr[i];
			arr[i]=arr[_n];
			arr[_n]=_mix;
		}
		return arr;
	},
	//游戏难度随机数
	difficultRandom:function(){
		var comper=5;
		switch (this.difficultType){
			case "easy":
				comper=4;
				break;
			case "normal":
				comper=6;
				break;
			case "hard":
				comper=8;
				break;
			default:
				break;
		}
		return Math.floor(Math.random()*11)<comper;
	},
	//生成一个1~9随机数
	createARandomNum2:function(){
		return Math.ceil(Math.random()*9);
	},
	//生成一个随机数
	createARandomNum:function(f,t){
		return Math.ceil(Math.random()*(t-f))+f;
	},
	//补0
	addZero:function(num){
		return num<10?"0"+num:num;
	}
	
}

new App();
	
})();
