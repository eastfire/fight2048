import Skill from "skill";
import Global from "../global"
import Common from "../common"
const i18n = require('i18n');

cc.Class({
  extends: Skill,

  properties: {
    effect:{
      get(){
        return 4*this.level;
      }
    },
  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "wisdomSkill"
    this.icon="Skill/wisdomSkill";
    this.displayName = i18n.t("wisdomSkill/name")
    this.desc = i18n.t("wisdomSkill/desc", {
      effect: Math.round(this.effect*Global.WISDOM_EFFECT*100)
      });
  },
  levelUpDesc(level){
    return i18n.t("wisdomSkill/levelUp")
  },
  start () {
    this._super()
    this.coolDown = 12+Global.SKILL_WAIT_ADJUST;
  },
  onLevelUp(level){
    this.coolDown+=1;
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("wisdom",1,{effect: this.effect})
    hero.afterUseSkill()
  }
  // update (dt) {},
});
