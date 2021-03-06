const Global = require("global");
const Storage = require("storage");

function levelUpSkill(opt){
  return function(){
    var skill = Global.currentRoomScene.getSkill(opt.name).getComponent("skill")
    return {
      name:"升级技能："+skill.displayName+" 到"+(skill.level+1)+"级",
      icon:"Texture/"+skill.icon,
      desc:skill.levelUpDesc(skill.level+1),
      onChosen:function(){
        skill.levelUp();
      },
      validate(){
        return skill && skill.level < skill.maxLevel+Global.MAX_LEVEL_ADJUST
      }
    }
  }
}

module.exports = {
  getSkill(opt){
    var skill = new cc.Node();
    skill.addComponent(opt.name);
    skill = skill.getComponent("skill")
    return {
      name:"技能："+skill.displayName,
      icon:"Texture/"+skill.icon,
      desc:skill.desc,
      validate(){
        if ( skill.isPassive ) return !Global.currentRoomScene.getSkill(opt.name);
        var skillCount = Global.currentRoomScene.activeSkillCount();
        var maxSkill = Storage.progress.maxSkill[Global.currentHeroType]||2;
        return !Global.currentRoomScene.getSkill(opt.name) && skillCount < maxSkill && skillCount >= opt.minSkillCount;
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
      icon:"Texture/icon-score",
      desc(){
        return "加"+opt.number*(Global.currentRoom.hero.getComponent("hero").level-1)+"分"
      },
      onChosen:function(){
        Global.currentRoomScene.gainScore(opt.number*(Global.currentRoom.hero.getComponent("hero").level-1));
      }
    }
  },

}
