var directionalButtonsString ="<div id=\"buttonField\">"
   + " <button type=\"button\" id=\"NW\" onClick = \"moveHero(-1,-1)\" >Northwest</button>"
   + " <button type=\"button\" id=\"NE\" onClick = \"moveHero(-1,1)\" >NorthEast</button>"
   + " <button type=\"button\" id=\"SW\" onClick = \"moveHero(1,-1)\" >Southwest</button>"
   + " <button type=\"button\" id=\"SE\" onClick = \"moveHero(1,1)\" >Southeast</button>"
   + " <button type=\"button\" id=\"DW\" onClick = \"moveHero(-1,0)\" >Due West</button>"
   + " <button type=\"button\" id=\"DE\" onClick = \"moveHero(1,0)\" >Due East</button> </div>";
var combatButtonsString ="<button type=\"button\" id=\"Attack\">Attack</button>"
                  +"<button type=\"button\" id=\"Run\">Run</button>";
console.log(combatButtonsString);
function Monster(name,hp,atkOne,atkTwo,atkOnePow, atkTwoPow,x,y){
	this.name = name;
	this.hp = hp;
	this.atkOne = atkOne;
	this.atkTwo = atkTwo;
	this.atkOnePow = atkOnePow;
	this.atkTwoPow =atkTwoPow;
	this.x = x;
	this.y = y;
	this.type = "monster";
}

function Prize(effect){
	this.effect = effect;
	this.type = "prize";
}

var hero = {
	name : "Olin",
	attack : "Sword Slash",
	power : 15,
	hp : 120,
	prizes : [],
	usePrize: function(type){
		if(prizes.length != 0){
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
	},
	x:0,
	y:0
}
var grid = generateGrid();

function generateGrid(){

    var grid = [];
    var temp = [];
    var monsterCounter = 0;
    var prizeCounter = 0;
    var random = 0;
 
    for(var i =0; i < 8; i++){
        temp = [];
        for(var j = 0; j < 8 ; j++){
            random = Math.floor(Math.random() * 2);
	    
	   if(random === 0 && monsterCounter < 4){
		if(monsterCounter == 0){
		    temp.push(new Monster("Dragon",120,"Fire Breath","Tail Slap",30,15,i,j));
		    monsterCounter++;
	    	}
		else if(monsterCounter == 1){
		   temp.push(new Monster("Goblin",70,"Slash","Bite",20,10,i,j));
		    monsterCounter++;
		}
		else {
		   temp.push(new Monster("Master Dragon",180,"Fire Breath","Bite",44,20,i,j));
		    monsterCounter++;
		}
	    }
            else if(random === 1 && prizeCounter < 4){
	       if(j % 4 === 0){
		  temp.push(new Prize("hp raise"));
		  prizeCounter++;
		}
		else if(j % 4 === 1){
		  temp.push(new Prize("upgrade armour"));
		  prizeCounter++;
		}
		else if(j % 4 === 0){
		  temp.push(new Prize("upgrade weapon"));
		  prizeCounter++;
		}
		else
		  temp.push(new Prize("upgrade attack"));
		  prizeCounter++;
            }
	    else{
	   	temp.push("blank");
	    }
	   
	}
	
        grid.push(temp);
    }

  return grid;       
}
function moveHero(x,y){
	if(hero.x + x < 8 && hero.y + y < 7 && hero.x + x >= 0 &&  hero.y + y >= 0){

		hero.x += x;
		hero.y += y;
		//drawBoard();
	}
	else{
		alert("Error invalid move");
	}

	//evaluation function needs be
}

function checkStatus(x,y){
	if(grid[x][y].type === "monster"){
		battle(grid[x][y]);
	}
 	else if(grid[x][y].type === "prize"){
		hero.prizes.push([x][y]);
	}
 	else if(grid[x][y].type === "win"){
		alert("YOU WIN");
	}
}
var monster = new Monster("test",50,"atk1","atk2",20,20,1,2);
battle(monster);

function battle(monster){
    //alert("battle beginning");
    var buttons = document.getElementById("buttonField");
    buttons.innerHTML = combatButtonsString;
    
    var attackButton = document.getElementById("Attack");
    attackButton.addEventListener(onclick, fight());
    
    var runButton = document.getElementById("Run");
    runButton.addEventListener(onclick,flee());
    
    var die;

}
function fight(){
    die = probability(3);
    if(die != 6){
        monster.hp -= hero.power;
        console.log(monster.hp);
    }
    if(monster.hp < 1){
        alert("You defeated " + monster.name);
        document.clear();
        buttons.innerHTML = directionalButtonsString;
    }
        monsterAttack();
}
function flee(){
        die =  probability(3)
        if(die != 2){
            alert("Got away successfully");
            buttons.innerHTML = directionalButtonsString;
        }else{
            alert("Escape failed");
            monsterAttack();
        }
}
function monsterAttack(){
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
function probability(index){ 
    return Math.floor(Math.random() * index);
}
console.log(grid);

