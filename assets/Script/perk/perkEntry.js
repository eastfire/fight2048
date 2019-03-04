import Global from "global";
import Common from "common";
import Storage from "storage";

export default {
  perks:[
  {
    name:"halfHpMore",
    title:"强壮",
    desc:"生命多５０％",
    value: -3,
    icon: "Texture/Perk/halfHpMore",
    apply(){
      var rate = Global.BASE_HP/Global.ORIGIN_BASE_HP + 0.5;
      Global.BASE_HP = Global.ORIGIN_BASE_HP * rate;
      rate = Global.HP_PER_LEVEL/Global.ORIGIN_HP_PER_LEVEL + 0.5;
      Global.HP_PER_LEVEL = Global.ORIGIN_HP_PER_LEVEL * rate;
      rate = Global.CONSTITUTION_EFFECT/Global.ORIGIN_CONSTITUTION_EFFECT + 0.5;
      Global.CONSTITUTION_EFFECT = Global.ORIGIN_CONSTITUTION_EFFECT * rate;
    }
  },
  {
    name:"moreChoice",
    title:"灵活",
    desc:"升级时多１选择项",
    value: -2,
    icon: "Texture/Perk/moreChoice",
    apply(){
      Global.CHOICE_NUMBER++;
    }
  },
  {
    name:"forwardAfterKill",
    title:"莽撞",
    desc:"杀死普通敌人后前进\n而不是退回原地",
    value: 0,
    icon: "Texture/Perk/forwardAfterKill",
    apply(){
      Global.FORWARD_AFTER_KILL = true;
    }
  },
  {
    name:"halfHpLess",
    title:"虚弱",
    desc:"生命少５０％",
    value: 3,
    icon: "Texture/Perk/halfHpLess",
    apply(){
      var rate = Global.BASE_HP/Global.ORIGIN_BASE_HP - 0.5;
      Global.BASE_HP = Global.ORIGIN_BASE_HP * rate;
      rate = Global.HP_PER_LEVEL/Global.ORIGIN_HP_PER_LEVEL - 0.5;
      Global.HP_PER_LEVEL = Global.ORIGIN_HP_PER_LEVEL * rate;
      rate = Global.CONSTITUTION_EFFECT/Global.ORIGIN_CONSTITUTION_EFFECT - 0.5;
      Global.CONSTITUTION_EFFECT = Global.ORIGIN_CONSTITUTION_EFFECT * rate;
    },
  },
  {
    name:"lessChoice",
    title:"僵化",
    desc:"升级时少１选择项",
    value: 2,
    icon: "Texture/Perk/lessChoice",
    apply(){
      Global.CHOICE_NUMBER--;
    }
  }
]}
