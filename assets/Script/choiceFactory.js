import Global from "global";
import AllSkill from "allSkill";

function levelUpSkill(opt){
  return function(){
    var skill = Global.currentRoomScene.getSkill(opt.name).getComponent("skill")
    return {
      name:"升级技能："+skill.displayName+" 到"+(skill.level+1)+"级",
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
    var skill = new AllSkill[opt.name]();
    return {
      name:"技能："+skill.displayName,
      icon:"Texture/"+skill.icon,
      desc:skill.desc,
      validate(){
        return !Global.currentRoomScene.getSkill(opt.name)
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
      icon:"Texture/icon-exp",
      desc:"加"+opt.number+"分",
      onChosen:function(){
        Global.currentRoomScene.gainScore(opt.number);
      }
    }
  },

}
