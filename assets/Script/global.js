export default {
  currentRoom: null,
  currentRoomScene: null,

  STEP_TIME: 0.14,
  GENERATE_TIME: 0.300,
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

  ORIGIN_BASE_HP: 20,
  ORIGIN_HP_PER_LEVEL: 5,
  ORIGIN_SCORE_INFLATION_RATE: 20,
  ORIGIN_EXP_INFLATION_RATE: 10,
  ORIGIN_MONEY_INFLATION_RATE: 1,
  ORIGIN_STAR_THRESHOLD: 6,
  ORIGIN_MAX_LEVEL_ADJUST: 0,
  MAX_STAR: 5,

  ORIGIN_CONSTITUTION_EFFECT : 5,
  ORIGIN_CHOICE_NUMBER : 3,
  ORIGIN_SKILL_WAIT_ADJUST: 0,
  ORIGIN_ENEMY_LUCK_EFFECT: 0.01,
  ORIGIN_LUCK_EFFECT : 0.01,
  ORIGIN_ENEMY_DEXTERITY_EFFECT : 0.01,
  ORIGIN_DEXTERITY_EFFECT : 0.02,
  ORIGIN_RECOVERY: 0,
  ORIGIN_WISDOM_EFFECT: 0.05,
  ORIGIN_NEGATIVE_EFFECT_TIME_ADJUST : 0,
  ORIGIN_ITEM_LEVEL_ADJUST: 0,

  NEGATIVE_EFFECTS : ["frozen","cursed","dizzy","forbid","poison","blind","stun"],

  ENEMY_POOL_CHANGE_PER_TURN: 29,
  ENEMY_LEVEL_POOL_CHANGE_PER_TURN: 47,
  ENEMY_NUNBER_CHANGE_PER_TURN: 501,
  MAX_ENEMY_TYPE_IN_FIELD:4,
  MAX_GEN_ENEMY_NUMBER: 4,
  MAX_ENEMY_LEVEL_DIFF: 2,

  MAX_PERK: 4,
  PERK_SCORE_ADJUST: 0.05,

  currentHeroType: "normal",
  selectedPerk: [],
  currentSkillPool: [],

  basicSkill: ["coolingSkill","constitutionSkill","dexteritySkill","luckSkill"],
  // basicSkill: ["lighteningSkill"],
  heroBasicSkill: {
    normal: ["forwardSlashSkill","horizontalSlashSkill","verticalSlashSkill"],
    wizard: ["missileSkill","spiderWebSkill","iceWallSkill"],
    cleric: ["healSkill","dispelSkill","shieldSkill","calmSkill"],
    thief: [] //four arrow, four diagnal arrow， bomb
  },
  heroUnlockableSkill: {
    normal: ["backwardSlashSkill","whirlSkill","bigWhirlSkill","crossSlashSkill"], //charge
    wizard: ["teleportSkill","meteorShowerSkill","lighteningSkill"], //fireball， tornado, lightening
    cleric: ["turnUndeadSkill","resurrectionSkill","wisdomSkill"], //
    thief: [] //8 arrow, smokebomb
  },
  reset(){
    this.ITEM_POOL = ["potion"]
    this.BASE_HP = this.ORIGIN_BASE_HP
    this.HP_PER_LEVEL = this.ORIGIN_HP_PER_LEVEL
    this.SCORE_INFLATION_RATE = this.ORIGIN_SCORE_INFLATION_RATE
    this.EXP_INFLATION_RATE = this.ORIGIN_EXP_INFLATION_RATE
    this.MONEY_INFLATION_RATE = this.ORIGIN_MONEY_INFLATION_RATE
    this.STAR_THRESHOLD = this.ORIGIN_STAR_THRESHOLD
    this.CONSTITUTION_EFFECT = this.ORIGIN_CONSTITUTION_EFFECT
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
    this.FORWARD_AFTER_KILL = false;
    this.MAX_LEVEL_ADJUST = this.ORIGIN_MAX_LEVEL_ADJUST
  }
}
