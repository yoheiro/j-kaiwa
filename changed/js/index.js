
function speakQuiz(ee,e){
  console.log(e)
  console.log(quizDB2);
  TTS.speak({
          text:currentQ[e][3],
          locale: 'ja-JP',  // 言語
          rate: 1  // 読み上げスピード
      }).then(function () {
          // 読み上げ成功時の処理
          console.log(1);
      }, function (reason) {
          // 読み上げ失敗時の処理
          console.log(2)
      });
  };

// switch can phone using mic 
window.plugins.speechRecognition.isRecognitionAvailable(
    function(available) {
      if(available){
        // 利用可能なら、マイク使用の許可を求める。
        window.plugins.speechRecognition.requestPermission(
          function(res) {
            // 成功時、特に何もしない。
            console.log("permission is changed!");
          }, function(err){
            // 失敗時、警告メッセージを出し、音声入力ボタンを非活性に。
            console.error(err);
            alert("マイクに接続できませんでした。");
            $("#voice_input_btn").prop("disabled", false);    //jquery
        });
      }
    }, function(err){
      // 利用不可なら、警告メッセージを出し、音声入力ボタンを非活性に。
      console.error(err);
      alert("音声入力プラグインが利用できません。");
      $("#voice_input_btn").prop("disabled", false);    //jquery
  });
  
  // 音声入力用メソッドmic-in method
  function inputVoice(){
    // 音声入力の事前設定
    var micOptions = {
      language : "ja-JP", // language
      matches : 1         // 結果の候補数 number of result
    }
  
    // 音声入力 開始 satart audio in

      // Android の場合は startListening を呼ぶだけ。
      window.plugins.speechRecognition.startListening( micSuccess,  micError,  micOptions );
    
  }
  
  // 音声入力成功時のコールバックメソッド
  function micSuccess(result){
      // テキストインプットに結果を出力
      $("#Answer").text('A.'+result) ;    
      UserAnswer=result;
      console.log(UserAnswer);
      //$("#answer").html('<ons-button onclick="checkAnswer()" id="check"><ons-icon icon="check" size="23px" /></ons-button>') ;


  }
  
  // 音声入力失敗時のコールバックメソッド
  function micError(result) {
      // エラーメッセージを出力
      alert("音声が聞き取れませんでした。") ;
  }
  
  function showIosVoiceDialog(micOptions) {
    // 音声入力開始
    window.plugins.speechRecognition.startListening( micSuccess,  micError,  micOptions );
  
    // 音声入力中のダイアログを表示する。
    ons.notification.confirm({
      messageHTML: '<div style="text-align:center"><ons-icon icon="fa-microphone" size="30px" /><br><span style="font-size:14px">音声入力中...</span></div>',
      title: '',
      primaryButtonIndex: 1,
      cancelable: false,
      modifier: 'material',
      callback: function(index) {
          switch(index) {
            case 1:
              //OKを押した時、音声入力終了
              window.plugins.speechRecognition.stopListening();
              break;
            case 0:
              // Cancelを押した時の処理
              // MEMO:中断したいけど、中断メソッドがプラグインに用意されていない模様
              window.plugins.speechRecognition.stopListening();
              break;
          }
      }
    });
  }

//////////
  //backbtn
  function reset(){
    back2top();
  ;}
  function reset1(){
    $('#Page2').show();
    $('#Page3').hide();
    $('#RESULTPage').hide();
    $("#backbtn").html('<ons-button modifier="quiet" onclick="reset()"><img src="./img/arrow_back-24px.svg"></ons-button>');
    $('#Page3').empty();
    currentQ=[];
    quizDB3=[];
      ;}
  ///back2TOP
function back2top(){
  $('#topPage').show();
  $('#Page2').hide();
  $('#Page3').hide();
  $('#backbtn').hide();
  $('#Page2').empty().html('<div id="selectedCate"></div>');
  $('#Page3').empty();
  $('#RESULTPage').empty();
  $('#RESULTPage').hide();
  //deleteList
  quizDB2=[];//After chooose CATE DB
  quizDB3=[];
  chapDB2=[];
  ChapterPage=[];
  currentQ=[];
};
//show quiz list //e chapternum
function MkQuizlist(e){
  $('#chapter'+e).slideToggle();
};
  //////////////
  //CheckANSWER
  var ANSWER;
  var UserAnswer=[];
  function checkAnswer(e){
  STuA[e]=UserAnswer[0]
    console.log(UserAnswer[0]);
    console.log(ANSWER)
    STuA[e]=UserAnswer[0];
    if( UserAnswer[0]== ANSWER) {
      // 当たった時の挙動
      currentQ[e][6]=1;

  }
  else {
        currentQ[e][6]=2;
  }
  };

  // //showdialog
  // function ansDialog() {
  //   var dialog = document.getElementById('ans-dialog');

  // if (dialog) {
  //   dialog.show();
  // } else {
  //   ons.createElement('dialog.html', { append: true })
  //     .then(function(dialog) {
  //       dialog.show();
  //     });
  // }

  // };
  // function hideDialog (id) {
  //   document
  //     .getElementById(id)
  //     .hide();

//   //     checkEndQuiz();//
//   // };
// //クイズが終わったかどうかの判定
//   function checkEndQuiz(){
// if(CurrentQuiznum>quizDB2.length-2){
//   console.log(Stuckanswer[0]);
//   resultPage()
// }else{
//   CurrentQuiznum=CurrentQuiznum+1;
//   ranemb();
// }
   
// };
//   //mk result page
//   function resultPage(){  
//     $("#reset").empty();
//     $("#ansBox").empty();
//     $("#speachQuiz").empty();
//     $("#quiz").empty();
//     $("#quiz").html('<ons-list><ons-list-header>RESULT</ons-list-header>'+Stuckanswer[0]+'</ons-list>');
//     $("#ansBox").html('<ons-list><ons-list-item><div class="center"><ons-button onclick="reset()">トップに戻る<ons-icon icon="md-replay" size="23px" ></ons-icon></ons-button><div></ons-list-item></ons-list>')
//   };