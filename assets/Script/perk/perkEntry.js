const Global = require("global");
const Common = require("common");
const Storage = require("storage");

module.exports = {
  perks:[
    {
      name:"forwardAfterKill",
      title:"鲁莽冲撞",
      desc:"杀死普通敌人后前进\n而不是退回原地",
      price:[10],
      apply(){
        Global.FORWARD_AFTER_KILL = true;
      }
    },
  {
    name:"moreHp",
    title:"身强体壮",
    desc:function(level){
      return "每次升级或增加体质获得的生命多"+(level*10)+"%";
    },
    price:[10,40,200,1200,10000],
    apply(){
      var moreHp = Storage.progress.perk.moreHp || 0;
      var rate = Global.HP_PER_LEVEL/Global.ORIGIN_HP_PER_LEVEL + 0.1*moreHp;
      Global.HP_PER_LEVEL = Global.ORIGIN_HP_PER_LEVEL * rate;
      Global.CONSTITUTION_EFFECT = Global.ORIGIN_CONSTITUTION_EFFECT * rate;
    }
  },
  {
    name:"moreExp",
    title:"经验老道",
    desc:function(level){
      return "每次杀死1个敌人多得到"+(level)+"经验值";
    },
    price:[10,40,200,1200,10000],
    apply(){
      Global.ENEMY_EXP_ADJUST = Storage.progress.perk.moreExp;
    }
  },
  {
    name:"moreChoice",
    title:"灵活多变",
    desc:"升级时多１选择项",
    price: [300],
    apply(){
      Global.CHOICE_NUMBER++;
    }
  },
  {
    name:"moreMaxLevel",
    title:"巨大潜力",
    desc:function(level){
      return "所有技能最大等级加"+level;
    },
    price: [500],
    apply(){
      Global.MAX_LEVEL_ADJUST += Storage.progress.moreMaxLevel;
    }
  },
  {
    name:"moreItemLevel",
    title:"招财进宝",
    desc:function(level){
      return "道具掉落的等级+"+level;
    },
    price: [100,500],
    apply(){
      Global.ITEM_LEVEL_ADJUST += Storage.progress.perk.moreItemLevel;
    }
  },
  {
    name:"morePotionEffect",
    title:"",
    desc:function(level){
      return "回复药治疗效果加"+(level*10)+"%";
    },
    price: [100,200,600,2400,10000],
    apply(){
      Global.POTION_EFFECT += Storage.progress.perk.morePotionEffect;
    }
  },
  {
    name:"lessNegativeTime",
    title:"超强免疫",
    desc:"异常状态影响-1回合或-1效果",
    price: [500],
    apply(){
      Global.NEGATIVE_EFFECT_TIME_ADJUST--;
    }
  },
  {
    name:"lessWait",
    title:"天生聪明",
    desc:"所有技能冷却时间-1回合",
    price: [1000],
    apply(){
      Global.SKILL_WAIT_ADJUST--;
    }
  },
  {
    name:"moreExpAbove12",
    title:"精英猎手",
    desc:function(level){
      return "杀死12级或以上的怪物得到的经验值加"+(level*10)+"%";
    },
    price: [200,400,1200,4800,20000],
    apply(){
      Global.MORE_EXP_ABOVE_12 = Storage.progress.perk.moreExpAbove12;
    },
  },
  {
    name:"manySkill",
    title:"博采众长",
    desc:"可以学习到其他英雄的已解锁技能",
    price: [500],
    apply(){
      Global.MANY_SKILL = true;
    }
  },

]}
