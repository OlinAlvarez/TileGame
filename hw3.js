
function Tile(type,x,y){
	this.type = type;
	this.x = x;
	this.y = y;
}

function Monster(name,hp,atkOne,atkTwo,atkOnePow, atkTwoPow,x,y){
	this.name = name;
	this.hp = hp;
	this.atkOne = atkOne;
	this.atkTwo = atkTwo;
	this.atkOnePow = atkOnePow;
	this.atkTwoPow =atkTwoPow;
	this.x = x;
	this.y = y;
}

function Prize(type){
	this.type = type;
}

var Hero = {
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
var testMonster = new Monster("test",120,"atk1","atk2",20,20,2,3);
var testPrize = new Prize("hp raise");

console.log(testMonster);

Hero.prizes.push(testPrize);
console.log(Hero);

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
	    console.log(random);
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
	   	temp.push(new Tile("blank",i,j));
	    }
	   
	}
	
        grid.push(temp);
    }

  return grid;       
}
function moveHero(x,y){
	console.log("Accessed movehero fxn");
	if(Hero.x + x < 8 && Hero.y + y < 7 && Hero.x + x >= 0 &&  Hero.y + y >= 0){

		Hero.x += x;
		Hero.y += y;
		//drawBoard();
	}
	else{
		alert("Error invalid move");
	}
	console.log(Hero);
	//evaluation function
}

function checkStatus(x,y){
	if(grid[x][y].type === "monster"){
		grid[x][y].battle();
	}
	else if(grid[x][y].type === "prize"){
		Hero.prizes.push([x][y]);
	}
}

console.log(grid);

