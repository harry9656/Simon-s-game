(
	function($){
		$(document).ready(function(){
			var status = false;		// Game is being played or not
			var Sequence = 0;		// Varibale used to hold the Sequence array
			var invertedSequence = 0;
			var count = 1;			// Count the number of moves the user have to do
			var counter = 0;		// variable that points to the actual move
			var strict = true;
			var playing = false;
		    // update the game status
		    $("#startButton").removeClass("pressed");
		    $("#stopButton").addClass("pressed");
		    $(".status").text("Press Start to play");
		    		// Shows gameover
		    		function gameOver(){
		    			var flag = false;
		    			var timer = setInterval(function(){
		    				if(flag===false){
		    					playSound(5);
		    					$(".status").text("Game Over!");
		    					flag = true;
		    					status = false;

		    				} else {
		    					$(".status").text("Press Start to play");
		    					clearInterval(timer);
		    				}
		    			},1500);
		    		}
		    		function playAll(){
		    			var i = 1;
		    			var timer = setInterval(function(){
		    				if(i === -1)
		    				clearInterval(timer);
		    				playSound(i++);
		    				if( i >= 5) i = -1; 
		    			},300);
		    		}
		    		$("#strictMode").click(function(){
		    			strict = !strict;
		    			if(strict){
		    				$("#strictMode").addClass("enabled");
		    				$("#strictMode").removeClass("disabled");
		    			}
		    			else{
		    				$("#strictMode").addClass("disabled");
		    				$("#strictMode").removeClass("enabled");
		    			}
		    		});
			// If start is pressed start the game 
			$("#startButton").click(function(){
				if(status===false){
					playing = true;
					status = true;
					Sequence = randomSequence();
					invertedSequence = Sequence.reverse();
					count = 1;
					nextMove(Sequence,count);
					count=2;
					counter = 0;
					$("#startButton").addClass("pressed");
					$("#stopButton").removeClass("pressed");
				}
			});

			$("#stopButton").click(function(){
				$("#startButton").removeClass("pressed");
				$("#stopButton").addClass("pressed");
				$(".status").text("Press Start to play");
				playing = false;
				status=false;
			});
			$(".pad").click(function(){
				if(status === true && playing === true){
					var position = parseInt(($(this).attr("id")).slice(3));
					if(counter <= count-2){
						if(position === invertedSequence[counter]){
							if( counter === count-2){
								nextMove(Sequence, count);
								count++;
								counter = 0;	
							} else counter++;
						} else if(strict){
							$("#startButton").removeClass("pressed");
							$("#stopButton").addClass("pressed");
		    				playAll();
							gameOver();
							status=false;
						} else{
							$(".status").text("wrong pad!");
						}
					}
				}

			});
			function nextMove(Sequence, counter){
				$(".status").text("Playing with streak: "+counter);
				playing = false;
				var i = 0;
				var flag = false;
				var time = 500;
				if(counter > 5) time = 300;
				else if(counter > 9) time = 200;
				else if(counter > 13) time = 100;
				else if(counter === 20) $(".status").text("You won! (but nobody cares)");
				else
				var timer = setInterval(function(){
					if(i === counter){

						$("#pad"+(Sequence[i-1])).css({"opacity" : "1"});
						$("#pad"+(Sequence[i-1])).removeClass("zoom");

						i = 0;
						clearInterval(timer);
						playing = true;
					} else{
						if(i >= 1 && flag === true){
							$("#pad"+(Sequence[i-1])).css({"opacity" : "1"});
							flag = false;
						} else {
							playSound(Sequence[i]);
							$("#pad"+(Sequence[i])).css({"opacity" : "0.4"});
							i++;
							flag = true;
						}
					}
				}, time);

			};
		// Generates a random Sequence of numbers and returns it as array.
		function randomSequence(){
			var sequence = [];
			for(var i = 0; i < 20; i++){
				sequence.push(Math.floor((Math.random()*100)%4)+1);
			}
			return sequence;
		};
	});
}
)
(jQuery)

function playSound(which) {
	var audio = document.getElementById('audioPad'+which);
	if (audio.paused) {
		audio.play();
	}else{
		audio.currentTime = 0
	}
}