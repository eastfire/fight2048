const Skill = require("skill");
const Global = require("global");
const Common = require("common");
const Enemy = require("enemy");
const i18n = require('i18n');

cc.Class({
  extends: Skill,

  properties: {

  },

  // LIFE-CYCLE CALLBACKS:
  ctor() {
    this.skillName = "backwardSlashSkill"
    this.icon="Skill/backwardSlashSkill";
    this.displayName = i18n.t("backwardSlashSkill/name")
    this.desc = i18n.t("backwardSlashSkill/desc");
    this.coolDown = 9+Global.SKILL_WAIT_ADJUST;
  },
  levelUpDesc(level){
    return i18n.t("backwardSlashSkill/levelUp")
  },
  onLevelUp(level){
    this.coolDown-=1;
    this.reduceWait(1)
  },
  onUsed() {
    var hero = Global.currentRoom.hero.getComponent("hero");
    hero.gainStatus("backwardSlashStatus",1)

    //TODO skill EFFECT
    // this.scheduleOnce(function(){
      hero.afterUseSkill()
    // }, Global.HERO_ATTACK_TIME/2);
  }
  // update (dt) {},
});
