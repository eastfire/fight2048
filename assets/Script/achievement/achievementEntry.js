import Global from "global";
import Common from "common";
import Storage from "storage";

export default {
  achievements:[
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
    reward: 1000,
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
    title:"啊，一个苹果",
    desc: "死于中毒",
    reward: 20,
    check:function(){
      return Storage.statistics.gameOver.poison > 0;
    },
  },
  {
    name:"warriorTurn1",
    title:"战士试炼I",
    desc: "坚持30回合",
    reward: 5,
    check:function(){
      return Storage.statistics.gameOver.normalTurn >= 30;
    },
  },
  {
    name:"warriorTurn2",
    title:"战士试炼II",
    desc: "坚持60回合",
    prerequests: ["warriorTurn1"],
    reward: 20,
    check:function(){
      return Storage.statistics.gameOver.normalTurn >= 60;
    },
  },
  {
    name:"warriorTurn3",
    title:"战士试炼III",
    desc: "坚持100回合",
    prerequests: ["warriorTurn2"],
    reward: 50,
    check:function(){
      return Storage.statistics.gameOver.normalTurn >= 100;
    },
  },
  {
    name:"warriorTurn4",
    title:"战士试炼IV",
    desc: "坚持150回合",
    prerequests: ["warriorTurn3"],
    reward: 200,
    check:function(){
      return Storage.statistics.gameOver.normalTurn >= 150;
    },
  },
  {
    name:"warriorTurn5",
    title:"战士试炼V",
    desc: "坚持250回合",
    prerequests: ["warriorTurn4"],
    reward: 1000,
    check:function(){
      return Storage.statistics.gameOver.normalTurn >= 250;
    },
  },
  {
    name:"clericTurn1",
    title:"牧师试炼I",
    desc: "坚持30回合",
    needUnlocks: ["cleric"],
    reward: 5,
    check:function(){
      return Storage.statistics.gameOver.clericTurn >= 30;
    },
  },
  {
    name:"clericTurn2",
    title:"牧师试炼II",
    desc: "坚持60回合",
    prerequests: ["clericTurn1"],
    reward: 20,
    check:function(){
      return Storage.statistics.gameOver.clericTurn >= 60;
    },
  },
  {
    name:"clericTurn3",
    title:"牧师试炼III",
    desc: "坚持100回合",
    prerequests: ["clericTurn2"],
    reward: 50,
    check:function(){
      return Storage.statistics.gameOver.clericTurn >= 100;
    },
  },
  {
    name:"clericTurn4",
    title:"牧师试炼IV",
    desc: "坚持150回合",
    prerequests: ["clericTurn3"],
    reward: 200,
    check:function(){
      return Storage.statistics.gameOver.clericTurn >= 150;
    },
  },
  {
    name:"clericTurn5",
    title:"牧师试炼V",
    desc: "坚持250回合",
    prerequests: ["clericTurn4"],
    reward: 1000,
    check:function(){
      return Storage.statistics.gameOver.clericTurn >= 250;
    },
  },{
    name:"wizardTurn1",
    title:"法师试炼I",
    desc: "坚持30回合",
    needUnlocks: ["wizard"],
    reward: 5,
    check:function(){
      return Storage.statistics.gameOver.wizardTurn >= 30;
    },
  },
  {
    name:"wizardTurn2",
    title:"法师试炼II",
    desc: "坚持60回合",
    prerequests: ["wizardTurn1"],
    reward: 20,
    check:function(){
      return Storage.statistics.gameOver.wizardTurn >= 60;
    },
  },
  {
    name:"wizardTurn3",
    title:"法师试炼III",
    desc: "坚持100回合",
    prerequests: ["wizardTurn2"],
    reward: 50,
    check:function(){
      return Storage.statistics.gameOver.wizardTurn >= 100;
    },
  },
  {
    name:"wizardTurn4",
    title:"法师试炼IV",
    desc: "坚持150回合",
    prerequests: ["wizardTurn3"],
    reward: 200,
    check:function(){
      return Storage.statistics.gameOver.wizardTurn >= 150;
    },
  },
  {
    name:"wizardTurn5",
    title:"法师试炼V",
    desc: "坚持250回合",
    prerequests: ["wizardTurn4"],
    reward: 1000,
    check:function(){
      return Storage.statistics.gameOver.wizardTurn >= 250;
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
    reward: 1000,
    check:function(){
      return Storage.statistics.kill.slimeLevel >= Global.STAR_THRESHOLD*5;
    },
  },
  {
    name:"takeDamage",
    title:"破点皮没事的",
    desc: "被10点以上伤害杀死",
    reward: 10,
    check:function(){
      return Storage.statistics.gameOver.damage >= 10;
    },
  },
  {
    name:"takeDamage2",
    title:"啊,好痛!",
    desc: "被30点以上伤害杀死",
    prerequests: ["takeDamage"],
    reward: 20,
    check:function(){
      return Storage.statistics.gameOver.damage >= 30;
    },
  },
  {
    name:"takeDamage3",
    title:"稀巴烂",
    desc: "被50点以上伤害杀死",
    prerequests: ["takeDamage2"],
    reward: 50,
    check:function(){
      return Storage.statistics.gameOver.damage >= 50;
    },
  },
  {
    name:"takeDamage4",
    title:"车祸现场",
    desc: "被100点以上伤害杀死",
    prerequests: ["takeDamage3"],
    reward: 200,
    check:function(){
      return Storage.statistics.gameOver.damage >= 100;
    },
  },

]
}
