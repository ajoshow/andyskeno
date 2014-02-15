/*=================================== 
 * Andy's Keno Javascript
 * Author: Andy Chu
 * Email: apig1026@hotmail.com
 * Date: 2010 July 26
 * 
 * This code indicates to the author's intellectual property. 
 * You are free to use or modify the code in any circumstances
 * as long as author's name is proper stated. 
 *====================================*/

// Customize HTML   
var red = "red";			// background highligh by cpu
var green = "green";		// background highligh by player
var blue = "#364389";		// default background color
var mark = "O";				// marker symbol

// Conditional Variable
// used as a flag for determine certain conditions
var matched = 0;			// default value for how many bet are matched
var flag = false;			// used for ensure whether or not game is running 

// String messages
var strings;
var lang_big5 = [
	"抱歉！您沒有足夠的餘額繼續遊戲。請按[F5]刷新頁面來取得遊戲初始金額。",
	"抱歉！您沒有足夠的餘額進行押注。請按[F5]刷新頁面來取得遊戲初始金額。",
	"錯誤！尚未定義變數. 請先初始化遊戲使用 init() 函數。",
	"請至少選擇一個號碼來進行遊戲！！",
	"必須先押注才能(重新)選號。請按[Bet]來進行動作。"
	
];
var lang_en = [
	"Sorry! You do not have enough money to play.\nPlease press [F5] to refresh your balance.",
	"Sorry! You do not have enough money to take a bet.\nPlease press [F5] to refresh your balance.",
	"Undefined. Please uses init() first.",
	"Please pick at least one number first!!",
	"Please press [Bet] button to begin before you can pick/repick numbers."
];
switch( getLang() )
{
	case "en":
		strings = lang_en; break;
	default:
		strings = lang_big5; break;
}

// define Keno object
var keno = {
	nums : new Array(),		// all numbers (collection)
	uPicks : undefined,		// numbers that user/player picked
	cPicks : undefined,		// numbers that cpu picked
	isGameEnd : false,		// determine whether game is ended
	
	// embeded money atrributes
	balance : 20,			// account balance
	betAmt : 0.25,			// $ amount for one bet
	bet : 0,				// # of bets
	
	// initialize 
	init : function(){
		for(var i=1; i<=80; i++){
			this.nums[i-1] = i;
		}
		this.uPicks = new Array();
		this.cPicks = new Array();
		this.isGameEnd = false;
		this.bet = 0;
	},
	
	// getBalance() retrieve the account balance
	getBalance : function(){
		return this.balance;
	},
	
	// betAgain() take a bet again if the account has enough money
	betAgain : function(){
		if(this.balance >= this.betAmt * this.bet){
			this.balance -= this.betAmt * this.bet;
		}else{
			this.bet = 0;
			alert(strings[0]);
		}
	},
	
	// betIt() take a bet if the account has enough money
	betIt : function(){
		if(this.balance >= this.betAmt){
			this.balance -= this.betAmt;
			this.bet++;
		}else{
			alert(strings[1]);
		}
	},
	
	// getBet() retrieve # of bets
	// return int
	getBet : function(){
		return this.bet;
	},
	
	// setBet() set # of bets
	// para: n (int) # of bets
	setBet : function( n ){
		if(n >= 0 ) 
			this.bet = n;
	},
	
	// isBet() return true if player has bet
	// return boolean
	isBet : function(){
		return this.bet > 0;
	},
	
	// clearBet() reset bet to default value
	clearBet : function(){
		this.bet = 0;
	},
	
	// deposit() deposits cash to the account
	// para: cashIn (numbers);
	deposit : function( cashIn ){
		if( cashIn > 0 ){
			this.balance += cashIn;
		}
	},
	
	// win() will deposit the reward to the account and return the value.
	// para: m (int); # of bets matched
	// return: numbers
	win : function( m ){
		var n = 0;
		var income = 0;
		
		// odds ratio table
		switch(this.sizeU())
		{
			case 1:
				switch(m){
					case 1: n = 3; break;
				} break;
			case 2:
				switch(m){
					case 1: n = 0; break;
					case 2: n = 7; break;
				} break;
			case 3:
				switch(m){
					case 1: n = 0; break;
					case 2: n = 1; break;
					case 3: n = 20; break;
				} break;
			case 4:
				switch(m){
					case 1: n = 0; break;
					case 2: n = 1; break;
					case 3: n = 5; break;
					case 4: n = 50; break;
				} break;
			case 5:
				switch(m){
					case 1: n = 0; break;
					case 2: n = 0; break;
					case 3: n = 1; break;
					case 4: n = 16; break;
					case 5: n = 250; break;
				} break;
			case 6:
				switch(m){
					case 1: n = 0; break;
					case 2: n = 0; break;
					case 3: n = 1; break;
					case 4: n = 9; break;
					case 5: n = 75; break;
					case 6: n = 1000; break;
				} break;
			case 7:
				switch(m){
					case 1: n = 0; break;
					case 2: n = 0; break;
					case 3: n = 1; break;
					case 4: n = 2; break;
					case 5: n = 90; break;
					case 6: n = 250; break;
					case 7: n = 2000; break;
				} break;
			case 8:
				switch(m){
					case 1: n = 0; break;
					case 2: n = 0; break;
					case 3: n = 0; break;
					case 4: n = 1; break;
					case 5: n = 24; break;
					case 6: n = 90; break;
					case 7: n = 400; break;
					case 8: n = 4000; break;
				} break;
			case 9:
				switch(m){
					case 1: n = 0; break;
					case 2: n = 0; break;
					case 3: n = 0; break;
					case 4: n = 1; break;
					case 5: n = 3; break;
					case 6: n = 32; break;
					case 7: n = 125; break;
					case 8: n = 1000; break;
					case 9: n = 5000; break;
				} break;
			case 10:
				switch(m){
					case 1: n = 0; break;
					case 2: n = 0; break;
					case 3: n = 0; break;
					case 4: n = 0; break;
					case 5: n = 1; break;
					case 6: n = 16; break;
					case 7: n = 90; break;
					case 8: n = 400; break;
					case 9: n = 1250; break;
					case 10: n = 5000; break;
				} break;
		}
		income = n * (this.bet * this.betAmt);
		this.deposit( income );
		return income;
	},
	
	// deal() deal a number at selected index
	// return int
	deal : function( index ){
		if(!this.isGameEnd){
			this.shuffle(this.nums);
			
			for(var i=0; i<20; i++){
				this.cPicks[i] = this.nums[i];	
			}
			this.isGameEnd = true
		}
		return this.cPicks[index];
	},
	
	// match() match player's pick and cpu's pick
	// return int
	match : function(){
		var count = 0;
		
		if( this.sizeU() != 0 || this.sizeC() != 0 ){
			
			for(var i=0; i<this.sizeU(); i++){
				for(var j=0; j<this.sizeC(); j++){
					if(this.uPicks[i] == this.cPicks[j]){
						count++;
						break;
					}
				}
			}
			
		}
		return count;
	},
	
	// getC() get cpu's pick at selected index
	// return int
	getC : function( index ){
		return (index >= 0 && index < this.cPicks.length) ? this.cPicks[index] : -1;
	},
	
	// getU() get user/player's pick at selected index
	// return int
	getU : function( index ){
		return (index >= 0 && index < this.uPicks.length) ? this.uPicks[index] : -1;
	},
	
	// reset() reset vaules to default, excluse user's picks
	reset : function(){
		this.isGameEnd = false;
		this.cPicks = new Array();
		
		for(var i=1; i<=80; i++){
			this.nums[i-1] = i;
		}
	},
	
	// shuffle() mass up the numbers collection by randomly swaping values
	shuffle : function(){
		for(var i=0; i  <this.nums.length - 1; i++){
			var pos = parseInt(Math.random() * this.nums.length)+1;
			var tmp = this.nums[i];
			this.nums[i] = this.nums[pos];
			this.nums[pos] = tmp;
		}
		
	},
	
	// push() adds value to user/player picks
	// para: n (int), number
	push : function( n ){
		this.uPicks.push( n );
	},
	
	// remove() remove numbers from user/player picks
	// para: n (int), number
	remove : function ( n ){
		var tmp = new Array();
		
		for(var i=0; i < this.uPicks.length; i++){
			if(this.uPicks[i] != n){
				tmp.push(this.uPicks[i]);
			}
		}
		this.uPicks = tmp;
	},
	
	// isFull() determine whether user/player has reached max. number picks
	// return boolean
	isFull : function(){
		if (typeof this.uPicks == "undefined"){
			alert(strings[2]);
			return false;
		}
		return (this.uPicks.length == 10) ? true : false;
	},
	
	// isEmpty() determine whether user/player has picked or not
	// return boolean
	isEmpty : function(){
		if (typeof this.uPicks == "undefined"){
			alert(strings[2]);
			return false;
		}
		return (this.uPicks.length == 0) ? true : false;
	},
	
	// sizeU() retrieve # of user/player picks
	// return int
	sizeU : function(){
		return this.uPicks.length;
	},
	
	// sizeC() retrieve # of cpu picks
	// return int
	sizeC : function(){
		return this.cPicks.length;
	}
}

// initialize the game
keno.init();
$(function(){
	output(0, 0, 0, keno.getBalance());
});

function play(){
	
	// it is true when game is played once, and user attempts to play again.
	// initalization again...
	if(keno.isGameEnd){
		reset();
		// play again without rebetting
		keno.betAgain();
		output(keno.getBet(), 0, 0, keno.getBalance());
	}
	
	// deal(cpu picks) numbers if the user/player has bet.
	if( keno.isBet() ){
		if(!keno.isEmpty()){
			button_disable();
			flag = false;
			deal();
		}else{
			alert(strings[3]);
		}
	}

}

// reset() will reset cells's background color to default
// but leaves user/player highlighs. In addition, 
// use Keno.reset() to reset inner values.
function reset(){
	
	// reset cells's background color to default
	for(var i=0; i<keno.sizeC(); i++){
		var index = "#c" + keno.getC(i);
		$(index).css("background-color", blue);
	}
	
	// reset cells's background color to user/player's highligh color
	for(var j=0; j<keno.sizeU(); j++){
		var index = "#c" + keno.getU(j);
		$(index).css("background-color", green);
	}
	
	deal.i = 0;
	keno.reset();
}

// erase() is similar to reset(). reset cells's background color to default
// no exception. erase() gives you a default outlook of game table.
function erase(){
	if( !keno.isEmpty() ){
		reset();
		for(var j=0; j<keno.sizeU(); j++){
			var index = "#c" + keno.getU(j);
			$(index).css("background-color", blue);
			$(index).html(keno.getU(j));
		}
		
		var perBet = keno.getBet();
		keno.init();
		// special case: to avoid a case that player made first bet and click erase button, 
		// the system will think the player hasn't bet and take the money away.
		// therefore, we have to set back what the play has bet before the system re-initial
		if(flag){
			keno.setBet(perBet);
		}
		
		output(keno.getBet(), 0, 0, keno.getBalance())
	}
}

// deal() uses deal.i as static counter; exits setTimeout() when the condition is met.
function deal()
{
	if(deal.i == undefined){
		deal.i = 0;
	}
	if ( deal.i <= 20 )
	{
		var index = "#c" + keno.deal(deal.i);
		$(index).css("background-color",red);
		setTimeout("deal()", 200);
		deal.i++;
    }else{
		// Game ends...
		button_enable();
		matched = keno.match();
		output(keno.getBet(), matched, keno.win( matched ), keno.getBalance());
	}
}

function bet(){
	// make sure whenever the user click [bet] button,
	// the user recieves a clear game start.
	if( !keno.isEmpty()){
		reset();
	}
	
	// this flag is to make sure when game is played once, and the user attempts to
	// change the number he/she picked, the system has to clear out the inital bet first.
	if( !flag ){
		keno.clearBet();
	}
	
	// flag to true to indicate game is ready to go
	keno.betIt();
	flag = true;
	output(keno.getBet(), "0", "0", keno.getBalance());
}

function markMe( obj ){
	
	var num = obj.id.substring(1);
	if( keno.isBet() && flag){
		if( isInt( $(obj).html() ) )
		{
			if( ! keno.isFull() ){
				$(obj).html(mark).css("background-color",green);
				keno.push( num );
			}
		}
		else
		{
			$(obj).html( num ).css("background-color",blue);
			keno.remove( num );
		}
	}else{
		alert(strings[4]);
	}
}

//
// Other utitlity functions
// they are not part of core functions; they are here to make life easier.
//
function output( b, m, w, bal){
	$("#valBet").html(b);
	$("#valMat").html(m);
	$("#valWin").html(w);
	$("#valBal").html(bal);
}
function button_disable(){
	$("#start, #erase, #bet").attr('disabled', 'disabled');
}
function button_enable(){
	$("#start, #erase, #bet").removeAttr('disabled');
}
function isInt(s)
{
	var r,re;
	re = /\d*/i;
	r = s.match(re);
	return (r==s) ? true : false;
}
function getLang(){
	// get rid off "?" 
	var query = location.search.substring(1);
	var a = query.split("&");
	for(var i=0; i<a.length; i++){
		var n = a[i].indexOf("=");
		if(n == - 1) 
			continue;			// continue if can't find "="
		
		var key = a[i].substring(0, n);
		var val = a[i].substring(n+1);
		if(key = "lang")
			return val.toLowerCase();
	}
	return "unknown"; // let programmer to decide which lang to use 
}