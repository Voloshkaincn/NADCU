$(document).ready(function ($) {

//input style
	$('.input__field').on('change', function(){
		if($(this).val().trim() != ''){
			$(this).parents('.input').addClass('input--filled');
		} else {
			$(this).parents('.input').removeClass('input--filled');
		}
	});
//end input style

	$('#name').on('change', function(){
		if($(this).val().trim() != ''){
			$('#registerSubmit').removeClass('button-disable');
		} else {
			$('#registerSubmit').addClass('button-disable');
		}
	});

	$('.button-disable').on('click', function(event){
		event.preventDefault();
	});

//pages routing
	if(window.location.pathname == '/'){
		$('.section').hide();
		$('#register').show();
	} if(window.location.hash == '#questions'){
		$('.section').hide();
		$('#content').show();
	}
//end pages routing

	updateTime(0,0,0,0);

//stopwatch
    
    var hours = minutes = seconds = milliseconds = 0;
    var prev_hours = prev_minutes = prev_seconds = prev_milliseconds = undefined;
    var timeUpdate;
	
   
    function pauseTime(){
    	clearInterval(timeUpdate);
    }

    function resumeTime(){
    	prev_hours = parseInt($("#hours").html());
        prev_minutes = parseInt($("#minutes").html());
        prev_seconds = parseInt($("#seconds").html());
        prev_milliseconds = parseInt($("#milliseconds").html());
        
        updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds);
    }
    
    // Update time in stopwatch periodically - every 25ms
    function updateTime(prev_hours, prev_minutes, prev_seconds, prev_milliseconds){
        var startTime = new Date();    // fetch current time
        
        timeUpdate = setInterval(function () {
            var timeElapsed = new Date().getTime() - startTime.getTime();    // calculate the time elapsed in milliseconds
            
            // calculate hours                
            hours = parseInt(timeElapsed / 1000 / 60 / 60) + prev_hours;
            
            // calculate minutes
            minutes = parseInt(timeElapsed / 1000 / 60) + prev_minutes;
            if (minutes > 60) minutes %= 60;
            
            // calculate seconds
            seconds = parseInt(timeElapsed / 1000) + prev_seconds;
            if (seconds > 60) seconds %= 60;
            
            // calculate milliseconds 
            milliseconds = timeElapsed + prev_milliseconds;
            if (milliseconds > 1000) milliseconds %= 1000;
            
            // set the stopwatch
            setStopwatch(hours, minutes, seconds, milliseconds);
            
        }, 100); // update time in stopwatch after every 25ms
        
    }
    
    // Set the time in stopwatch
    function setStopwatch(hours, minutes, seconds, milliseconds){
        $("#minutes").html(prependZero(minutes, 2));
        $("#seconds").html(prependZero(seconds, 2));
        $("#milliseconds").html(parseInt(prependZero(milliseconds, 3)/100));
    }
    
    // Prepend zeros to the digits in stopwatch
    function prependZero(time, length) {
        time = new String(time);    // stringify time
        return new Array(Math.max(length - time.length + 1, 0)).join("0") + time;
    }
//end stopwatch

	$('.answers__item').on('click', function(){
		pauseTime();
		$('.question__wrap').addClass('question__hide');
		setTimeout(function(){$('#nextQuestion').removeClass('button-disable')}, 5000);
	});
	$('#nextQuestion').on('click', function(event){
		if($(this).hasClass('button-disable')){
			event.preventDefault();
		} else {
			resumeTime();
			$('.question__wrap').removeClass('question__hide');
			$(this).addClass('button-disable');
		}
	});



})