import Mapa from "./Map.js";
import GameObject from "./gameObject.js";
import MapBundle from "./Bundle.js";
import { MapaBeginning } from "./Map.js";
import Enemy from "./Enemy.js";

let mapaBeginning = new MapaBeginning
let mapa = new Mapa;

let objectsStart = []
let maps = []

let gO = new GameObject(256,0,64,64,1,256,345,true)
objectsStart.push(gO)
gO = new GameObject(320,0,64,64,1,320,345,true)
objectsStart.push(gO)
gO = new GameObject(260,120,120,120,0,0,0,false)
gO.isImage = true
gO.src = "./HUD/Tuto.png"
gO.imageSizeX = 40
gO.imageSizeY = 40
objectsStart.push(gO)
console.log(gO)
gO = new GameObject(120,110,400,64,0,0,0,false)
gO.isText = true;
gO.textContent = "Press  the  arrow  keys  to  move"
objectsStart.push(gO)
let bundle = new MapBundle(mapa.mapa0,objectsStart)
maps.push(bundle)

objectsStart = []

gO = new GameObject(256,0,64,64,2,256,345,true)
objectsStart.push(gO)
gO = new GameObject(320,0,64,64,2,320,345,true)
objectsStart.push(gO)
gO = new GameObject(120,240,400,64,0,0,0,false)
gO.isText = true;
gO.textContent = "A  dangerous  journey  awaits  you"
objectsStart.push(gO)
gO = new GameObject(320,384,64,64,0,320,80,true)
objectsStart.push(gO)
gO = new GameObject(256,384,64,64,0,256,80,true)
objectsStart.push(gO)
gO = new GameObject(64,64,64,64,0,0,0,false)
gO.isImage = true
gO.src = "./candlestick_1_1.png"
gO.hasAnimation = true
gO.animationFrames = 4
gO.isCandle = true;
gO.isCollidable = true
objectsStart.push(gO)
gO = new GameObject(512,64,64,64,0,0,0,false)
gO.isImage = true
gO.src = "./candlestick_1_1.png"
gO.hasAnimation = true
gO.animationFrames = 4
gO.isCandle = true;
gO.isCollidable = true
objectsStart.push(gO)
gO = new GameObject(64,384,64,64,0,0,0,false)
gO.isImage = true
gO.src = "./candlestick_1_1.png"
gO.hasAnimation = true
gO.animationFrames = 4
gO.isCandle = true;
gO.isCollidable = true
objectsStart.push(gO)
gO = new GameObject(512,384,64,64,0,0,0,false)
gO.isImage = true
gO.src = "./candlestick_1_1.png"
gO.hasAnimation = true
gO.animationFrames = 4
gO.isCandle = true;
gO.isCollidable = true
objectsStart.push(gO)
bundle = new MapBundle(mapa.mapa1,objectsStart)
maps.push(bundle)

objectsStart = []

gO = new GameObject(320,384,64,64,1,320,80,true)
objectsStart.push(gO)
gO = new GameObject(256,384,64,64,1,256,80,true)
objectsStart.push(gO)
gO = new GameObject(312,230,24,60,0,0,0,false)
gO.imageSizeX = 6;
gO.imageSizeY = 15;
gO.isImage = true;
gO.src = "./Sword2/Sprite.png";
gO.isPickUpable = true;
gO.itemName = "Short Sword"
objectsStart.push(gO)
gO = new GameObject(120,110,400,64,0,0,0,false)
gO.isText = true;
gO.textContent = "Press  c  to  open  inventory"
objectsStart.push(gO)
gO = new GameObject(0,256,64,64,3,496,256,true)
objectsStart.push(gO)
gO = new GameObject(0,192,64,64,3,496,192,true)
objectsStart.push(gO)
bundle = new MapBundle(mapa.mapa2,objectsStart)
maps.push(bundle)

objectsStart = []

gO = new GameObject(576,256,64,64,2,84,256,true)
objectsStart.push(gO)
gO = new GameObject(576,192,64,64,2,84,192,true)
objectsStart.push(gO)
gO = new GameObject(288,230,64,64,0,0,0,false)
gO.isEnemy =true;
gO.enemy = new Enemy("Bamboomzi",20,12,8,5)
gO.imageSizeX = 16;
gO.imageSizeY = 16;
gO.isImage = true;
gO.src = "./Monsters/Bamboo/SpriteSheet.png";
gO.randomPhrase1 = "The world is full of evil out there, you can't win against me"
gO.randomPhrase2 = "I dont want to fight you but I cannot let you go freely"
gO.randomPhrase3 = "This is a matter of life and death, please understand"
objectsStart.push(gO)
gO = new GameObject(256,0,64,64,4,256,345,true)
objectsStart.push(gO)
gO = new GameObject(320,0,64,64,4,320,345,true)
objectsStart.push(gO)


bundle = new MapBundle(mapa.mapa3,objectsStart)
maps.push(bundle)

objectsStart = []

gO = new GameObject(320,384,64,64,3,320,80,true)
objectsStart.push(gO)
gO = new GameObject(256,384,64,64,3,256,80,true)
objectsStart.push(gO)
gO = new GameObject(288,230,64,64,0,0,0,false)
gO.isEnemy =true;
gO.enemy = new Enemy("Ciclopets",20,5,15,15)
gO.imageSizeX = 16;
gO.imageSizeY = 16;
gO.isImage = true;
gO.src = "./Monsters/Cyclope/SpriteSheet.png";
gO.randomPhrase1 = "I can see you muahahaha."
gO.randomPhrase2 = "I will taste your blood."
gO.randomPhrase3 = "Are you ready to bite the dust?"
objectsStart.push(gO)

bundle = new MapBundle(mapa.mapa4,objectsStart)
maps.push(bundle)

export default maps;

objectsStart= []
gO = new GameObject(312,230,24,60,0,0,0,false)
gO.imageSizeX = 6;
gO.imageSizeY = 15;
gO.isImage = true;
gO.src = "./Sword2/Sprite.png";
gO.isPickUpable = true;
gO.itemName = "Short Sword"
objectsStart.push(gO)
bundle = new MapBundle(mapaBeginning.mapa0,objectsStart)
let mapBeginning = []
mapBeginning.push(bundle)

export {mapBeginning};
