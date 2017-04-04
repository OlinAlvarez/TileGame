var combatButtonsString ="<button type=\"button\" id=\"Attack\">Attack</button>"
                  +"<button type=\"button\" id=\"Run\">Run</button>"
                  +"<button type=\"button\" id=\"Item\">Use Item</button>";
var canvasString = "<canvas id = \"gameGrid\" width = \"600\" height = \"400\"></canvas>";

var cnvs = document.getElementById("cnvs");
function Monster(name,hp,atkOne,atkTwo,atkOnePow, atkTwoPow){
	this.name = name;
	this.hp = hp;
	this.atkOne = atkOne;
	this.atkTwo = atkTwo;
	this.atkOnePow = atkOnePow;
	this.atkTwoPow =atkTwoPow;
	this.type = "monster";
    this.accessed = false;
}

function Prize(effect){
	this.effect = effect;
	this.type = "prize";
    this.accessed = false;
}

function temp(){
    if(hero.name === "Olin"){
        alert("Olin is your hero");
    }    
    else
        alert(hero.name);
}

var hero = {
	name : "Olin",
	attack : "Sword Slash",
	power : 15,
	hp : 120,
    maxHp:120,
	prizes : [],
	x:0,
	y:0
}
function usePrize(type){
		if(hero.prizes.length != 0){
			if(type === "hp raise"){
			 this.hp = hp + 20;
			}
			else if(type === "upgrade attack"){
			 this.power = power + 10;
			}
			else if(type === "upgrade weapon"){
		         this.power = power + 20;
			}
			else if(type === "upgrade armour"){
			 this.hp = hp + 45;
			}
		}
}
var grid = generateGrid();

function generateGrid(){

    
     blank = {
        type: "blank",
        accessed: false
     }
     win = {
        type:"win"
     };
     var dragon = new Monster("Dragon",120,"Fire Breath","Tail Slap",30,15);
     var goblin = new Monster("Goblin",70,"Slash","Bite",20,10);
     var masterDragon = new Monster("Master Dragon",180,"Fire Breath","Bite",44,20);
     var hpRaise = new Prize("hp raise");   
     var upgradeArmour = new Prize("upgrade armour");
     var upgradeWeapon = new Prize("upgrade weapon");
     var upgradeAttack = new Prize("upgrade attack");
     
     var grid = [
        [blank,blank,blank,blank,blank,blank,blank,blank],
        [blank,blank,goblin,blank,blank,hpRaise,blank,masterDragon,win],
        [blank,blank,blank, blank,blank,blank,blank,blank],
        [blank, blank, dragon, blank,blank,blank,blank,blank],
        [blank,blank,blank,blank,upgradeArmour,blank,blank,blank],
        [upgradeWeapon,blank,blank,blank,blank,blank,blank,blank],
        [blank,blank,blank,blank,goblin,blank,blank,blank],
        [blank,blank,blank,goblin,blank,blank,upgradeAttack,blank],   
    ];
  
  return grid;       

}
paint();
function paint(){
    
    var gameGrid = document.getElementById("gameGrid");
    var context = gameGrid.getContext('2d');
    //if it's ture make the color brown, else it's gray, unelse it's where
    //hero is then it's red.
    var xSpacing =0;
    var ySpacing =0;
    for(var i = 0; i < 8; i++){
        xSpacing =0;
        for(var j = 0; j < 8; j++){
            
             if(grid[i][j].accessed === false){
                 if(hero.x == i && hero.y == j)
                   context.fillStyle = 'red';
                else
                    context.fillStyle = 'grey';
            }
            else{
                console.log("xdfasdf");
                context.fillStyle = 'peru';
            }

            context.fillRect(xSpacing,ySpacing, 40, 40);
            xSpacing += 45;
        }
        ySpacing +=45;
    }
}

document.onkeydown = checkKey;
function checkKey(e){

    e = e || window.event;

    if (e.keyCode == '38') {
       
       //up
        moveHero(-1,0);
    }
    else if (e.keyCode == '40') {
        //down
        moveHero(1,0);
    }
    else if (e.keyCode == '37') {
        // left 
        moveHero(0,-1);
    }
    else if (e.keyCode == '39') {
       // right
        moveHero(0,1);
     }
 }
  
function moveHero(x,y){
	if(hero.x + x < 8 && hero.y + y < 8 && hero.x + x >= 0 &&  hero.y + y >= 0){

		hero.x += x;
		hero.y += y;
	}
	else{
		alert("Error invalid move");
	}
    checkStatus(hero.x,hero.y);
}

function checkStatus(x,y){
	if(grid[x][y].type === "monster"){
       if(grid[x][y].hp > 1){
            alert("Prepare for battle");
            cnvs.innerHTML = ""; 
            battle(grid[x][y]);
        }
	}
 	else if(grid[x][y].type === "prize"){
		hero.prizes.push([x][y]);
        alert("found a power up " + grid[x][y].effect);
	}
 	else if(grid[x][y].type === "win"){
		alert("YOU WIN");
	}
    paint();
}
function battle(monster){
    cnvs.innerHTML = cnvs.innerHTML + "<br>"
                   + "<b> Monsters health " + monster.hp + "</b>"
                   + "<br>Your health " + hero.hp + " </b>";
    var buttons = document.getElementById("buttonField");
    buttons.innerHTML = combatButtonsString;
    
    var attackButton = document.getElementById("Attack");
    attackButton.addEventListener("click", function(){
       
        die = probability(6);
        if(die != 6){
            alert(hero.attack + " used \n" + hero.power + " Damage inflicted!");
            monster.hp -= hero.power;
            
        }else{
            alert("Attack Missed");
        }
        if(monster.hp < 1){
            alert("You defeated " + monster.name);
            document.clear();
            buttons.innerHTML = "";
            cnvs.innerHTML = canvasString;
            paint();
        }else
            monsterAttack(monster);
    });
    var runButton = document.getElementById("Run");
    runButton.addEventListener("click",function(){   
        die =  probability(3)
        if(die != 2){
            alert("Got away successfully");
            buttons.innerHTML = "";
            cnvs.innerHTML = canvasString;
            paint();
        }else{
            alert("Escape failed");
            monsterAttack(monster);
        }
    });
}

monsterAttack = function(monster){
    var coin =probability(2);
    die = probability(8);
        if(die != 3){
            if(coin == 1){
                    hero.hp -= monster.atkOnePow;
                    alert(monster.name+" inflicted " + monster.atkOnePow + " damage"); 
                    battle(monster);
            }else{
                    hero.hp -= monster.atkTwoPow;
                    alert(monster.name+" inflicted " + monster.atkTwoPow + " damage"); 
                    battle(monster);
            }
        }else{
            alert(monster.name+"\'s attack missed!");    
        }
    if(hero.hp < 1){
        alert("You're dead!");
        document.reload();
    }
 }
probability = function(index){ 
    return Math.floor(Math.random() * index);
}


