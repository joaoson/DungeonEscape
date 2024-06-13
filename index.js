import maps from "./gameObjects.js";
import { mapBeginning } from "./gameObjects.js";

function randomIntFromInterval(min, max) { 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

document.body.style.zoom = "130%";

let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let fps = 90;

let spriteSheet = new Image()
spriteSheet.src = "./Dungeon_Tileset.png"
let mainCharacter = new Image()
mainCharacter.setAttribute("id","#character")
let HUD = new Image()
HUD.src = "./pixil-frame-0.png"
let Heart = new Image()
Heart.src = "./HUD/Heart.png"
let faceSheet = new Image()
let animationCounter = 0
let currentAnimation = 0
let animationSpeed = 10
let charactersX = 288
let charactersY = 370
let health = 20
let pickingUpAnimation = false;
let combatHUDShow = false;
let exp = 0

var mode = "Introduction"

document.addEventListener("keydown", keyDownHandler, false)
document.addEventListener("keyup", keyUpHandler, false)

let rightPressed = false
let leftPressed = false
let upPressed = false
let downPressed = false

let lastPressed = "down";
let inventoryOpen = false;

let pickedUpItems = []

let backgroundAudio = new Audio()
backgroundAudio.src = "./Musics/2-TheCave.ogg"
backgroundAudio.volume = 0.2;
backgroundAudio.loop = true;
backgroundAudio.autoplay = true;

maps.forEach(element => {
    console.log(element.map)
});

function keyDownHandler(e) {
    if(mode == "Introduction"){
        switch(e.key)
        {
            case "Enter":
                document.getElementById("About").remove()

                backgroundAudio.play()
                document.getElementById("introduction").style.opacity = "0"
                mode = "ChooseCharacter"
                setTimeout(()=>{
                    document.getElementById("introduction").remove()
                },1001)
                break;
    
            case " ":
                backgroundAudio.play()
                document.getElementById("introduction").style.opacity = "0"
                mode = "About"
                setTimeout(()=>{
                    document.getElementById("introduction").remove()
                },1001)
                break;

            default:
                console.log("nope")
                console.log(e.key)
                break;
        }
    }
    else if(mode == "About"){
        switch(e.key)
        {
            case "Enter":
                document.getElementById("About").style.opacity = "0"
                mode = "ChooseCharacter"
                setTimeout(()=>{
                    document.getElementById("About").remove()
                },1001)
                break;
    
            default:
                console.log("nope")
                break;
        }
    }
    else if(mode == "ChooseCharacter"){
        switch(e.key)
        {
            case "Enter":
                
                document.getElementById("characters").style.opacity = "0"
                mode = "Story"
                setTimeout(()=>{
                    document.getElementById("characters").remove()
                },1001)
                break;
    
            default:
                
                console.log("nope")
                break;
        }
    }
    else if(mode == "Story"){
        switch(e.key)
        {
            case "Enter":
                
                document.getElementById("story").style.opacity = "0"
                mode = "Select"
                setTimeout(()=>{
                    document.getElementById("story").remove()
                },1001)
                break;
    
            default:
                console.log("nope")
                break;
        }
    }
    else if(mode == "Select"){
        let getSelectedValue = document.querySelector( 'input[name="character"]:checked').value;  
        switch(e.key)
        {
            case "Enter":
                document.getElementById("charactersSelect").style.opacity = "0"
                mode = "Game"
                mainCharacter.src = getSelectedValue + "SpriteSheet.png"
                faceSheet.src = getSelectedValue + "Faceset.png"
                setTimeout(()=>{
                    document.getElementById("EXP").classList.remove("hidden")

                },1000)
                break;
    
            default:
                playSound("./Sounds/Menu/Menu1.wav")

                console.log(getSelectedValue)
                break;
        }
    }
    else if(mode == "Inventory"){
        switch(e.key)
        {
                case "ArrowUp":
                if (inventorySelectY>109) {
                    inventorySelectY -= 72
                }
                break;

            case "ArrowDown":
                if (inventorySelectY<240) {
                    inventorySelectY += 72
                }
                break;

            case "ArrowLeft":
                if (inventorySelectX>181) {
                    inventorySelectX -= 72
                }
                break;

            case "ArrowRight":
                if (inventorySelectX<397) {
                    inventorySelectX += 72
                }
                break;

            case "c":
                inventoryOpen = false
                mode= "Game"
                break;
    
            default:
                console.log(e.key)  
                break;
        }
    }
    else if(mode == "Combat"){
        switch(e.key)
        {
            case "ArrowLeft":
                if (optionBullet == 278) {
                    playSound("./Sounds/Menu/Menu1.wav")
                    optionBullet -= 104
                }
                else if(optionBullet == 406) {
                    playSound("./Sounds/Menu/Menu1.wav")
                    optionBullet -= 128
                }
                else if(optionBullet == 516) {
                    playSound("./Sounds/Menu/Menu1.wav")
                    optionBullet -= 110
                }
                break;

            case "ArrowRight":
                if (optionBullet == 174) {
                    playSound("./Sounds/Menu/Menu1.wav")
                    optionBullet += 104
                }
                else if(optionBullet == 278) {
                    playSound("./Sounds/Menu/Menu1.wav")
                    optionBullet += 128
                }
                else if(optionBullet == 406) {
                    playSound("./Sounds/Menu/Menu1.wav")
                    optionBullet += 110
                }
                break;
    

            case "Enter":
                if (optionBullet == 174) {
                    console.log("oi")
                    textNumber = 1;
                }
                else if(optionBullet == 278) {
                    console.log("oi")
                    textNumber = 2;
                }
                else if(optionBullet == 406) {
                    textNumber = 3
                    console.log("oi")
                }
                else if(optionBullet == 516) {
                    textNumber = 4
                    console.log("oi")
                }
                break;

            default:
                console.log(e.key)  
                break;
        }
    }
    else{
        switch(e.key)
        {
            case "ArrowUp":
                upPressed = true;
                lastPressed = "up";
                break;
    
            case "ArrowDown":
                downPressed = true;
                lastPressed = "down";
                break;
    
            case "ArrowLeft":
                leftPressed = true;
                lastPressed = "left";
                break;
    
            case "ArrowRight":
                rightPressed = true;
                lastPressed = "right";
                break;
            
            case "c":
                inventoryOpen = true
                mode = "Inventory"
                break;
            default:
                console.log(e.key)
                break;
        }
    }
}

function keyUpHandler(e) {
    switch(e.key)
    {
        case "ArrowUp":
            upPressed = false;
            break;

        case "ArrowDown":
            downPressed = false
            break;

        case "ArrowLeft":
            leftPressed = false
            break;

        case "ArrowRight":
            rightPressed = false;
            break;

        default:
            console.log("nope")
            break;
    }
}

function drawMap(level){
    for (let i = 0; i < level.length; i++) {
        for (let j= 0; j < level[i].length; j++) {
            ctx.drawImage(spriteSheet,(level[i][j]%10)*16,(Math.floor(level[i][j]/10)*16),16,16,j*64,i*64,64,64)
        }
    }
}

function collision(x,y,map){
    for (let i = 0; i < map.length; i++) {
        for (let j= 0; j < map[i].length; j++) {
            console.log(map[i][j]!= 11)
            let walkAbleGround = [11,12,14,21,22,24]
            if(!walkAbleGround.includes(map[i][j])){
                if (x <= j*64 + 60 &&
                    x + 60>= j*64 &&
                    y + 10 <= i*64 + 32 &&
                    y + 64 >= i*64 ) 
                 {
                     return true;
                 }
            }
        }
    }
    return false
}

let pickUpItem = new Image()
let pickUpCounter = 0
function drawCharacther(){
    let speed = 5
    animationCounter++
    pickUpCounter ++

    if(pickingUpAnimation == true){

        animationCounter++;
		if(animationCounter < 300)
		{   
            let pickUpItem = new Image()
            console.log("passou")
            pickUpItem.src = pickedUpItem.src

            ctx.drawImage(pickUpItem, pickedUpItem.imageStartX, pickedUpItem.imageStartY,pickedUpItem.imageSizeX,pickedUpItem.imageSizeY,charactersX- 20,charactersY-50,pickedUpItem.width,pickedUpItem.height);
            //console.log(pickedUpItem.imageStartX, pickedUpItem.imageStartY,pickedUpItem.imageSizeX,pickedUpItem.imageSizeY,charactersX+50,charactersY+50,pickedUpItem.width,pickedUpItem.height)
            ctx.drawImage(mainCharacter,16,96,16,16,charactersX,charactersY,64,64)

		}
		else
		{
			pickingUpAnimation = false;
		}
    }
    

    else{

        if (leftPressed && !collision(charactersX - speed,charactersY,gameMap) && !gameObjectCollisionBlock(charactersX - speed,charactersY,gameObjects,true)) {
            charactersX -= speed
            if(currentAnimation == 0){
                ctx.drawImage(mainCharacter,32,0,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 1){
                ctx.drawImage(mainCharacter,32,16,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 2){
                ctx.drawImage(mainCharacter,32,32,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 3){
                ctx.drawImage(mainCharacter,32,48,16,16,charactersX,charactersY,64,64)
            }
            if(animationCounter >=animationSpeed){
                currentAnimation++
                animationCounter=0
                if(currentAnimation >3){
                    currentAnimation = 0
                }
            }
    
        }
        else if (rightPressed && !collision(charactersX + speed,charactersY,gameMap)&& !gameObjectCollisionBlock(charactersX + speed,charactersY,gameObjects,true)) {
            charactersX += speed
            if(currentAnimation == 0){
                ctx.drawImage(mainCharacter,48,0,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 1){
                ctx.drawImage(mainCharacter,48,16,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 2){
                ctx.drawImage(mainCharacter,48,32,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 3){
                ctx.drawImage(mainCharacter,48,48,16,16,charactersX,charactersY,64,64)
            }
            if(animationCounter >=10){
                currentAnimation++
                animationCounter=0
                if(currentAnimation >3){
                    currentAnimation = 0
                }
            }
        }
        else if (upPressed && !collision(charactersX,charactersY - speed,gameMap) && !gameObjectCollisionBlock(charactersX,charactersY - speed,gameObjects,true)) {
            charactersY -= speed
            if(currentAnimation == 0){
                ctx.drawImage(mainCharacter,16,0,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 1){
                ctx.drawImage(mainCharacter,16,16,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 2){
                ctx.drawImage(mainCharacter,16,32,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 3){
                ctx.drawImage(mainCharacter,16,48,16,16,charactersX,charactersY,64,64)
            }
            if(animationCounter >=10){
                currentAnimation++
                animationCounter=0
                if(currentAnimation >3){
                    currentAnimation = 0
                }
            }
        }
        else if (downPressed && !collision(charactersX,charactersY + speed,gameMap) && !gameObjectCollisionBlock(charactersX,charactersY + speed,gameObjects,true)) {
            charactersY += speed
            if(currentAnimation == 0){
                ctx.drawImage(mainCharacter,0,0,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 1){
                ctx.drawImage(mainCharacter,0,16,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 2){
                ctx.drawImage(mainCharacter,0,32,16,16,charactersX,charactersY,64,64)
            }
            else if(currentAnimation == 3){
                ctx.drawImage(mainCharacter,0,48,16,16,charactersX,charactersY,64,64)
            }
            if(animationCounter >=10){
                currentAnimation++
                animationCounter=0
                if(currentAnimation >3){
                    currentAnimation = 0
                }
            }
        }
        else{
            if (lastPressed == "up") {
                ctx.drawImage(mainCharacter,16,0,16,16,charactersX,charactersY,64,64)
            } 
            else if (lastPressed == "down") {
                ctx.drawImage(mainCharacter,0,0,16,16,charactersX,charactersY,64,64)
            } 
            else if (lastPressed == "left") {
                ctx.drawImage(mainCharacter,32,0,16,16,charactersX,charactersY,64,64)
            } 
            else if(lastPressed == "right") {
                ctx.drawImage(mainCharacter,48,0,16,16,charactersX,charactersY,64,64)
            } 
    
        }
    }

}
function gameObjectCollision(x, y, objects, isCharacther)
{
	if(isCharacther)
	{
		for(let i = 0; i < objects.length; i++)
		{
			if(x<= objects[i].x + objects[i].width &&
			x + 70  >= objects[i].x &&
			y <= objects[i].y + objects[i].height &&
			y + 40 >= objects[i].y)
            
			{
				if(objects[i].isPortal)
				{
					gameMap = maps[objects[i].newMap].map;
                    gameObjects = maps[objects[i].newMap].gameobjects
					charactersX = objects[i].newCharX;
					charactersY = objects[i].newCharY;
                    return false
				}
			}
		}
	}
    return false
}
let pickedUpItem = "";
let enemy = "";

function gameObjectCollisionBlock(x, y, objects, isCharacther)
{
	if(isCharacther)
	{
		for(let i = 0; i < objects.length; i++)
		{
			if(x + 32<= objects[i].x + objects[i].width &&
			x + 64 >= objects[i].x +32&&
			y +32 <= objects[i].y + objects[i].height &&
			y +64 >= objects[i].y + 10)
			{
				if(objects[i].isCollidable){
                    return true
                }
                else if(objects[i].isPickUpable){
                    pickingUpAnimation = true;
                    pickedUpItem = objects[i]
                    pickedUpItems.push(pickedUpItem)
                    console.log(pickedUpItems)
                    objects.splice(i,1);
                    playSound("./Sounds/Game/Success3.wav")
                }
                else if(objects[i].isEnemy){
                    combatHUDShow = true;
                    enemy = objects[i];
                    mode = "Combat"
                    objects.splice(i,1);
                    backgroundAudio.src = './Musics/17 - Fight.ogg'
                    backgroundAudio.play()
                }
			}
		}
	}
    return false
}
let objectAnimationCounter = 0;
let objectCurrentAnimation = 0;


function drawObjects(){
    for(let i = 0; i < gameObjects.length; i++)
	{
        if(gameObjects[i].isText)
		{
			ctx.fillStyle = "white";
			ctx.font = "30px NormalFont";
			ctx.fillText(gameObjects[i].textContent, gameObjects[i].x, gameObjects[i].y,gameObjects[i].width);
		}
        else if(gameObjects[i].isImage){
            let objectImage = new Image()
            if(gameObjects[i].hasAnimation){
                objectAnimationCounter++;
                if(gameObjects[i].isCandle){
                    if(objectCurrentAnimation == 0){
                        objectImage.src = `candlestick_1_${objectCurrentAnimation + 1}.png`
                        ctx.drawImage(objectImage, 0, 0,16,16,gameObjects[i].x,gameObjects[i].y,64,64);
                    }
                    else if(objectCurrentAnimation == 1){
                        objectImage.src = `candlestick_1_${objectCurrentAnimation + 1}.png`
                        ctx.drawImage(objectImage, 0, 0,16,16,gameObjects[i].x,gameObjects[i].y,64,64);
                    }
                    else if(objectCurrentAnimation == 2){
                        objectImage.src = `candlestick_1_${objectCurrentAnimation + 1}.png`
                        ctx.drawImage(objectImage, 0, 0,16,16,gameObjects[i].x,gameObjects[i].y,64,64);
                    }
                    else if(objectCurrentAnimation == 3){
                        objectImage.src = `candlestick_1_${objectCurrentAnimation + 1}.png`
                        ctx.drawImage(objectImage, 0, 0,16,16,gameObjects[i].x,gameObjects[i].y,64,64);
                    }
                }
                if(objectAnimationCounter >=20){
                    objectCurrentAnimation++
                    objectAnimationCounter=0
                    if(objectCurrentAnimation >= gameObjects[i].animationFrames){
                        objectCurrentAnimation = 0
                    }
                }
            }   
            else{
                objectImage.src = gameObjects[i].src
                ctx.drawImage(objectImage, gameObjects[i].imageStartX, gameObjects[i].imageStartY,gameObjects[i].imageSizeX,gameObjects[i].imageSizeY,gameObjects[i].x,gameObjects[i].y,gameObjects[i].width,gameObjects[i].height);
            }
        }
    }

}

let inventorySelectX = 181
let inventorySelectY = 168

function drawHUD(){
    let heartCounter = Math.floor(health/4)
    if(inventoryOpen == true){
        ctx.drawImage(HUD,0,0,300,300,170,90,300,300)
        ctx.drawImage(faceSheet,0,0,38,38,181,315,64,64)
        for(let Item in pickedUpItems){
            let imagemHUD = new Image()
            imagemHUD.src = pickedUpItems[Item].src
            ctx.drawImage(imagemHUD, pickedUpItems[Item].imageStartX, pickedUpItems[Item].imageStartY,pickedUpItems[Item].imageSizeX,pickedUpItems[Item].imageSizeY,201,168-70,pickedUpItems[Item].width,pickedUpItems[Item].height);
        }
        ctx.beginPath();
        ctx.rect(inventorySelectX, inventorySelectY, 64, 64);
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.stroke();
    }
    else{
        for (let index = 0; index < Math.floor(health/4); index++) {
            ctx.drawImage(Heart,0,0,16,16,index*32 +64,10,32,32)      
        }
        if(health%4 != 0){
            ctx.drawImage(Heart,(4-health%4)*16,0,16,16,heartCounter*32+64,10,32,32)   
        }
    }
}
let combatBackground = new Image()
combatBackground.src = "./New Project (1).png"
let optionBullet = 174
let textNumber = 0
let actionCounter = 0
let mercyExitFinal = []

function combatHUD(){
    if(combatHUDShow == true){
        ctx.drawImage(combatBackground,0,0,640,576,0,0,640,576)
        let enemySprite = new Image()
        enemySprite.src = enemy.src
        ctx.drawImage(enemySprite,0,0,16,16,288,220,64,64)
        ctx.beginPath();
        ctx.rect(168, 320, 462, 128);
        ctx.lineWidth = "5";
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.drawImage(faceSheet,0,0,38,38,20,320,128,128)
        ctx.beginPath();
        ctx.rect(20, 320, 128, 128);
        ctx.fillStyle = "white"
        ctx.fillRect(165,448,468,60)
        ctx.lineWidth = "6";
        ctx.strokeStyle = "red";
        ctx.stroke();
        ctx.fillStyle = "white";
		ctx.font = "10px NormalFont";
        ctx.wordSpacing = "10px";
        if(textNumber == 0){
            let speachEnemy = `${enemy.enemy.name} : ${enemy.randomPhrase1}`
            ctx.fillText(speachEnemy, 188, 340,420);
        }
        if(textNumber == 1){
            attackingEnemy()
        }
        else if(textNumber == 2){
            let speachEnemy = `Name : ${enemy.enemy.name}\nHealth : ${enemy.enemy.health}\nAttack : ${enemy.enemy.damage}\nArmor : ${enemy.enemy.armor}`
            var lineheight = 15;
            var lines = speachEnemy.split('\n');

            for (var i = 0; i<lines.length; i++){

                ctx.fillText(lines[i], 188, 340 + (i*lineheight),420);
            }

        }
        else if(textNumber == 3){
            var lineheight = 15;
            if(pickedUpItems.length == 0){
                let speachEnemy = "You have no items in your backpack"
                ctx.fillText(speachEnemy, 188, 340,420);
            }
            for(let Item in pickedUpItems){
                ctx.fillText(pickedUpItems[Item].itemName, 188, 340 + (Item*lineheight),420);
            }
        }
        else if(textNumber == 4){
            if(actionCounter == 0){
                actionCounter ++
                var mercyExit = randomIntFromInterval(1,20)
                mercyExitFinal.push(mercyExit)
                ctx.fillText("You chose Mercy", 188, 340,420);
                ctx.fillText("Roling your dice to escape, you will need to roll at least a 12", 188, 340 + 15,420);
                ctx.fillText(`You have roled a ${mercyExitFinal[0]}`, 188, 340 + 30,420);
            }
            else{
                ctx.fillText("You chose Mercy", 188, 340,420);
                ctx.fillText(`Roling your dice to escape, you will need to roll at least a ${20 - enemy.enemy.luck}`, 188, 340 + 15,420);
                ctx.fillText(`You have roled a ${mercyExitFinal[0]}`, 188, 340 + 30,420);
            }

            if(mercyExitFinal[0] > 10){
                ctx.fillText(`You were able to escape successfully`, 188, 340 + 45,420);
                setTimeout(()=>{
                    mode = "Game"
                    combatHUDShow = false
                    actionCounter =0
                    backgroundAudio.src = "./Musics/2-TheCave.ogg"
                },5000)
            }
            else{
                ctx.fillText(`You were unable to escape`, 188, 340 + 45,420);
                setTimeout(()=>{
                    mode = "AttackHappening"
                    optionBullet = 174
                    actionCounter =0
                    mercyExitFinal = []
                    textNumber = 5
                    mode = "Combat"
                },5000)
            }
        }
        else if(textNumber == 5){
            enemyAttack()
        }

        let fightButton = new Image()
        fightButton.src = './Fight-9-2-2023.png'
        ctx.drawImage(fightButton,0,0,554,287,173,458,110,56)
        let statusButton = new Image()
        statusButton.src = './Status-9-2-2023.png'
        ctx.drawImage(statusButton,0,0,710,270,278,458,130,53)
        let itemsButton = new Image()
        itemsButton.src = './Item-9-2-2023.png'
        ctx.drawImage(itemsButton,0,0,503,253,408,458,110,53)
        let mercyButton = new Image()
        mercyButton.src = './Mercy-9-2-2023.png'
        ctx.drawImage(mercyButton,0,0,668,294,518,458,125,56)
        let healthStatus = `Health: ${health}`
        ctx.font = "15px NormalFont";
		ctx.fillText(healthStatus, 20, 468,128);
        ctx.beginPath();
        ctx.arc(optionBullet, 482, 4, 0, 2 * Math.PI, false);
        ctx.fillStyle = '#e2da14ff';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#dc3a05ff';
        ctx.stroke();
    }
}

function playSound(source)
{
	let sound = new Audio();
	sound.src = source;
	sound.play();
}

let defenseDiceFinal  = []
let attackDiceFinal = []
let healthDecrease = true;
let enemyWillAttack = true;
let enemyAttackOnce = true;
var actionCounterDefesa = 0
let defenseDiceFinal2  = []
let attackDiceFinal2 = []

function enemyAttack()
{
    mode = "AttackHappening"
	ctx.fillText(`${enemy.enemy.name} is attacking you`, 188, 340,420);
    if(actionCounterDefesa == 0){
        actionCounterDefesa += actionCounterDefesa + 1
        var defenseDice = randomIntFromInterval(1,20)
        defenseDiceFinal2.push(defenseDice)

        ctx.fillText("Roling your dice to defend", 188, 340 + 15,420);
        ctx.fillText(`You have roled a ${defenseDiceFinal2[0]}`, 188, 340 + 30,420);
        var attackDice = randomIntFromInterval(1,20)
        attackDiceFinal2.push(attackDice)
        ctx.fillText(`${enemy.enemy.name} is rolling the dice to attack you`, 188, 340 + 45,420);
        ctx.fillText(`${enemy.enemy.name} has roled a ${attackDiceFinal2[0]}`, 188, 340 + 60,420);
        console.log(attackDiceFinal2[0],defenseDiceFinal2[0])
    }
    else{
        ctx.fillText("Roling your dice to defend", 188, 340 + 15,420);
        ctx.fillText(`You have roled a ${defenseDiceFinal2[0]}`, 188, 340 + 30,420);
        ctx.fillText(`${enemy.enemy.name} is rolling the dice to attack you`, 188, 340 + 45,420);
        ctx.fillText(`${enemy.enemy.name} has roled a ${attackDiceFinal2[0]}`, 188, 340 + 60,420);
    }
    console.log(attackDiceFinal2[0],defenseDiceFinal2[0])
    if(attackDiceFinal2[0] > defenseDiceFinal2[0]){
        ctx.fillText(`The attack was succesful. You have suffered ${enemy.enemy.damage} damage`, 188, 340 + 75,420);
        console.log("Bateu")
        if(healthDecrease == true){
            healthDecrease = false
            if(enemyAttackOnce == true){
                enemyAttackOnce = false
                health = health - enemy.enemy.damage
                setTimeout(()=>{
                    mode = "AttackHappening"
                    actionCounterDefesa = 0
                    defenseDiceFinal2 = []
                    attackDiceFinal2 = []    
                    textNumber = 0
                    mode = "Combat"
                    healthDecrease = true
                    enemyWillAttack = true
                    enemyAttackOnce = true
                },5000)
            }
        }
    }
    else{
        ctx.fillText(`You have defended successfully.`, 188, 340 + 75,420);
        if(enemyAttackOnce == true){
            enemyAttackOnce = false
            setTimeout(()=>{
                mode = "AttackHappening"
                actionCounterDefesa = 0
                defenseDiceFinal2 = []
                attackDiceFinal2 = []    
                textNumber = 0
                mode = "Combat"
                healthDecrease = true
                enemyWillAttack = true
                enemyAttackOnce = true
            },5000)
        }
    }
}

function attackingEnemy()
{
    mode = "AttackHappening"
	ctx.fillText(`You are attacking ${enemy.enemy.name}`, 188, 340,420);
    if(actionCounter == 0){
        actionCounter ++
        var defenseDice = randomIntFromInterval(1,20)
        defenseDiceFinal.push(defenseDice)
        ctx.fillText(`${enemy.enemy.name} is rolling the dice to defend`, 188, 340 + 15,420);
        ctx.fillText(`${enemy.enemy.name} has roled a ${defenseDiceFinal[0]}`, 188, 340 + 30,420);
        var attackDice = randomIntFromInterval(1,20)
        attackDiceFinal.push(attackDice)
        ctx.fillText(`Roling your dice to attack`, 188, 340 + 45,420);
        ctx.fillText(`You have roled a ${attackDiceFinal[0]}`, 188, 340 + 60,420);
    }
    else{
        ctx.fillText(`${enemy.enemy.name} is rolling the dice to defend`, 188, 340 + 15,420);
        ctx.fillText(`${enemy.enemy.name} has roled a ${defenseDiceFinal[0]}`, 188, 340 + 30,420);
        ctx.fillText(`Roling your dice to attack`, 188, 340 + 45,420);
        ctx.fillText(`You have roled a ${attackDiceFinal[0]}`, 188, 340 + 60,420);
    }
    if(attackDiceFinal[0] > defenseDiceFinal[0]){
        ctx.fillText(`The attack was succesful. You have dealt ${attackDiceFinal[0]} damage`, 188, 340 + 75,420);
        if(healthDecrease == true){
            enemy.enemy.health = enemy.enemy.health - attackDiceFinal[0]
            healthDecrease = false
            setTimeout(()=>{
                mode = "AttackHappening"
                healthDecrease = true
                actionCounter = 0
                defenseDiceFinal = []
                attackDiceFinal = []    
                if(enemy.enemy.health >0){
                    mode = "Combat"
                }
                else{
                    exp += 500
                    document.getElementById("EXP").innerHTML = `EXP: ${exp}`
                    mode = "Game"
                    combatHUDShow = false
                    actionCounter =0
                    backgroundAudio.src = "./Musics/2-TheCave.ogg"
                }
            },5000)
        }
    }
    else{
        ctx.fillText(`Your attack has failed`, 188, 340 + 75,420);
        setTimeout(()=>{
            mode = "AttackHappening"
            healthDecrease = true
            actionCounter = 0
            defenseDiceFinal = []
            attackDiceFinal = []    
            mode = "Combat"
        },5000)
    }
    if(enemyWillAttack == true){
        console.log("rodou")
        enemyWillAttack = false
        setTimeout(()=>{
            textNumber = 5
        },5000)
    }
}
function drawMapBeginning(level){
    for (let i = 0; i < level.length; i++) {
        for (let j= 0; j < level[i].length; j++) {
            ctx.drawImage(spriteSheetBeginning,(level[i][j]%20)*16,(Math.floor(level[i][j]/20)*16),16,16,j*64,i*64,64,64)
        }
    }
}
let caverna = new Image()
caverna.src = "./TilesetReliefDetail.png"
function drawCavern(x,y){
    ctx.drawImage(caverna,0,112,48,56,195,0,250,350)
    if(x + 32<= 195 + 250 &&
        x + 64 >= 195 +32&&
        y +32 <= 0 + 200 &&
        y >= 0 + 10)
        {
            console.log("oi")
            beginningMap = false
            charactersX = 288
            charactersY = 300
        }
}

let spriteSheetBeginning = new Image()
spriteSheetBeginning.src = "./TilesetRelief.png"

window.devicePixelRatio=4
let gameMap = maps[0].map;
console.log(gameMap)
let gameObjects = maps[0].gameobjects;
let beginningMap = true

function draw(){
    setTimeout(function() {
        ctx.imageSmoothingEnabled = false;
        requestAnimationFrame(draw);
        ctx.fillStyle = "#25131a"
        ctx.fillRect(0,0,640,576)
        if(beginningMap == true){
            let gameMapBeginning = mapBeginning[0].map
            drawMapBeginning(gameMapBeginning)
            drawCavern(charactersX, charactersY)
            drawCharacther()
        }
        else{
            if(health > 0 ){
                drawMap(gameMap)
                drawObjects()
                drawCharacther()
                drawHUD()
                combatHUD()
                gameObjectCollision(charactersX,charactersY,gameObjects,true)
            }
            else{
                let gameOver = new Image()
                gameOver.src = "./Game-Over-9-4-2023.png"
                ctx.drawImage(gameOver,0,0,800,256,120,90,400,128)
            }
        }
        },1000/fps);
}

draw()