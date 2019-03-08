import Global from "global";
import Common from "common";
import Storage from "storage";

export default {
  perks:[
  {
    name:"halfHpMore",
    title:"身强体壮",
    desc:"生命多５０％",
    value: -4,
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
    title:"灵活多变",
    desc:"升级时多１选择项",
    value: -2,
    apply(){
      Global.CHOICE_NUMBER++;
    }
  },
  {
    name:"moreMaxLevel",
    title:"巨大潜力",
    desc:"所有技能最大等级加1",
    value: -1,
    apply(){
      Global.MAX_LEVEL_ADJUST++;
    }
  },
  {
    name:"moreItemLevel",
    title:"招财进宝",
    desc:"道具掉落的等级+1",
    value: -2,
    apply(){
      Global.ITEM_LEVEL_ADJUST++;
    }
  },
  {
    name:"lessNegativeTime",
    title:"超强免疫",
    desc:"异常状态影响-1回合或-1效果",
    value: -2,
    apply(){
      Global.NEGATIVE_EFFECT_TIME_ADJUST--;
    }
  },
  {
    name:"lessWait",
    title:"天生聪明",
    desc:"所有技能冷却时间-1回合",
    value: -3,
    apply(){
      Global.SKILL_WAIT_ADJUST--;
    }
  },
  {
    name:"moreExpAbove12",
    title:"精英猎手",
    desc:"杀死12级或以上的怪物得到的经验值加40%",
    value: -2,
    apply(){
      Global.MORE_EXP_ABOVE_12 = true;
    },
  },
  //userOthersSkill
  //regeneration1
  {
    name:"manySkill",
    title:"博采众长",
    desc:"可以学习到其他英雄的已解锁技能",
    value: -3,
    apply(){
      Global.MANY_SKILL = true;
    }
  },
  {
    name:"forwardAfterKill",
    title:"鲁莽冲撞",
    desc:"杀死普通敌人后前进\n而不是退回原地",
    value: 0,
    apply(){
      Global.FORWARD_AFTER_KILL = true;
    }
  },
  {
    name:"halfHpLess",
    title:"体弱多病",
    desc:"生命少５０％",
    value: 4,
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
    title:"冥顽不灵",
    desc:"升级时少１选择项",
    value: 2,
    apply(){
      Global.CHOICE_NUMBER--;
    }
  },
  {
    name:"lessMaxLevel",
    title:"潜力不足",
    desc:"所有技能最大等级减1",
    value: 1,
    apply(){
      Global.MAX_LEVEL_ADJUST--;
    }
  },
  {
    name:"lessItemLevel",
    title:"穷神附体",
    desc:"道具掉落的等级-1\n可能造成不掉落",
    value: 2,
    apply(){
      Global.ITEM_LEVEL_ADJUST--;
    }
  },
  {
    name:"moreNegativeTime",
    title:"过敏体质",
    desc:"异常状态影响+1回合/效果",
    value: 2,
    apply(){
      Global.NEGATIVE_EFFECT_TIME_ADJUST++;
    }
  },
  {
    name:"moreWait",
    title:"笨手笨脚",
    desc:"所有技能冷却时间+1回合",
    value: 3,
    apply(){
      Global.SKILL_WAIT_ADJUST++;
    }
  },
  {
    name:"initHp5",
    title:"身受重伤",
    desc:"以5生命开始游戏",
    value: 1,
    apply(){
      Global.INIT_HP = 5;
    },
  },
  {
    name:"lessExpBelow6",
    title:"挑肥拣瘦",
    desc:"杀死6级或以下的怪物得到的经验值减少40%",
    value: 2,
    apply(){
      Global.LESS_EXP_BELOW_6 = true;
    },
  },
  {
    name:"poisonPotion",
    title:"质量问题",
    desc:"掉落道具时可能会掉落毒药",
    value: 2,
    apply(){
      Global.ITEM_POOL.push("poisonPotion")
    },
  },
]}
