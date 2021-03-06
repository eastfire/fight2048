const  TileSet = require("TileSet");

module.exports = {
  tutorial1:{
    name:"tutorial1",
    tileSet: TileSet.tutorial1,
    hideHead: true,
    hideSkill: true,
    isTutorial: true,
    initHero:{
      position:{x:1,y:1},
    },
    nextRoom: "tutorial2"
  },
  tutorial2:{
    name:"tutorial2",
    tileSet: TileSet.tutorial2,
    hideHead: true,
    hideSkill: true,
    isTutorial: true,
    initHero:{
      position:{x:1,y:1},
    },
    initMovable: [
      {
         isEnemy: true,
         type:"slime",
         subtype:"R",
         position:{x:1,y:3},
         level: 1,
      }
    ],
    nextRoom: "tutorial3"
  },
  tutorial3:{
    name:"tutorial3",
    tileSet: TileSet.tutorial1,
    hideHead: true,
    hideSkill: true,
    isTutorial: true,
    initHero:{
      position:{x:1,y:1},
    },
    initMovable: [
      {
         isEnemy: true,
         type:"slime",
         subtype:"R",
         position:{x:2,y:1},
         level: 1,
      },
      {
         isEnemy: true,
         type:"slime",
         subtype:"R",
         position:{x:3,y:1},
         level: 1,
      },
      {
         isEnemy: true,
         type:"slime",
         subtype:"R",
         position:{x:4,y:1},
         level: 1,
      },
      {
         isEnemy: true,
         type:"slime",
         subtype:"R",
         position:{x:5,y:1},
         level: 1,
      }
    ],
    nextRoom: "tutorial4"
  },
  tutorial4:{
    name:"tutorial4",
    tileSet: TileSet.tutorial4,
    hideHead: true,
    hideSkill: true,
    isTutorial: true,
    initHero:{
      position:{x:2,y:5},
    },
    initMovable: [
      {
         isEnemy: true,
         type:"slime",
         subtype:"R",
         position:{x:1,y:1},
         level: 1,
      },
      {
         isEnemy: true,
         type:"slime",
         subtype:"R",
         position:{x:1,y:2},
         level: 1,
      },
      {
         isEnemy: true,
         type:"slime",
         subtype:"Y",
         position:{x:1,y:3},
         level: 1,
      }
    ],
    nextRoom: "normal"
  },
  normal: {
    name:"normal",
    tileSet: TileSet.tiles5x5,
    initMovable: [
      // {
      //   isEnemy: true,
      //   type:"slime",
      //   subtype:"R",
      //   position:{x:2,y:2},
      //   level: 3,
      // },{
      //   isEnemy: true,
      //   type:"slime",
      //   subtype:"B",
      //   position:{x:2,y:1},
      // },
      // {
      //   isItem: true,
      //   type: "potion",
      //   position: {x:4,y:4},
      //   level:2
      // }
    ],
    initHero:{
      position:{x:3,y:3},
      status:[
        // "cursed",{
        // name:"frozen",
        // duration: 2
        // }
      ],
      skill:[
        // "exchangeSkill",
        // {
        //   name:"treasureSkill",
        //   level:4,
        //   countDown: 3
        // },{
        //   name:"eightArrowSkill",
        //   level:4,
        //   forbid: true
        // }
      ]
    },    
  },
  "4x4": {
    name:"4x4",
    tileSet: TileSet.tiles4x4,
    initMovable: [
    ],
    initHero:{
      position:{x:3,y:3},
      status:[
      ],
      skill:[
      ]
    },
  },
  "5x5": {
    name:"5x5",
    tileSet: TileSet.tiles5x5,
    initMovable: [
    ],
    initHero:{
      position:{x:3,y:3},
      status:[
      ],
      skill:[
      ]
    },
  },
  "6x6": {
    name:"6x6",
    tileSet: TileSet.tiles6x6,
    initMovable: [
    ],
    initHero:{
      position:{x:3,y:3},
      status:[
      ],
      skill:[
      ]
    },
  }
}
