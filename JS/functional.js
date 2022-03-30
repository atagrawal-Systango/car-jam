
//getting HTML divs
let startScreen = document.querySelector(".startScreen");
let game = document.querySelector(".game");
let moves = document.querySelector(".moves");
let pause = document.querySelector(".pause");
let restart = document.querySelector(".restart");
let navBar = document.querySelector(".wrap");
let gameWraper = document.querySelector(".wraper");
let container = document.querySelector(".parkingGame");

//object of player
let player = { speed: 5, moves:0};

//event to start the game
startScreen.addEventListener("click",start);
// const { url } = require("inspector");

//variable car and the car user clicking on
let clickedCar,car;

//variable to car move car horizontal 
let horizontalMove;

//variable to create boundryconst { url } = require("inspector");
let rightBoundry,topBoundry,leftBoundry,bottomBoundry;

//variable of number of car
let numberOfCar=0;

// let currentLevel = 0;

//array of all the car
let carArray = [];

//array conatain random value for creating boundry 
let randomArray = []; 

//keycode of all the key required to play
let leftKey = 37, upKey = 38, rightKey = 39, downKey = 40;
let keystate;

//empty array of all the items car can collide with
let collisionCollection = []

//count of car every level will have and it will increase with the level 
let carCount=5;

//level on which user is
let levelNumber=1;

//car moving out with animation
let movingCar

const MOVINGSPEED = 5;

//function to check car overlap wihile creating -------------------------
function carOverlapp(presentCar,upcomingCar)
{
    positionOfPresent = presentCar.getBoundingClientRect();
    positionOfUpcoming = upcomingCar.getBoundingClientRect();

    return !(positionOfPresent.top > positionOfUpcoming.bottom || 
        positionOfPresent.right < positionOfUpcoming.left || 
        positionOfPresent.bottom < positionOfUpcoming.top || 
        positionOfPresent.left > positionOfUpcoming.right);
}

//function to get random boolean value ------------------
function randomBoolean()
{
    return !! Math.floor(Math.random()*2);
}

//function to create car ----------------
function createCar(id)
{
    
    let car = document.createElement("div");             
    car.setAttribute("class","car");
    car.setAttribute("id","car"+id);

    car.style.top = Math.floor(Math.random()* (305 - 30)+30) + "px";
    car.style.left = Math.floor(Math.random()* (305 - 30)+30) + "px";

    if(randomBoolean()) car.style.transform = "rotate(90deg)";
    
    // car.style.backgroundImage = "url('./image"+id+".png')";
    if(car.style.transform) car.style.backgroundImage = "url(../IMAGE/image1.png)";
    else car.style.backgroundImage = "url(../IMAGE/image2.png)";


    
    car.style.zIndex = "900";
    game.appendChild(car);

    let overLap = false;
    for(let insert = 0; insert<carArray.length ; insert++)
    {
        
        if(carOverlapp(carArray[insert],car)==true)
        {
            overLap=true;
            break;
        }
    }

    if(overLap == false)
    {
        caridd = car.getAttribute("id");
        car.addEventListener("click",()=>{selectCar(car)});
        for(let i=0;i<carArray.length;i++)
        {
            if(car.style.transform && randomArray[i]==1)
            {
                if(will_collide(car,carArray[i],"rightside") && carArray[i].style.transform && randomArray[i]==0)
                {
                    game.removeChild(car);
                    return false;
                }
            }
            else if(car.style.transform && randomArray[i]==0)
            {
                if(will_collide(car,carArray[i],"leftside") && carArray[i].style.transform && randomArray[i]==1)
                {
                    game.removeChild(car);
                    return false;
                }
            }
            else if(!car.style.transform && randomArray[i]==1)
            {
                if(will_collide(car,carArray[i],"downside") && !carArray[i].style.transform && randomArray[i]==0)
                {
                    game.removeChild(car);
                    return false;
                }
            }
            else if(!car.style.transform && randomArray[i]==0)
            {
                if(will_collide(car,carArray[i],"upside") && !carArray[i].style.transform && randomArray[i]==1)
                {
                    game.removeChild(car);
                    return false;
                }
            }
            
        }
        
        collisionCollection.push(car);
        numberOfCar++;
        carArray.push(car);
    }
    else{
        game.removeChild(car);
        return false;
    }
    return true;
}

//function to create all side boundry ---------------
function boundryAll()
{
    for(let i=0;i<10;i++)
    {
        rightBoundry = document.createElement("div");
        rightBoundry.setAttribute("class","rightBoundry");
        rightBoundry.setAttribute("id","booundry"+i);

        rightBoundry.style.top = Math.floor(Math.random()* (305 - 40)+40)+"px"
        rightBoundry.style.left = "390px";

        game.appendChild(rightBoundry);
        
        let outGate =false;
       
        for(let value = 0 ; value < carArray.length ; value++)
        {

            if(carArray[value].style.transform)
            {
               
                if(randomArray[value]==1 && will_collide(rightBoundry,carArray[value],'leftside'))
                {
                   
                    outGate = true ;
                    break;
                }   
            }
            
        }
        if(!outGate)
        {   
           
            // bottomBoundry = document.getElementById("booundry3"+i);
            collisionCollection.push(rightBoundry);
        }
        else
        {
            game.removeChild(rightBoundry)

        }
    }



    for(let i=0;i<10;i++)
    {
        leftBoundry = document.createElement("div");
        leftBoundry.setAttribute("class","leftBoundry");
        leftBoundry.setAttribute("id","booundry2"+i);

        leftBoundry.style.top=Math.floor(Math.random()* (305 - 40)+40)+"px";
        leftBoundry.style.left = "0px";

        game.appendChild(leftBoundry);

        let outGate =false;
       
        for(let value = 0 ; value < carArray.length ; value++)
        {

            if(carArray[value].style.transform)
            {
               
                if(randomArray[value]==0 && will_collide(leftBoundry,carArray[value],'rightside'))
                {
                   
                    outGate = true ;
                    break;
                }   
            }
            
        }
        if(!outGate)
        {   
           
            // leftBoundry = document.getElementById("booundry2"+i);
            collisionCollection.push(leftBoundry);
        }
        else
        {
           
            game.removeChild(leftBoundry);
        }
       
        
    }
    for(let i=0;i<10;i++)
    {
        topBoundry = document.createElement("div");
        topBoundry.setAttribute("class","topBoundry");
        topBoundry.setAttribute("id","booundry1"+i);

        topBoundry.style.left= Math.floor(Math.random()* (305 - 40)+40)+"px";
        topBoundry.style.top = "0px";

        game.appendChild(topBoundry);
        
        let outGate =false;
        
        for(let value = 0 ; value < carArray.length ; value++)
        {

            if(!carArray[value].style.transform)
            {
               
                if(randomArray[value]==1 && will_collide(topBoundry,carArray[value],'downside'))
                {
                   
                    outGate = true ;
                    break;
                }   
            }
            
        }

        if(!outGate)
        {   
            
            // topBoundry = document.getElementById("booundry1"+i);
            collisionCollection.push(topBoundry);
        }
        else
        {
            game.removeChild(topBoundry);
        }
        
        
    }
    for(let i=0;i<10;i++)
    {
        bottomBoundry = document.createElement("div");
        bottomBoundry.setAttribute("class","bottomBoundry");
        bottomBoundry.setAttribute("id","booundry3"+i);

        bottomBoundry.style.left=Math.floor(Math.random()* (305 - 40)+40)+"px";
        bottomBoundry.style.top = "390px";

        game.appendChild(bottomBoundry);
        
        let outGate =false;
       
        for(let value = 0 ; value < carArray.length ; value++)
        {

            if(!carArray[value].style.transform)
            {
                
                if(randomArray[value]==0 && will_collide(bottomBoundry,carArray[value],'upside'))
                {
                    
                    outGate = true ;
                    break;
                }   
            }
            
        }
        if(!outGate)
        {   
            
            // bottomBoundry = document.getElementById("booundry3"+i);
            collisionCollection.push(bottomBoundry);
        }
        else
        {
            game.removeChild(bottomBoundry);
        }       

    }
}

//function to create road ----------------

function createRoad(roadClass,id)
{
    let road = document.createElement('div');
    road.setAttribute('class',roadClass);
    road.setAttribute("id",id);

    if(id == 1)
    {
        road.style.top = "0px";
        road.style.left = "345px";
        road.style.width = "100px";
        road.style.height = "585px";
        road.style.backgroundImage = "url('../IMAGE/vertical-road.png')";
        road.style.backgroundSize = "contain";
        road.style.position = "absolute";
        road.style.right = "0px"

        gameWraper.appendChild(road);

    }
    if(id==2)
    {
        road.style.backgroundImage = "url('../IMAGE/road1.jpg')";
        road.style.backgroundSize = "contain";
    }
    if(id == 3)
    {
        road.style.position = "absolute";
        road.style.top = "90px";
        road.style.right = "0%";
        road.style.width = "845px";
        road.style.height = "90px";
        road.style.backgroundImage = "url('../IMAGE/road1.jpg')";
        road.style.backgroundSize = "contain";

        gameWraper.appendChild(road);

    }
    if(id == 4)
    {
        road.style.position = "absolute";
        road.style.top = "186px";
        road.style.left = "850px";
        road.style.bottom = "0%";
        road.style.width = "100px";
        road.style.height = "610px";
        road.style.backgroundImage = "url('../IMAGE/vertical-road.png')";
        road.style.backgroundSize = "contain";
        
        gameWraper.appendChild(road);

    }
    
    gameWraper.appendChild(road);
}

//function to count moves ------------
function countMoves()
{
    player.moves++;
    console.log("increasing Moves ------------");
}

//function to remove previous level --------------
function removePreviousLevel()
{
    let item=0
    while(item< collisionCollection.length)
    {
       
        collisionCollection[item].style.display = "none";
        item++;
        window.cancelAnimationFrame(movingObstacleId);
        // console.log(collisionCollection[item].className == "topBoundry");
        
    }
}
//update score
// function updateScore(){
    
//     firebase.database().ref('users/').child(localStorage.getItem("UserName")).update({
//         moves: player.moves
//     });
 
// }

function updateScore(){
    player.start = false;
    let gameOver = document.createElement('a');
    gameOver.setAttribute("id","gameover");
    let link = document.createTextNode("Game Over " + "Score is " + player.moves);
    if(localStorage.getItem('guestPlayer') == 'GUEST' || localStorage.getItem("UserName") == null)
    {
        localStorage.removeItem("isGuestPlayer")
        gameOver.prepend(link);
        gameOver.href = "../index.html";
        game.prepend(gameOver);
        localStorage.removeItem("isGuestPlayer")
    }
    else if(player.moves != 0)
    {
        firebase.database().ref('users/').child(localStorage.getItem("UserName")).update
        ({
            moves: player.moves
        });
        gameOver.prepend(link);
                        
        gameOver.href = "../HTML/click.html";
        container.prepend(gameOver);
    }
    
}

//function to check level complete -------------
function isLevelComplete()
{
    numberOfCar--;
    if(numberOfCar==0)
    { 
        removePreviousLevel();
        carCount++;
        levelNumber++;
        collisionCollection = [];
        document.getElementById("message").innerHTML="Level"+levelNumber;
        loadGame();       
    }
    console.log(numberOfCar);
    
}

//function to find wheater car will collide or not
function will_collide(MainCar,carB,movement)
{
    if(movement == 'upside')                           //collide to find when car moving upside
    {
        
        if(parseInt(MainCar.style.top,10) > parseInt(carB.style.top,10)) 
        {
            
            let mainStart =  MainCar.offsetLeft;
            let mainEnd =  MainCar.offsetLeft + MainCar.offsetWidth
            let carStart =  carB.offsetLeft;
            let carEnd =  carB.offsetLeft + carB.offsetWidth
            if( carB.style.transform )
            {
                carEnd =  carB.offsetLeft + carB.offsetHeight;
            }
            if(mainStart <= carEnd && carStart <= mainEnd) return true;

        }
    }
    else if (movement == 'downside')                    //collide to find when car moving downside
    {

        if(parseInt(MainCar.style.top,10) < parseInt(carB.style.top,10)) 
        {
            let mainStart =  MainCar.offsetLeft;
            let mainEnd =  MainCar.offsetLeft + MainCar.offsetWidth
            let carStart =  carB.offsetLeft;
            let carEnd =  carB.offsetLeft + carB.offsetWidth
            if( carB.style.transform )
            {
                carEnd =  carB.offsetLeft + carB.offsetHeight;
            }
            if(mainStart <= carEnd && carStart <= mainEnd)
            {

                return true;
            }

        }
    }
    else if (movement == 'leftside')                      //collide to find when car moving leftside
    {
       
        if(parseInt(MainCar.style.left,10) > parseInt(carB.style.left,10)) 
        {
            
            let MainCarr = MainCar.getBoundingClientRect();
            let carBb = carB.getBoundingClientRect();
            let mainStart =  MainCarr.top;
            let mainEnd =  MainCarr.top+ MainCarr.height;
            let carStart =  carBb.top;
            let carEnd =  carBb.top + carBb.height;
            // if( carB.style.transform )
            // {
            //     carEnd =  carB.offsetTop + carB.offsetWidth;
            // }
            if(mainStart <= carEnd && carStart <= mainEnd) return true;

        }
    }
    else if (movement == 'rightside')                      //collide to find when car moving rightside
    {
        
        if(parseInt(MainCar.style.left,10) < parseInt(carB.style.left,10)) 
        {
           
            let MainCarr = MainCar.getBoundingClientRect();
            let carBb = carB.getBoundingClientRect();
            let mainStart =  MainCarr.top;
            let mainEnd =  MainCarr.top+ MainCarr.height;
            let carStart =  carBb.top;
            let carEnd =  carBb.top + carBb.height;
            // if( carB.style.transform )
            // {
            //   
            //     carEnd =  carBb.Top + carBb.Width;
            // }
            if(mainStart <= carEnd && carStart <= mainEnd)
            {
                return true;
            } 
        }
    }


    return false;
}


//selecting the car which user click on
function selectCar(car_obj)
{   
    if(movingCar!=null) return;
    car_id = car_obj.getAttribute("id");
    clickedCar = document.getElementById(car_id);
    player.y = clickedCar.offsetTop; 
    player.x = clickedCar.offsetLeft; 
}

//function to pause and then play
function pausePlay()
{
    if(player.start==true)
    {
        player.start=false;
    }
    else 
    {
        player.start=true;
        checkKey();
    }
}

//creating obstacle ------------------
let obstacle,obstacleObj,movingObstacleId;
function createObstacle()
{
    obstacle = document.createElement("div");
    obstacle.setAttribute("class","obstacle");
    obstacle.setAttribute("id","oobstacle");
    obstacle.style.left = '340px';
    game.appendChild(obstacle);
    let obstacleId = obstacle.getAttribute("id");
    obstacleObj = document.getElementById(obstacleId);
    obstacle.y = obstacleObj.offsetTop;
    obstacle.isForward = true;
    collisionCollection.push(obstacle);
}    


//function to move obstacle -------------------
function movingObstacles()
{
    if (obstacle.isForward)
    {
        obstacle.y += player.speed;
        
    }else{
        obstacle.y -= player.speed;
    }

    if(obstacle.y === 370){
        obstacle.isForward = false;
    }

    if(obstacle.y === 10){
        obstacle.isForward = true;
    }
    
    
    obstacle.style.top = obstacle.y + "px";
    movingObstacleId = window.requestAnimationFrame(movingObstacles)
}




player.moves=0

document.onkeydown = checkKey;

//function to check which key user is pressing and preforming action accordingly
function checkKey(e) 
{

    e = e || window.event;
    if(clickedCar == undefined) return; 
    if(clickedCar != undefined) 
    {
        horizontalMove = clickedCar.getBoundingClientRect();
    }
    if(player.start)
    {
       
        if(horizontalMove != undefined)
        {
            if(horizontalMove.width > 50)
            {
                // moving left --------------------------
                if (e.keyCode == '37') 
                {       
                    let to_collide = null;
                    console.log(collisionCollection);
                    for(let i=0;i<collisionCollection.length;i++)
                    {
                        console.log(i,"----------------------------------------")
                        console.log(clickedCar,collisionCollection[i]);
                        console.log(i+" "+collisionCollection[i].style.left);
                        let b = will_collide(clickedCar,collisionCollection[i],"leftside")
                        console.log(b);
                        if(b) 
                        {
                            console.log("Inside the collide");
                            console.log(to_collide);
                            console.log("Can collide with");
                            console.log(collisionCollection[i]);
                            if(to_collide == null) to_collide = collisionCollection[i];
                            else{
                                if(parseInt(collisionCollection[i].style.left,10) > parseInt(to_collide.style.left,10))
                                {
                                    to_collide = collisionCollection[i];
                                }
                            }
                        }
                    }
                    console.log("Finally Collasion is Finded..................................")
                    console.log(to_collide);
        
                        
                    if(to_collide != obstacle && to_collide!=null && to_collide.className != 'car') 
                    {
                        player.x = parseInt(to_collide.style.left, 10) + 10 + 25;
                        countMoves();
                    }
                    else if(to_collide === obstacle)
                    {
                        player.x = parseInt(to_collide.style.top, 10) + 40;
                        countMoves();
                        updateScore();
                        player.start=false;
                    }
                    else if(to_collide != null && to_collide.className == 'car') 
                    {
                        player.x = parseInt(to_collide.style.left, 10) + 40 + 25;
                        countMoves();
                    }
                    else if(to_collide == null)
                    {
                        movingCar = clickedCar;
                        clickedCar = null;
                        countMoves();
                        for( let i = 0; i < collisionCollection.length; i++)
                        { 
            
                            if ( collisionCollection[i] === movingCar)
                            { 
                                
                                collisionCollection.splice(i, 1); 
                               
                            }
                                
                        }
                        
                        let corrdinates = (game.getBoundingClientRect().left - game.getBoundingClientRect().width)- 135;
                        countMoves();
                        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
                        console.log(game.getBoundingClientRect().top);
                        console.log( movingCar.offsetTop);
                        if(movingCar != null)
                        {
                            let parkingArea = setInterval(() => 
                            {
                                let move = player.x--;
                                movingCar.style.left = move +"px"
                                
                                if(player.x <= corrdinates)
                                {
                                    console.log(corrdinates);
                                    console.log(player.x);
                                    clearInterval(parkingArea);
                                    movingCar.style.transform = "rotate(0deg)";
                                    let roadArea = setInterval(() => 
                                    {
                                        let move = player.y -= MOVINGSPEED;
                                        movingCar.style.top = move +"px"
                                        if(player.y <= -150)
                                        {
                                            clearInterval(roadArea);
                                            movingCar.style.display="none";
                                            isLevelComplete();
                                            movingCar=null;
                                        }
                                        
                                    }, 5);
                                }
                            }, 5);

                        }
                        

                         console.log(collisionCollection);
                            
                    }
                                    
                                
                }
                // moving right -------------------------------
                else if (e.keyCode == '39')
                {
                    
                    let to_collide = null;
                    console.log(collisionCollection);
                    for(let i=0;i<collisionCollection.length;i++)
                    {
                        console.log(i,"----------------------------------------")
                        console.log(clickedCar,collisionCollection[i]);
                        console.log(i+" "+collisionCollection[i].style.left);
                        let b = will_collide(clickedCar,collisionCollection[i],"rightside")
                        console.log(b);
                        if(b) 
                        {
                            console.log("Inside the collide");
                            console.log(to_collide);
                            console.log("Can collide with");
                            console.log(collisionCollection[i]);
                            if(to_collide == null) to_collide = collisionCollection[i];
                            else{
                                if(parseInt(collisionCollection[i].style.left,10) < parseInt(to_collide.style.left,10) )
                                {
                                    to_collide = collisionCollection[i];
                                }
                            }
                        }
                    }
                    console.log("Finally Collasion is Finded..................................")
                    console.log(to_collide);
    
                    
                    if(to_collide != obstacle && to_collide!=null && to_collide.className != 'car'){
                        player.x = parseInt(to_collide.style.left, 10) - 85;
                        countMoves();
                    }
                    else if(to_collide === obstacle)
                    {
                        player.x = parseInt(to_collide.style.left, 10) - 85 ;
                        countMoves();
                        updateScore();
                        player.start=false;

                    }
                    else if(to_collide != null && to_collide.className == 'car') 
                    {
                        player.x = parseInt(to_collide.style.left, 10) - 85 + 25 ;
                        countMoves()
                    }
                    else if(to_collide==null)
                    {
                        countMoves();
                        let movingCar = clickedCar;
                        clickedCar = null;
                        for( let i = 0; i < collisionCollection.length; i++){ 

                            if ( collisionCollection[i] === movingCar) { 
                        
                                collisionCollection.splice(i, 1);
                                
                                
                            }
                        
                        }

                        let corrdinates = (game.getBoundingClientRect().right - game.getBoundingClientRect().width);
                        countMoves();
                        console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
                        console.log(game.getBoundingClientRect().top);
                        console.log( movingCar.offsetTop);
                        if(movingCar != null)
                        {
                            let parkingArea = setInterval(() => 
                            {
                                let move = player.x++;
                                movingCar.style.left = move +"px"
                                
                                if(player.x >= corrdinates)
                                {
                                    console.log(corrdinates);
                                    console.log(player.x);
                                    clearInterval(parkingArea);
                                    movingCar.style.transform = "rotate(180deg)";
                                    let roadArea = setInterval(() => 
                                    {
                                        let move = player.y += MOVINGSPEED;
                                        movingCar.style.top = move +"px"
                                        if(player.y >= 415)
                                        {
                                            clearInterval(roadArea);
                                            movingCar.style.display="none";
                                            isLevelComplete(); 
                                            movingCar=null;
                                        }
                                        
                                    }, 5);
                                }
                            }, 5);

                        }
                            
                        console.log(collisionCollection);
                    }
    
                }  
            }
            else
            {
                // moving up --------------------------------------
                if (e.keyCode == '38') 
            {
                
                let to_collide = null;
                console.log(collisionCollection);
                for(let i=0;i<collisionCollection.length;i++)
                {
                    console.log(i,"----------------------------------------")
                    console.log(clickedCar,collisionCollection[i]);
                    console.log(i+" "+collisionCollection[i].style.top);
                    let b = will_collide(clickedCar,collisionCollection[i],"upside")
                    console.log(b);
                    if(b) 
                    {
                        console.log("Inside the collide");
                        console.log(to_collide);
                        console.log("Can collide with");
                        console.log(collisionCollection[i]);
                        if(to_collide == null) to_collide = collisionCollection[i];
                        else if(parseInt(collisionCollection[i].style.top,10) > parseInt(to_collide.style.top,10) )
                        {
                            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
                            console.log(collisionCollection[i].style.top);
                            console.log(to_collide.style.top)
                            to_collide = collisionCollection[i];
                        }

                    }
                }
                console.log("Finally Collasion is Finded..................................")
                console.log(to_collide);

                
                if(to_collide != obstacle && to_collide!=null && to_collide.className != 'car') 
                {
                    player.y = parseInt(to_collide.style.top, 10) + 10;
                    countMoves();
                }
                else if(to_collide === obstacle)
                {
                    player.y = parseInt(to_collide.style.top, 10) + 40 + 30;
                    countMoves();
                    updateScore();
                    player.start=false;
                }
                else if(to_collide != null && to_collide.className == "car") 
                {
                    player.y = parseInt(to_collide.style.top, 10) + 40 + 25;
                    countMoves();
                }
                else if(to_collide == null)
                {
                    movingCar = clickedCar;
                    clickedCar= null;
                    for( let i = 0; i < collisionCollection.length; i++)
                    { 

                        if ( collisionCollection[i] === movingCar) 
                        { 
                    
                            collisionCollection.splice(i, 1);
                           
                        }

                    }    
                    let corrdinates = (game.getBoundingClientRect().top ) -245;
                    countMoves();
                    console.log("jjjjjjjjjjjjjjjjjjjjjjjjjjjjj");
                    console.log(game.getBoundingClientRect().top);
                    console.log( movingCar.offsetTop);
                    if(movingCar != null)
                    {
                        let parkingArea = setInterval(() => 
                        {
                            let move = player.y--;
                            movingCar.style.top = move +"px"
                            
                            if(player.y <= corrdinates)
                            {
                                console.log(corrdinates);
                                console.log(player.y);
                                clearInterval(parkingArea);
                                movingCar.style.transform = "rotate(90deg)";
                                let roadArea = setInterval(() => 
                                {
                                    let move = player.x += MOVINGSPEED;
                                    movingCar.style.left = move +"px"
                                    if(player.x >= 700)
                                    {
                                        clearInterval(roadArea);
                                        movingCar.style.display="none";
                                        isLevelComplete();
                                        movingCar=null;
                                    }
                                    
                                }, 5    );
                            }
                        }, 5);

                    }
                    
                    
                    console.log(collisionCollection);

                }
            }
            // moving down --------------------
            else if (e.keyCode == '40') 
            {
                
                let to_collide = null;
                console.log(collisionCollection);
                for(let i=0;i<collisionCollection.length;i++)
                {
                    console.log(i,"----------------------------------------")
                    console.log(clickedCar,collisionCollection[i]);
                    console.log(i+" "+collisionCollection[i].style.top);
                    let b = will_collide(clickedCar,collisionCollection[i],"downside")
                    console.log(b);
                    if(b) 
                    {
                        console.log("Inside the collide");
                        console.log(to_collide);
                        console.log("Can collide with");
                        console.log(collisionCollection[i]);
                        if(to_collide == null) to_collide = collisionCollection[i];
                        else{
                            if(parseInt(collisionCollection[i].style.top,10) < parseInt(to_collide.style.top,10))
                            {
                                to_collide = collisionCollection[i];
                            }
                        }
                    }
                }
                console.log("Finally Collasion is Finded..................................")
                console.log(to_collide);

                
                if(to_collide != obstacle && to_collide!=null && to_collide.className != 'car')
                {
                    player.y = parseInt(to_collide.style.top, 10) - 85;
                    countMoves();
                }
                if(to_collide != null && to_collide.className =='car')
                { 
                    player.y = parseInt(to_collide.style.top, 10) - 85 + 30 ;
                    countMoves();
                }

                else if(to_collide === obstacle)
                {
                    player.y = parseInt(to_collide.style.top, 10) - 85;
                    
                    countMoves();
                    updateScore();
                    player.start=false;
                }
                else if(to_collide==null)
                {
                    console.log("i am going out");
                    movingCar = clickedCar
                    clickedCar = null;
                    for( let i = 0; i < collisionCollection.length; i++)
                    { 

                        if ( collisionCollection[i] === movingCar) { 
                    
                            collisionCollection.splice(i, 1); 
                            console.log("deleted-------------");
                            
                        }
                    
                    }
                    let corrdinates = (game.getBoundingClientRect().top +game.getBoundingClientRect().height) - 175
                    countMoves();
                    if(movingCar != null)
                    {
                        let parkingArea = setInterval(() => 
                        {
                            let move = player.y++;
                            movingCar.style.top = move +"px"
                            
                            if(player.y >= corrdinates)
                            {
                                console.log(corrdinates);
                                console.log(player.y);
                                clearInterval(parkingArea);
                                movingCar.style.transform = "rotate(270deg)";
                                let roadArea = setInterval(() => {
                                    let move = player.x -= MOVINGSPEED;
                                    movingCar.style.left = move +"px"
                                    if(player.x <= -300)
                                    {
                                        clearInterval(roadArea);
                                        movingCar.style.display="none";
                                        isLevelComplete();
                                        movingCar=null;
                                    }
                                    
                                }, 5    );
                            }
                        }, 5);
                    }
                   
                    
                    
                    console.log(collisionCollection);
                }
            }
            }
        
        }  
        if(clickedCar!=undefined)
        {
            clickedCar.style.top = player.y + "px";
            clickedCar.style.left = player.x + "px";
        }
        moves.innerHTML = "moves"+player.moves;
    }
}

//function to load things before game 
function loadGame()
{
    console.log("Starting the Game...............");
    console.log(game.getBoundingClientRect());
    let uniqueId=1;
    while(uniqueId <= carCount)
    {
        if(createCar(""+uniqueId+levelNumber))
        {
            uniqueId++;            
        }
        
    }
    if(levelNumber>2)
    {
        createObstacle();
        movingObstacles();
        // if(levelNumber == 2)
        // {
        //     window.requestAnimationFrame(movingObstacles);
        // }
    }
    
    
    for(let pick = 0 ; pick < carArray.length ; pick++)
    {
        randomArray.push(Math.floor(Math.random() * 2));
    }
   
    console.log(numberOfCar);
    clickedCar = car;

    for(let i=0; i<collisionCollection.length; i++)
    {
        collisionCollection[i].style.top = collisionCollection[i].offsetTop + "px";
        collisionCollection[i].style.left = collisionCollection[i].offsetLeft + "px";
    }
    boundryAll();
    
    
}

//function to start the game
function start() 
{
    
    game.classList.remove("hide");
    startScreen.classList.add("hide");
    moves.classList.remove('hide');
    pause.classList.remove('hide');
    restart.classList.remove('hide');
    navBar.classList.add('hide');
    loadGame();
    
    
    player.start = true;
    // gamePlay();
    // window.requestAnimationFrame(gamePlay);
    createRoad("leftRoad",1);
    createRoad("bottomRoad",2);
    createRoad("topRoad",3);
    createRoad("rightRoad",4);
}
