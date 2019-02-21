import Global from "global";

export default {
  getSkill(opt){
    return {
      name:"技能："+opt.displayName,
      icon:opt.icon,
      desc:opt.desc,
      validate(){
        return !Global.currentRoomScene.getSkill(opt.name)
      },
      onChosen:function(){
        Global.currentRoomScene.gainSkill(opt.name);
      }
    };
  },
  levelUpSkill(opt){
    return {
      name:"升级技能："+opt.displayName,
      icon:opt.icon,
      desc:opt.levelUpDesc,
      onChosen:function(){
        Global.currentRoomScene.getSkill(opt.name).gainComponent("skill").levelUp(opt.number || 1);
      },
      validate(){
        var skill = Global.currentRoomScene.getSkill(opt.name)
        return skill && skill.level < skill.maxLevel
      }
    };
  },
  getScore(opt){
    return {
      name:"加"+opt.number+"分",
      icon:"Texture/icon-exp",
      desc:"",
      onChosen:function(){
        Global.currentRoomScene.gainScore(opt.number);
      }
    }
  },

}
