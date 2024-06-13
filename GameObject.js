import Enemy from "./Enemy.js";

export default class GameObject{
    constructor(x,y,width,height,newMap,newCharX,newCharY,isPortal){
        this.x = x;
	    this.y = y;
	    this.width = width;
	    this.height = height;
	    this.newMap = newMap;
	    this.newCharX = newCharX;
	    this.newCharY = newCharY;
	    this.isPortal = isPortal;
    }

	isText = false;
	textContent = "";

	isImage = false;
	src = "";
	imageStartX = 0;
	imageStartY = 0;
	imageSizeX = 16;
	imageSizeY = 16;
	hasAnimation = false;
	animationFrames = 0;
	isCandle = false;

	isCollidable = false;

	isPickUpable =false;
	itemName = ""

	isEnemy = false;
	enemy = "";
	randomPhrase1 = ""
	randomPhrase2 = ""
	randomPhrase3 = ""
}