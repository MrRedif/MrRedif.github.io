import '/style.css'

const title = document.getElementById("honor");

var lastUpdate = Date.now();
var updateInterval = setInterval(tick, 0);
function tick() {
 var now = Date.now();
 var dt = now - lastUpdate;
 lastUpdate = now; 
 update(dt);
}
var timer = 0;
var count = 0;

function update(deltaTime){
    timer += deltaTime;
    if(timer > 3000){
        timer = 0;
        count = (count + 1)% 4;
        changeTitle(count)
        console.log(timer);
    }
}

function changeTitle(count){
    switch(count % 2){
        case 0:
            title.textContent = "Bay";
            break;
        case 1:
            title.textContent = "Mr.";
            break;
    }

}