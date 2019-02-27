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
  getSkill(opt){
    var skill = new cc.Node();
    skill.addComponent(opt.name);
    skill = skill.getComponent("skill")
    return {
      name:"技能："+skill.displayName,
      icon:"Texture/"+skill.icon,
      desc:skill.desc,
      validate(){
        var skillCount = Global.currentRoomScene.skillCount();
        return !Global.currentRoomScene.getSkill(opt.name) && skillCount < Global.currentRoom.hero.getComponent("hero").maxSkill &&
          skillCount >= opt.minSkillCount;
      },
      onChosen:function(){
        Global.currentRoomScene.gainSkill(opt.name, opt.level);
        Global.currentChoicePool.push(levelUpSkill({name:opt.name}))
      }
    };
  },
  levelUpSkill,
  getScore(opt){
    return {
      name:"",
      icon:null,
      desc:"加"+opt.number+"分",
      onChosen:function(){
        Global.currentRoomScene.gainScore(opt.number);
      }
    }
  },

}
