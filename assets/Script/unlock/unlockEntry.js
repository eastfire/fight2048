import Global from "global";
import Common from "common";
import Storage from "storage";

export default {
  unlocks:[
  {
    name:"warriorSkillSlot3",
    displayName:"战士的第3个技能槽",
    prerequests: null,
    price: 5,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.normal = 3;
      Storage.saveProgress();
    }
  },
  {
    name:"warriorSkillSlot4",
    displayName:"战士的第4个技能槽",
    prerequests: ["warriorSkillSlot3"],
    price: 20,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.normal = 4;
      Storage.saveProgress();
    }
  },
  {
    name:"warriorSkillSlot5",
    displayName:"战士的第5个技能槽",
    prerequests: ["warriorSkillSlot4"],
    price: 100,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.normal = 5;
      Storage.saveProgress();
    }
  },
  {
    name:"backwardSlashSkill",
    displayName:"战士的拖刀技",
    prerequests: null,
    price: 5,
    type:"skill",
    icon: "Texture/Skill/backwardSlashSkill"
  },
  {
    name:"whirlSkill",
    displayName:"战士的回旋斩",
    prerequests: null,
    price: 5,
    type:"skill",
    icon: "Texture/Skill/whirlSkill"
  },{
    name:"bigWhirlSkill",
    displayName:"战士的大回旋斩",
    prerequests: ["whirlSkill"],
    price: 50,
    type:"skill",
    icon: "Texture/Skill/bigWhirlSkill"
  },
  {
    name:"warriorPerkSlot2",
    displayName:"战士的第2个特质槽",
    prerequests: null,
    price: 20,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.normal = 2;
      Storage.saveProgress();
    }
  },
  {
    name:"warriorPerkSlot3",
    displayName:"战士的第3个特质槽",
    prerequests: ["warriorPerkSlot2"],
    price: 20,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.normal = 3;
      Storage.saveProgress();
    }
  },
  {
    name:"warriorPerkSlot4",
    displayName:"战士的第4个特质槽",
    prerequests: ["warriorPerkSlot3"],
    price: 20,
    type:"perkSlot",
    icon: "Texture/perkSlot",
    onUnlock:function(){
      Storage.progress.maxPerk.normal = 4;
      Storage.saveProgress();
    }
  },
  {
    name:"cleric",
    displayName:"牧师",
    prerequests: null,
    price: 100,
    type:"hero",
    icon: "Texture/Hero/unlockCleric"
  },
  {
    name:"clericSkillSlot3",
    displayName:"牧师的第3个技能槽",
    prerequests: ["clericSkillSlot3"],
    price: 50,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.cleric = 3;
      Storage.saveProgress();
    }
  },
  {
    name:"clericSkillSlot4",
    displayName:"牧师的第4个技能槽",
    prerequests: ["clericSkillSlot3"],
    price: 100,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.cleric = 4;
      Storage.saveProgress();
    }
  },
  {
    name:"clericSkillSlot5",
    displayName:"牧师的第5个技能槽",
    prerequests: ["clericSkillSlot4"],
    price: 400,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.cleric = 5;
      Storage.saveProgress();
    }
  },
  {
    name:"wizard",
    displayName:"法师",
    prerequests: null,
    price: 300,
    type:"hero",
    icon: "Texture/Hero/unlockWizard"
  },{
    name:"wizardSkillSlot3",
    displayName:"法师的第3个技能槽",
    prerequests: ["wizardSkillSlot3"],
    price: 100,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.wizard = 3;
      Storage.saveProgress();
    }
  },
  {
    name:"wizardSkillSlot4",
    displayName:"法师的第4个技能槽",
    prerequests: ["wizardSkillSlot3"],
    price: 300,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.wizard = 4;
      Storage.saveProgress();
    }
  },
  {
    name:"wizardSkillSlot5",
    displayName:"法师的第5个技能槽",
    prerequests: ["wizardSkillSlot4"],
    price: 1000,
    type:"skillSlot",
    icon: "Texture/skillSlot",
    onUnlock:function(){
      Storage.progress.maxSkill.wizard = 5;
      Storage.saveProgress();
    }
  },
  {
    name:"thief",
    displayName:"盗贼",
    prerequests: null,
    price: 100,
    type:"hero",
    icon: "Texture/unlockHero"
  },
]
}
