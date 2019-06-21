var level01 = function(window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function(game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            name: "Robot Romp",
            number: 1,
            speed: -3,
            gameItems: [
                { type: 'mooscle_jooce', x: 400, y: groundY - 25 },
                { type: 'mooscle_jooce', x: 750, y: groundY - 110 },
                { type: 'mooscle_jooce', x: 1500, y: groundY - 25 },
                { type: 'final_boss', x: 1700, y: groundY - 28 },
                { type: 'mr_krabs_pill', x: 600, y: groundY - 25 },
                { type: 'mooscle_jooce', x: 2900, y: groundY - 110 },
                { type: 'mooscle_jooce', x: 2500, y: groundY - 25 },
                { type: 'mooscle_jooce', x: 2100, y: groundY - 25 },
                { type: 'mooscle_jooce', x: 1000, y: groundY - 110 },  
                { type: 'final_boss', x: 2300, y: groundY - 25 },                
                { type: 'final_boss', x: 1300, y: groundY - 35 },
                { type: 'mr_krabs_pill', x: 1950, y: groundY - 25 },
                { type: 'mr_krabs_pill', x: 2000, y: groundY - 125 }
            ]

        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // BEGIN EDITING YOUR CODE HERE

        function createSawBlade(x, y) {
            var hitZoneSize = 25;
            var damageFromObstacle = 20;
            var myObstacle = game.createObstacle(hitZoneSize, damageFromObstacle);
            myObstacle.x = x;
            myObstacle.y = y;
            game.addGameItem(myObstacle);
            var obstacleImage = draw.bitmap('img/mooscle_jooce.png');
            myObstacle.addChild(obstacleImage);
            obstacleImage.x = -25;
            obstacleImage.y = -25;
        }

        for (var i = 0; i < levelData.gameItems.length; i++) {
            var gameItem = levelData.gameItems[i];
            if (gameItem.type === 'mooscle_jooce') {
                createSawBlade(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === 'final_boss') {
                createEnemy(gameItem.x, gameItem.y);
            }
            else if (gameItem.type === 'mr_krabs_pill') {
                createReward(gameItem.x, gameItem.y);
            }
        }

        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy', 25);
            // var redSquare = draw.rect(50, 50, 'red');
            // redSquare.x = -25;
            // redSquare.y = -25;
            // enemy.addChild(redSquare);
            enemy.x = x;
            enemy.y = y;
            game.addGameItem(enemy);
            enemy.velocityX = -1;
            var enemyImage = draw.bitmap('img/final_boss.png');
            enemy.addChild(enemyImage);
            enemyImage.x = -25;
            enemyImage.y = -25;

            enemy.onPlayerCollision = function() {
                console.log('The enemy has hit Halle');
                enemy.fadeOut();
                game.changeIntegrity(-50);
            };

            enemy.onProjectileCollision = function() {
                console.log('Halle has hit the enemy');
                enemy.shrink();
                game.increaseScore(100);
            };
        }


        function createReward(x, y) {
            var hitZoneSize = 25;
            var damageFromReward = 10;
            var myReward = game.createGameItem(hitZoneSize, damageFromReward);
            myReward.x = x;
            myReward.y = y;
            game.addGameItem(myReward);
            myReward.velocityX = -1;
            var rewardImage = draw.bitmap('img/mr_krabs_pill.png');
            myReward.addChild(rewardImage);
            rewardImage.x = -25;
            rewardImage.y = -25;
            myReward.onPlayerCollision = function() {
                console.log('Halle got the reward');
                myReward.fadeOut();
                game.increaseScore(100);
                game.changeIntegrity(10);
            };
        }


    }
}

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //

    module.exports = level01;
}
