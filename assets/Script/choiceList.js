import Global from "global";

export default {
  getSkill(opt){
    return {
      validate(){
        return true;
      }
    };
  },
  levelUpSkill(opt){

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
