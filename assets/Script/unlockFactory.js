import Global from "global";

function unlockHero(opt){
  return function(){
    var unlock = new cc.Node();
    skill.addComponent(opt.name);
    skill = skill.getComponent("skill")
    return {
      name:"解锁"+unlock.displayName,
      icon:"Texture/"+skill.icon,
      desc:skill.levelUpDesc(skill.level+1),
      onChosen:function(){
        skill.levelUp(opt.number || 1);
      },
      validate(){
        return skill && skill.level < skill.maxLevel
      }
    }
  }
}

export default {
  unlockHero,
}
