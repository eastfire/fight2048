import Skill from "../skill";

cc.Class({
    extends: Skill,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.getComponent("skill").icon="healSkill";
      this.getComponent("skill").displayName = "治疗"
    },
    start () {

    },

    // update (dt) {},
});
