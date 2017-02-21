// config
var SIZE  = 3;
var SCORE = 0;
var TIME  = 30;
var RIDX  = 0;

// game variables
var play_flag = false;
var play_interval = null;

// color template
var COLOR_TEMPLATE = [
    [ '#ff4d4d', '#ff6666' ],
    [ '#80ff80', '#4dff4d' ],
    [ '#ffff66', '#ffff1a' ],
    [ '#6699ff', '#0055ff' ],
];

// time functions
function countdown(){
    TIME -= 1;
    document.getElementById('time').innerHTML  = TIME;

    if(TIME == 0){
        clearInterval(play_interval);
        alert("You got score " + SCORE + " !");

        // reset
        SIZE  = 3;
        SCORE = 0;
        TIME  = 30;
        play_flag = false;
        document.getElementById('score').innerHTML = SCORE;
        document.getElementById('time').innerHTML = TIME;
    }
}

// success event
function choose(i){

    // start time count
    if(!play_flag){
        play_flag = true;
        play_interval = setInterval(countdown, 1000);
    }

    // adjust params
    if(i == RIDX){
        SCORE++;
        if(SCORE % 4 == 0){
            SIZE++;
        }
        document.getElementById('score').innerHTML = SCORE;
        redraw();
    }
}

// core function
function redraw(){

    // gen random index
    RIDX = Math.floor(Math.random() * SIZE * SIZE);

    // apply to colors
    COLORS = [];
    var cur_color = COLOR_TEMPLATE[Math.floor(Math.random()*COLOR_TEMPLATE.length)];
    for(i=0; i<SIZE*SIZE; i++){
        COLORS.push( i == RIDX ? cur_color[0] : cur_color[1] );
    }

    // draw table
    var cnt = 0;
    var html = '';
    for(i=1; i<=SIZE; i++){
        html += "<tr>";
        for(j=1; j<=SIZE; j++){
            html += "<td style='background-color: " + COLORS[cnt] + "' onclick='choose(" + cnt + ");' width='" + 100/SIZE + "%'></td>";
            cnt ++;
        }
        html += "</tr>";
    }
    document.getElementById('board').innerHTML = html;
}

// draw
redraw();
