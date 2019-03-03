import Skill from "skill";
import Global from "../global"
import Common from "../common"

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return 0.2*this.level;
      }
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "wisdomSkill"
    this.icon="Skill/wisdomSkill";
    this.displayName = "睿智"
    this.desc = "本回合经验值收入增加"+Math.round(this.effect*100)+"%";
  },
  levelUpDesc(level){
    return "本回合经验值收入增加20%，但冷却时间也增加1回合"
  },
  start () {
    this._super()
    this.coolDown = 10;
  },
  onLevelUp(level){
    this.coolDown+=1;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("wisdom",1)
    hero.getStatus("wisdom").effect = this.effect
    hero.afterUseSkill()
  }
  // update (dt) {},
});
