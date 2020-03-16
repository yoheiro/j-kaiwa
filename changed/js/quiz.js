
var quizDB2=[];//After chooose CATE DB
var quizDB3=[];
var chapDB2=[];
var ChapterPage=[];
var currentQ=[];
var STuA=[];
function CChapter(e){
  cate=e;
  $('#Page2').show();
  $("#topPage").hide();
  $("#Page3").hide();
  $("#backbtn").show();
  var quizDB1=EXDB;
  var chapDB1=EXChap;
  // 選択された難易度のクイズを配列に入れる

  for(var i=0,l=quizDB1.length;i<l;i++){
    if(quizDB1[i][2]==cate){
quizDB2.push(quizDB1[i]);
    }
};
$("#selectedCate").html("<h1 style='text-align:center'>"+e+"</h1>");
$("#backbtn").html('<ons-button modifier="quiet" onclick="reset()"><img src="./img/arrow_back-24px.svg"></ons-button>');
quizDB2.sort((a,b) => a[4] - b[4]);//sort chapter
//選択された難易度のepisodeを配列に入れる
for(var i=0,l=chapDB1.length;i<l;i++){
  if(chapDB1[i][3]==cate){
chapDB2.push(chapDB1[i]);
  }
};
chapDB2.sort((a,b) => a[2] - b[2]);//sort chapter
for(var i=0,l=chapDB2.length;i<l;i++){
$("#Page2").append('<ons-card onclick="MkQuizlist('+chapDB2[i][2]+')"><h1 style="text-align:left">EPISODE'+chapDB2[i][2]+'</h1></ons-card><ons-list id="chapter'+chapDB2[i][2]+'" style="display:none"></ons-list>');
};
///
for(var epnum=0,k=chapDB2.length+1;epnum<k;epnum++){
for(var i=0,l=quizDB2.length;i<l;i++){
  if(quizDB2[i][4]==epnum){
    ChapterPage.push(quizDB2[i]);
  }
};

ChapterPage.sort((a,b) => a[5] - b[5]);//sort chapter
for(var g=0,gg=ChapterPage.length;g<gg;g++){
var DicideID="#chapter"+epnum;
$(DicideID).append('<ons-list-item onclick="MkQuizPage('+epnum+','+g+')">'+ChapterPage[g][7]+'</ons-list-item>');
console.log(ChapterPage[g][8]);
};
ChapterPage=[];
};
};

/////////////////quizpage(page3)
function MkQuizPage(ee,e){//e=quiznum,ee=epinum
  quizDB3=quizDB2;
  for(var i=0,l=quizDB3.length;i<l;i++){
    if(quizDB3[i][4]==ee){
      currentQ.push(quizDB3[i]);
    }
  };
  console.log(currentQ);
  $('#Page2').slideToggle();
  $('#Page3').html();
  $('#Page3').slideToggle();
  $("#backbtn").html('<ons-button modifier="quiet" onclick="reset1()"><img src="./img/arrow_back-24px.svg"></ons-button>');
  $('#Page3').html('<h1 id="eptitle">'+'EPISODE'+currentQ[e][4]+'</h1><p id=title>'+currentQ[e][7]+'</p><h2 id="question"><div>Q.'+currentQ[e][0]+'<ons-button onclick="speakQuiz('+ee+','+e+')"><img src="./img/headset-24px.svg"></ons-button></div><div id="Answer">A.</div></h2><img src="./img/Illustration.svg"><br><img src="./img/mic.svg" style="width:15%;position: center ;z-index:99; left:0;right:0" onclick="micin()"><div id="control"><ons-button onclick="skip('+ee+','+e+')">skip</ons-button><ons-button onclick="next('+ee+','+e+')">next</ons-button></div>');

};
function micin(){
  inputVoice();
  
};
function skip(ee,e){
  
  var t=e+1;
  var tt=ee+1;
  alert("showresult,skip this quiz?");}
  currentQ[e][6]=false;
  if(t<currentQ.length){
  console.log(currentQ);
  $('#eptitle').text('EPISODE'+currentQ[t][4]);
  $('#title').text(currentQ[t][7]);
  $('#question').html('<div>Q.'+currentQ[t][0]+'<ons-button onclick="speakQuiz('+tt+','+t+')"><i class="fas fa-volume-up" size="9px"></i></ons-button></div><div >A.<span id="Answer"></span></div>');
  $('#control').html('<ons-button onclick="skip('+tt+','+t+')">skip</ons-button><ons-button onclick="next('+tt+','+t+')">next</ons-button>');
  }else{
  
};
  

function next(ee,e){
  ANSWER=currentQ[e][1]; 
  checkAnswer(e);
  var t=e+1;
  var tt=ee+1;
  if(t<currentQ.length){
  console.log(currentQ);
  $('#eptitle').text('EPISODE'+currentQ[t][4]);
  $('#title').text(currentQ[t][7]);
  $('#question').html('<div>Q.'+currentQ[t][0]+'<ons-button onclick="speakQuiz('+tt+','+t+')"><i class="fas fa-volume-up" size="9px"></i></ons-button></div><div >A.<span id="Answer"></span></div>');
  $('#control').html('<ons-button onclick="skip('+tt+','+t+')">skip</ons-button><ons-button onclick="next('+tt+','+t+')">next</ons-button>');
  }else{
  SHOWRESULT(e);
  }
};
function SHOWRESULT(e){
  console.log(currentQ)
  var RESULT =[" "];
  for(var i=0,l=currentQ.length;i<l;i++){
    switch(currentQ[i][6]){
      case 1:RESULT[0]=RESULT[0]+'<ons-list-item>'+STuA[i]+'<div class="right" ><ons-icon icon="check" size="23px" style=" color: green;"></ons-icon></div></ons-list-item>';
      break;
      case 2:RESULT[0]=RESULT[0]+'<ons-list-item>'+STuA[i]+'<div class="right"><i class="fas fa-times-circle" style="color: red;"></i></div></ons-list-item>';
      break;
      default:RESULT[0]=RESULT[0]+"<ons-list-item>skip</ons-list-item>"
    }
  }
  var NEXTEP=currentQ[0][4]+1;
  console.log(NEXTEP);
  $('#RESULTPage').html('<ons-list>'+RESULT[0]+'</ons-list><ons-button onclick="back2top()">BACK TO TOP</ons-button><ons-button onclick="nextEP('+NEXTEP+')">NEXT EPISODE</ons-button>');
  $('#Page3').hide();
  $('#RESULTPage').show();
  console.log(RESULT)
};

function nextEP(e){
  MkQuizPage(e,0);
  $('#RESULTPage').empty();
  $('#RESULTPage').hide();
  $('#Page2').hide();
  
}
//////////////////////////////////////////////////////////////////////↑new functions
  //クイズ表示
// //   currentquiz
// var CurrentQuiznum=0;
// //var Stuckanswer=[];
// //   
//   function getlevel(){
//     cate = document.getElementById("level").value;
//     var quizDB1=EXDB;
//     Stuckanswer[0]="";
// //filtering
// for(var i=0,l=quizDB1.length;i<l;i++){
//     if(quizDB1[i][2]==cate){
// quizDB2.push(quizDB1[i]);
//     }
// };

//     ranemb();
//   };
//   function ranemb() {
    
//     console.log(cate);
//     //createansbox
//     $("#ansBox").html('<ons-card><h1 position="left"><div id="searchword"></div><div id="answer"></div></h1> <div id="micBox"></div></ons-card>');
//     $("#micBox").html('<ons-button modifier="large--cta" onclick="inputVoice()" id="voice_input_btn" ><ons-icon icon="fa-microphone" size="23px" /></ons-button>');
//     $("#startbutton").empty();
//     $("#reset").html('<ons-button onclick="reset()"><ons-icon icon="md-replay" size="23px" /></ons-button>');
// //create quizData

// console.log(quizDB2);

//   quizview(CurrentQuiznum);


//   } ;
  
// function quizview(e){
//   $("#quiz").html("<div>Q."+quizDB2[e][0]+'<ons-button modifier="quiet" onclick="speakQuiz('+e+')" id="SpeakBtn" ><i class="fas fa-volume-up" size="9px"></i></ons-button></div>');
//   //$("#quiz").text("Q."+quizDB2[e][0]);
//   //$("#speachQuiz").html('<ons-button modifier="quiet" onclick="speakQuiz('+e+')" id="SpeakBtn" ><i class="fas fa-volume-up" size="9px"></i></ons-button>');

//      console.log("changed");
//      console.log(e);
//      ANSWER=quizDB2[e][1];
 
// }