var buttonColors=["green", "red", "yellow", "blue"];
var gamePattern=[];
var userClickedPattern=[];
var gameStart=0;
var level=0;

$(document).keypress(function(){
    if(gameStart==0){
        nextSequence();
        gameStart=1;


        $("td").click(function(){
            var userClickedColor=$(this).attr("id");
            userClickedPattern.push(userClickedColor);
            playSound(userClickedColor);
            animatePress(userClickedColor);
            checkAnswer(userClickedPattern.length-1);
        });
        
        function checkAnswer(currentLevel){
            if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
                    if(userClickedPattern.length===gamePattern.length){
                        setTimeout(function () {
                            nextSequence();
                          }, 1000);
                    }        
            }else{
                    error();
                    }
            }
        function animatePress(currentColor) {
            $("#" + currentColor).addClass("pressed");
            setTimeout(function () {
              $("#" + currentColor).removeClass("pressed");
            }, 100);
          }
          
          function playSound(name) {
            var audio = new Audio("sounds/" + name + ".mp3");
            audio.play();
          }
        
        function error(){
                $('#CONTENT').css({"background-image": "linear-gradient(135deg,red,red)"});
                setTimeout(function(){
                $('#CONTENT').css({"background-image": "linear-gradient(135deg,#061724,#043045,#0870a0,#E7F6F2)"});
                }, 200);
                var audio = new Audio(String("sounds/wrong.mp3"));
                audio.play();
                $("h1").css({"font-size":"2.7rem","padding-top":"2%","padding-bottom":"1%"}).html("Game Over, Press Any Key to Restart");
                setTimeout(function(){
                    $(document).keypress(function(){
                        window.location.reload();
                    });
                    $(document).click(function(){
                        window.location.reload();
                    });
                },1000);
                startOver();
        }
        
        function startOver() {
            level = 0;
            gamePattern = [];
            started = false;
        }
        
        function nextSequence(){
            userClickedPattern=[];
            level++;
            $("h1").html("Level "+ level);   
            var randomNumber = Math.floor(Math.random() * 4);
            var randomChosenColour = buttonColors[randomNumber];
            gamePattern.push(randomChosenColour);
            $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(randomChosenColour);
        }
    }
    else{
        return false;
    }  
});


