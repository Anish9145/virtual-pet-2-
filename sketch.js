var dog,sadDog,happyDog;
var feed,addFood;



function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
  
  foodObj=new Food();

  foodStock=database.ref('Food');
  foodStock.on('value',readStock);

  feed=createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);
  
  addFood=createButton("add the food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.value;
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog=addImage(happyDog);

  if (foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0);
  }else{
    foodObj.updateFoodStock(foodObj.getFoodStock()*1);
  }
}


//function to add food in stock
