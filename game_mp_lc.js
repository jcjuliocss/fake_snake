canvas = document.getElementById("c");
ctx = canvas.getContext("2d")
player = {
    pos_x: 0,
    pos_y: 0,
    size: 30,
    velocity: 30,
    color: "#000099",
    score: 0,
    'ArrowUp': up_move,
    'ArrowDown': down_move,
    'ArrowRight': right_move,
    'ArrowLeft': left_move,
    draw: function(){
        ctx.fillStyle = this['color']
        ctx.fillRect(this['pos_x'], this['pos_y'], this['size'], this['size'])
    }
}

player2 = {
    pos_x: 870,
    pos_y: 420,
    size: 30,
    velocity: 30,
    color: "#78046e",
    score: 0,
    'w': up_move,
    's': down_move,
    'd': right_move,
    'a': left_move,
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
    time: 60,
    over: false,
    keys_pressed: 0
}

function init(){
    player.draw()
    player2.draw()
    refresh_block()
    block.draw()
}

function start(){
    ctx.fillStyle = "#fff"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    player.draw()
    player2.draw()
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
    ctx.fillText("Score - Player 1: " + player['score'] + " Player 2: " + player2['score'], canvas.width/5, canvas.height/1.7)
}

function right_move(p){
    if(p == 0){
        if(player['pos_x'] < canvas.width - player['size']){
            player['pos_x'] += player['velocity']
        }else{
            player['pos_x'] = canvas.width - player['size']
        }
    }else{
        if(player2['pos_x'] < canvas.width - player['size']){
            player2['pos_x'] += player['velocity']
        }else{
            player2['pos_x'] = canvas.width - player['size']
        }
    }
}

function up_move(p){
    if(p == 0){
        if(player['pos_y'] > 0){
            player['pos_y'] -= player['velocity']
        }else{
            player['pos_y'] = 0
        }
    }else{
        if(player2['pos_y'] > 0){
            player2['pos_y'] -= player['velocity']
        }else{
            player2['pos_y'] = 0
        }
    }
}

function left_move(p){
    if(p == 0){
        if(player['pos_x'] > 0){
            player['pos_x'] -= player['velocity']
        }else{
            player['pos_x'] = 0
        }
    }else{
        if(player2['pos_x'] > 0){
            player2['pos_x'] -= player['velocity']
        }else{
            player2['pos_x'] = 0
        }
    }
}

function down_move(p){
    if(p == 0){
        if(player['pos_y'] < canvas.height - player['size']){
            player['pos_y'] += player['velocity']
        }else{
            player['pos_y'] = canvas.height - player['size']
        }
    }else{
        if(player2['pos_y'] < canvas.height - player['size']){
            player2['pos_y'] += player['velocity']
        }else{
            player2['pos_y'] = canvas.height - player['size']
        }
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
        player['score']++
        document.getElementById("tempo").innerHTML = game['time']
        document.getElementById('score_p1').innerHTML = player['score']
    }
    if (player2['pos_x'] == block['pos_x'] && player2['pos_y'] == block['pos_y']){
        refresh_block()
        player2['score']++
        document.getElementById("tempo").innerHTML = game['time']
        document.getElementById('score_p2').innerHTML = player2['score']
    }
}

document.addEventListener("keydown", function(e){
    if(game['keys_pressed'] == 0){
        start()
        refresh_time()
        game['keys_pressed']++
    }
    if(player[e.key]){
        player[e.key](0)
    }
    if(player2[e.key]){
        player2[e.key](1)
    }
})