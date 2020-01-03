canvas = document.getElementById("c");
console.log(canvas.width)
console.log(canvas.height)
ctx = canvas.getContext("2d")
player = {
    pos_x: 0,
    pos_y: 0,
    size: 30,
    velocity: 30,
    color: "#000099",
    'ArrowUp': up_move,
    'ArrowDown': down_move,
    'ArrowRight': right_move,
    'ArrowLeft': left_move,
    draw: function(){
        ctx.fillStyle = this['color']
        ctx.fillRect(this['pos_x'], this['pos_y'], this['size'], this['size'])
    }
}

block = {
    pos_x: -10,
    pos_y: -10,
    size: 30,
    color: "#ffcc00",
    draw: function(){
        ctx.fillStyle = this['color']
        ctx.fillRect(this['pos_x'], this['pos_y'], this['size'], this['size'])
    }
}

game = {
    score: 0,
    time: 60,
    over: false,
    keys_pressed: 0
}

function init(){
    player.draw()
    refresh_block()
    block.draw()
}

function start(){
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    block.draw()
    colision_detect()

    refresh()
}

function refresh(){
    if(!game['over']){
        window.requestAnimationFrame(start)
    }else{
        draw_game_over()
    }
}

function refresh_time(){
    loop = setInterval(function(){
        game['time']--
        document.getElementById("tempo").innerHTML = game['time']
        if(game['time'] <= 0){
            game['over'] = true
            clearInterval(loop)
        }
    }, 1000)
}

function draw_game_over(){
    ctx.fillStyle = "#000"
    ctx.font = "40px serif"
    ctx.fillText("Game Over!", canvas.width/2.5, canvas.height/2)
    ctx.fillText("Score: " + game['score'], canvas.width/2.5, canvas.height/1.7)
}

function right_move(){
    if(this['pos_x'] < canvas.width - this['size']){
        this['pos_x'] += this['velocity']
    }else{
        this['pos_x'] = canvas.width - this['size']
    }
}

function up_move(){
    if(this['pos_y'] > 0){
        this['pos_y'] -= this['velocity']
    }else{
        this['pos_y'] = 0
    }
}

function left_move(){
    if(this['pos_x'] > 0){
        this['pos_x'] -= this['velocity']
    }else{
        this['pos_x'] = 0
    }
}

function down_move(){
    if(this['pos_y'] < canvas.height - this['size']){
        this['pos_y'] += this['velocity']
    }else{
        this['pos_y'] = canvas.height - this['size']
    }
}

function refresh_block(){
    do{
        block['pos_x'] = Math.floor(Math.random()*(canvas.width - 10))
    }while(block['pos_x']%block['size'] != 0)

    do{
        block['pos_y'] = Math.floor(Math.random()*(canvas.height - 10))
    }while(block['pos_y']%block['size'] != 0)
}

function colision_detect(){
    if (player['pos_x'] == block['pos_x'] && player['pos_y'] == block['pos_y']){
        refresh_block()
        game['score']++
        game['time']++
        document.getElementById("tempo").innerHTML = game['time']
        document.getElementById('score').innerHTML = game['score']
    }
}

document.addEventListener("keydown", function(e){
    if(game['keys_pressed'] == 0){
        start()
        refresh_time()
        game['keys_pressed']++
    }
    if(player[e.key]){
        player[e.key]()
    }
})