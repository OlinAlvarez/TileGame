
function Tile(x,y){

    this.x = x;
    this.y = y;
}

function Monster(name,hp,atkOne,atkTwo,atkOnePow, atkTwoPow){
	this.name = name;
	this.hp = hp;
	this.atkOne = atkOne;
	this.atkTwo = atkTwo;
	this.atkOnePow = atkOnePow;
	this.atkTwoPow =atkTwoPow;
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
		if(prizes.length == 0)
			break;
		else{
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
}
var testMonster = new Monster("test",120,"atk1","atk2",20,20);
var testPrize = new Prize("hp raise");
console.log(testMonster);

Hero.prizes.push(testPrize);

console.log(Hero);
var grid = [];

generateGrid(grid);
function generateGrid(grid){
    var temp = [];
    
    for(var i =0; i < 8; i++){
        temp = [];
        for(var j = 0; j < 8 ; j++){
            temp.push(new Tile(i,j));
        }
        grid.push(temp);
    }       
}
