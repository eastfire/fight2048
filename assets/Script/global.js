"use strict";

module.exports = {
  currentRoom: null,
  currentRoomScene: null,

  STEP_TIME: 0.13,
  GENERATE_TIME: 0.250,
  HERO_ATTACK_TIME: 0.3,
  ENEMY_ATTACK_TIME: 0.3,
  DIALOG_EXIT_TIME: 0.4,
  CHOICE_SELECT_TIME: 0.2,
  GET_STAR_TIME: 0.3,
  LOSE_STATUS_TIME: 0.2,
  TELEPORT_TIME: 0.3,

  TILE_WIDTH: 120,
  TILE_HEIGHT: 120,
  ROOM_PADDING: 20,

  ORIGIN_BASE_HP: 15,
  ORIGIN_HP_PER_LEVEL: 10,
  ORIGIN_SCORE_INFLATION_RATE: 20,
  ORIGIN_EXP_INFLATION_RATE: 10,
  ORIGIN_MONEY_INFLATION_RATE: 1,
  ORIGIN_STAR_THRESHOLD: 6,
  ORIGIN_MAX_LEVEL_ADJUST: 0,
  MAX_STAR: 5,

  ORIGIN_CONSTITUTION_EFFECT : 10,
  ORIGIN_POTION_EFFECT: 10,
  ORIGIN_ENEMY_EXP_ADJUST: 0,
  ORIGIN_CHOICE_NUMBER : 3,
  ORIGIN_SKILL_WAIT_ADJUST: 0,
  ORIGIN_ENEMY_LUCK_EFFECT: 0.005,
  ORIGIN_LUCK_EFFECT : 0.01,
  ORIGIN_ENEMY_DEXTERITY_EFFECT : 0.01,
  ORIGIN_DEXTERITY_EFFECT : 0.05,
  ORIGIN_RECOVERY: 0,
  ORIGIN_WISDOM_EFFECT: 0.05,
  ORIGIN_NEGATIVE_EFFECT_TIME_ADJUST : 0,
  ORIGIN_ITEM_LEVEL_ADJUST: 0,

  NEGATIVE_EFFECTS : ["frozen","cursed","dizzy","forbid","poison","blind","stun","slowed"],

  ENEMY_POOL_CHANGE_PER_TURN: 29,
  ENEMY_LEVEL_POOL_CHANGE_PER_TURN: 53,
  ENEMY_NUNBER_CHANGE_PER_TURN: 301,
  BOSS_APPEAR_PER_TURN: 91,
  ORIGIN_MAX_ENEMY_TYPE_IN_FIELD: 3,
  MAX_GEN_ENEMY_NUMBER: 4,
  MAX_ENEMY_LEVEL_DIFF: 2,

  HERO_TOMB_THRESHOLD: 50,
  MAX_PERK: 4,
  PERK_SCORE_ADJUST: 0.05,

  REWARD_THRESHOLD: 50,

  currentHeroType: "normal",
  selectedPerk: [],
  currentSkillPool: [],

  movablePrefabs:{},

  basicSkill: ["coolingSkill","constitutionSkill","dexteritySkill","luckSkill"],
  // basicSkill: ["fireballSkill"],
  heroBasicSkill: {
    normal: ["forwardSlashSkill","horizontalSlashSkill","verticalSlashSkill"],
    wizard: ["missileSkill","spiderWebSkill","iceWallSkill"],
    cleric: ["healSkill","dispelSkill","shieldSkill","calmSkill"],
    thief: ["fourArrowSkill","fourDiagnalArrowSkill","bombSkill"]
  },
  heroUnlockableSkill: {
    normal: ["backwardSlashSkill","whirlSkill","bigWhirlSkill","crossSlashSkill"], //throneShieldSkill
    wizard: ["teleportSkill","meteorShowerSkill","lighteningSkill","fireballSkill","tornadoSkill"],
    cleric: ["turnUndeadSkill","resurrectionSkill","wisdomSkill","angelSkill"],
    thief: ["eightArrowSkill","smokingBombSkill","treasureSkill","exchangeSkill","blinkSkill"] //
  },
  initEnemyPool: [{type:"slime",subtype:"R"},{type:"slime",subtype:"G"},{type:"slime",subtype:"Y"}],
  enemyList:["archer","ballista","catapult","centaur","chomper","fireElement","gargoyle","ghost","golem","killerBee","kobold","medusa","mimic","minotaur",
  "mummy","ooze","orcChief","orge","ratman","scorpion","skeleton","shaman","snake","summoner","treant","troll","vampire"],
  // enemyList:["centaur"],
  bossPool:["bossBeholder","bossHydra","bossDeath"],
  // bossPool:["bossDeath"],
  loadRoomEntry(entry){
    this.exit = false;
    this.roomEntry = entry;
  },
  reset(){
    this.ITEM_POOL = ["potion"]
    this.BASE_HP = this.ORIGIN_BASE_HP;
    this.INIT_HP = null;
    this.HP_PER_LEVEL = this.ORIGIN_HP_PER_LEVEL;
    this.SCORE_INFLATION_RATE = this.ORIGIN_SCORE_INFLATION_RATE;
    this.EXP_INFLATION_RATE = this.ORIGIN_EXP_INFLATION_RATE;
    this.MONEY_INFLATION_RATE = this.ORIGIN_MONEY_INFLATION_RATE;
    this.STAR_THRESHOLD = this.ORIGIN_STAR_THRESHOLD;
    this.CONSTITUTION_EFFECT = this.ORIGIN_CONSTITUTION_EFFECT;
    this.POTION_EFFECT = this.ORIGIN_POTION_EFFECT;
    this.ENEMY_EXP_ADJUST = this.ORIGIN_ENEMY_EXP_ADJUST;
    this.CHOICE_NUMBER = this.ORIGIN_CHOICE_NUMBER
    this.SKILL_WAIT_ADJUST = this.ORIGIN_SKILL_WAIT_ADJUST
    this.ENEMY_LUCK_EFFECT = this.ORIGIN_ENEMY_LUCK_EFFECT
    this.LUCK_EFFECT = this.ORIGIN_LUCK_EFFECT
    this.ENEMY_DEXTERITY_EFFECT = this.ORIGIN_ENEMY_DEXTERITY_EFFECT
    this.DEXTERITY_EFFECT = this.ORIGIN_DEXTERITY_EFFECT
    this.RECOVERY = this.ORIGIN_RECOVERY
    this.WISDOM_EFFECT = this.ORIGIN_WISDOM_EFFECT
    this.NEGATIVE_EFFECT_TIME_ADJUST = this.ORIGIN_NEGATIVE_EFFECT_TIME_ADJUST
    this.ITEM_LEVEL_ADJUST = this.ORIGIN_ITEM_LEVEL_ADJUST
    this.MAX_LEVEL_ADJUST = this.ORIGIN_MAX_LEVEL_ADJUST
    this.MAX_ENEMY_TYPE_IN_FIELD = this.ORIGIN_MAX_ENEMY_TYPE_IN_FIELD;
    this.FORWARD_AFTER_KILL = false;
    this.MANY_SKILL = this.LESS_EXP_BELOW_6 = false;
    this.MORE_EXP_ABOVE_12 = 0;
  }
}
