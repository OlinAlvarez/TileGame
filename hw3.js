var tile = {
    
}

function Tile(x,y){
    //the coordinates.
    this.x = x;
    this.y = y;
}



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

                console.log("accessed");
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
                console.log(tile);
            }
        });
    });
    console.log(grid);
}
