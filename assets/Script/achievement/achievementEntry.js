const Global = require("global");
const Common = require("common");
const Storage = require("storage");

var achievements = [
{
  name:"die1",
  title:"第一滴血",
  desc: "死亡1次",
  reward: 5,
  check:function(){
    return Storage.statistics.gameTime >= 1;
  }
},
{
  name:"die9",
  title:"九死一生",
  desc: "死亡9次",
  prerequests: ["die1"],
  reward: 50,
  check:function(){
    return Storage.statistics.gameTime >= 9;
  }
},
{
  name:"die100",
  title:"百折不挠",
  desc: "死亡100次",
  prerequests: ["die100"],
  reward: 500,
  check:function(){
    return Storage.statistics.gameTime >= 100;
  }
},
{
  name:"survive1hp",
  title:"千钧一发",
  desc: "在回合结束时仅1hp",
  reward: 5,
  check:function(){
    return Storage.statistics.info.survive1hp > 0;
  },
},
{
  name:"killByPoison",
  title:"一个苹果",
  desc: "死于中毒",
  reward: 20,
  check:function(){
    return Storage.statistics.gameOver.poison > 0;
  },
},
{
  name:"allFull",
  title:"怪满为患",
  desc: "在回合结束时所有格子都满",
  reward: 50,
  check:function(){
    return Storage.statistics.info.allFull > 0;
  },
},
{
  name:"allClear",
  title:"扫荡四合",
  desc: "在回合结束时场上没有任何怪物",
  prerequests: null,
  reward: 400,
  check:function(){
    return Storage.statistics.info.allClear > 0;
  },
},
{
  name:"seenEnemy",
  title:"见多识广",
  desc: "见到过10种敌人",
  prerequests: null,
  reward: 20,
  check:function(){
    var count = 0;
    for ( var key in Storage.progress.seen ) {
      count ++;
    }
    return count >= 10;
  },
},
{
  name:"seenEnemy2",
  title:"见多识广II",
  desc: "见到过20种敌人",
  prerequests: ["seenEnemy"],
  reward: 40,
  check:function(){
    var count = 0;
    for ( var key in Storage.progress.seen ) {
      count ++;
    }
    return count >= 20;
  },
},
{
  name:"seenEnemy3",
  title:"见多识广III",
  desc: "见到过30种敌人",
  prerequests: ["seenEnemy2"],
  reward: 100,
  check:function(){
    var count = 0;
    for ( var key in Storage.progress.seen ) {
      count ++;
    }
    return count >= 30;
  },
},
{
  name:"kill1starSlime",
  title:"史莱姆杀手",
  desc: "杀死1星以上史莱姆",
  prerequests: null,
  reward: 5,
  check:function(){
    return Storage.statistics.kill.slimeLevel >= Global.STAR_THRESHOLD;
  },
},
{
  name:"kill2starSlime",
  title:"史莱姆杀手II",
  desc: "杀死2星以上史莱姆",
  prerequests: ["kill1starSlime"],
  reward: 10,
  check:function(){
    return Storage.statistics.kill.slimeLevel >= Global.STAR_THRESHOLD*2;
  },
},
{
  name:"kill3starSlime",
  title:"史莱姆杀手III",
  desc: "杀死3星以上史莱姆",
  prerequests: ["kill2starSlime"],
  reward: 30,
  check:function(){
    return Storage.statistics.kill.slimeLevel >= Global.STAR_THRESHOLD*3;
  },
},
{
  name:"kill4starSlime",
  title:"史莱姆杀手IV",
  desc: "杀死4星以上史莱姆",
  prerequests: ["kill3starSlime"],
  reward: 120,
  check:function(){
    return Storage.statistics.kill.slimeLevel >= Global.STAR_THRESHOLD*4;
  },
},
{
  name:"kill5starSlime",
  title:"珍稀怪物杀手",
  desc: "杀死5星以上史莱姆",
  prerequests: ["kill4starSlime"],
  reward: 600,
  check:function(){
    return Storage.statistics.kill.slimeLevel >= Global.STAR_THRESHOLD*5;
  },
},
{
  name:"takeDamage",
  title:"破伤风",
  desc: "被10点以上伤害杀死",
  reward: 5,
  check:function(){
    return Storage.statistics.gameOver.damage >= 10;
  },
},
{
  name:"takeDamage2",
  title:"啊,好痛!",
  desc: "被30点以上伤害杀死",
  prerequests: ["takeDamage"],
  reward: 10,
  check:function(){
    return Storage.statistics.gameOver.damage >= 30;
  },
},
{
  name:"takeDamage3",
  title:"稀巴烂",
  desc: "被50点以上伤害杀死",
  prerequests: ["takeDamage2"],
  reward: 30,
  check:function(){
    return Storage.statistics.gameOver.damage >= 50;
  },
},
{
  name:"takeDamage4",
  title:"车祸现场",
  desc: "被100点以上伤害杀死",
  prerequests: ["takeDamage3"],
  reward: 120,
  check:function(){
    return Storage.statistics.gameOver.damage >= 100;
  },
},
{
  name:"oneTurnKill",
  title:"大开无双",
  desc: "一回合内杀死8个以上敌人",
  reward: 10,
  check:function(){
    return Storage.statistics.kill.oneTurn >= 8;
  },
},
{
  name:"oneTurnKill2",
  title:"大开无双II",
  desc: "一回合内杀死12个以上敌人",
  prerequests: ["oneTurnKill"],
  reward: 20,
  check:function(){
    return Storage.statistics.kill.oneTurn >= 12;
  },
},
{
  name:"oneTurnKill3",
  title:"大开无双III",
  desc: "一回合内杀死16个以上敌人",
  prerequests: ["oneTurnKill2"],
  reward: 40,
  check:function(){
    return Storage.statistics.kill.oneTurn >= 16;
  },
},
{
  name:"oneTurnKill4",
  title:"大开无双III",
  desc: "一回合内杀死20个以上敌人",
  prerequests: ["oneTurnKill3"],
  reward: 80,
  check:function(){
    return Storage.statistics.kill.oneTurn >= 20;
  },
},
{
  name:"oneTurnKill5",
  title:"大开无双V",
  desc: "一回合内杀死24个以上敌人",
  prerequests: ["oneTurnKill4"],
  reward: 160,
  check:function(){
    return Storage.statistics.kill.oneTurn >= 24;
  },
}
];
const TITLE_SURFIX = ["","II","III","IV","V"]

var heroType = [
  {
    type:"normal",
    achievementType: "warrior",
    displayName:"战士",
    reward(level){
      return [5,10,30,100,400][level]
    }
  },
  {
    type:"cleric",
    achievementType: "cleric",
    displayName:"牧师",
    reward(level){
      return [5,10,30,100,400][level]
    }
  },
  {
    type:"wizard",
    achievementType: "wizard",
    displayName:"法师",
    reward(level){
      return [5,10,30,100,400][level]
    }
  },
  {
    type:"thief",
    achievementType: "thief",
    displayName:"盗贼",
    reward(level){
      return [5,10,30,100,400][level]
    }
  }
]

heroType.forEach(function(entry){
  for ( var i = 0 ; i < 5; i++ ){
    (function(i){
      achievements.push({
        name:entry.achievementType+"Turn"+(i+1),
        title:entry.displayName+"试炼"+TITLE_SURFIX[i],
        desc: "坚持"+(30*(i+1))+"回合",
        prerequests: i==0?null:[entry.achievementType+"Turn"+i],
        needUnlocks: entry.achievementType == "warrior"? null:[entry.achievementType],
        reward: entry.reward(i),
        check:function(){
          return Storage.statistics.gameOver[entry.type+"Turn"] >= 30*(i+1);
        },
      })
    })(i)
  }
})

var allEnemyType = [
  {
    type:"archer",
    displayName:"骷髅弓箭手",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"ballista",
    displayName:"弩车",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"catapult",
    displayName:"投石车",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"centaur",
    displayName:"半人马射手",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"chomper",
    displayName:"藤蔓怪",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"fireElement",
    displayName:"火元素",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"gargoyle",
    displayName:"石像鬼",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"ghost",
    displayName:"幽灵",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"golem",
    displayName:"魔像",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"killerBee",
    displayName:"杀人蜂",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"kobold",
    displayName:"狗头人",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"medusa",
    displayName:"美杜莎",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"mimic",
    displayName:"宝箱怪",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"minotaur",
    displayName:"牛头人",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"mummy",
    displayName:"木乃伊",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"ooze",
    displayName:"软泥怪",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"orcChief",
    displayName:"兽人酋长",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"orge",
    displayName:"食人魔",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"ratman",
    displayName:"鼠人",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"scorpion",
    displayName:"蝎子",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"skeleton",
    displayName:"骷髅卫兵",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"shaman",
    displayName:"萨满",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"snake",
    displayName:"毒蛇",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"summoner",
    displayName:"唤云师",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"treant",
    displayName:"树人",
    reward(level){
      return [5,10,30,120,600][level]
    }
  },
  {
    type:"troll",
    displayName:"巨魔",
    reward(level){
      return [5,15,60,300,1800][level]
    }
  },
  {
    type:"vampire",
    displayName:"吸血鬼",
    reward(level){
      return [5,10,30,120,600][level]
    }
  }
]

allEnemyType.forEach(function(entry){
  for ( var i = 0 ; i < 5; i++ ){
    (function(i){
      achievements.push({
        name:"kill"+(i+1)+"star"+entry.type,
        title:entry.displayName+"杀手"+TITLE_SURFIX[i],
        desc: "杀死"+(i+1)+"星以上"+entry.displayName,
        prerequests: i==0?null:["kill"+i+"star"+entry.type],
        needSeen: i==0?[entry.type]:null,
        reward: entry.reward(i),
        check:function(){
          return Storage.statistics.kill[entry.type+"Level"] >= Global.STAR_THRESHOLD*(i+1);
        },
      })
    })(i)
  }
})

module.exports = {
  achievements
}
