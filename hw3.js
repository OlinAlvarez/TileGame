
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

    grid.map(function(row,grid){
        row.map(function(tile,grid){
            if(tile.x === 0){
                tile.north = null;
            }
            if(tile.y === 0){
                tile.northwest = null;
                tile.southwest = null;
            }
            if(tile.x === 7){
                tile.northeast = null;
                tile.southeast = null;
            }
            if(tile.y ===7){
                tile.south = null;
            }
            if(tile.x > 0 || tile.y >0){

                
                if(tile.north != null){
                    tile.north = grid[tile.x][tile.y  - 1];
                }
                if(tile.south != null){
                    tile.south = grid[tile.x][tile.y+1];
                }
                if(tile.northeast != null){
                    tile.northeast = grid[tile.x-1][tile.y+1];
                }
                if(tile.northwest != null){
                    tile.northwest = grid[tile.x-1][tile.y-1];
                }
                if(tile.southwest != null){
                    tile.southwest = grid[tile.x+1][tile.y-1];
                }
                if(tile.southeast != null){
                    tile.southeast = grid[tile.x+1][tile.y+1];
                }
            }
        });
    });
    
}
