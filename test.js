var Test = function(object,x,y){
    this.object = object;
    this.x = x;
    this.y = y;
}

testObj = {
    prop1: "Olin",
    prop2: true,
    prop3: 23
}

var test = new Test(testObj,12,14);

console.log(test);

