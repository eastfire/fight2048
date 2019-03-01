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

  BASE_HP: 15,
  HP_INFLATION_RATE: 5,
  SCORE_INFLATION_RATE: 20,
  EXP_INFLATION_RATE: 10,
  MONEY_INFLATION_RATE: 1,

  STAR_THRESHOLD: 6,
  MAX_STAR: 5,

  ORIGIN_CONSTITUTION_EFFECT : 5,
  ORIGIN_CHOICE_NUMBER : 3,

  ENEMY_LUCK_EFFECT: 0.006,
  LUCK_EFFECT : 0.01,
  CUNNING_EFFECT : 0.01,
  BASE_DEXTERITY : 0.02,
  ENEMY_DEXTERITY_EFFECT : 0.01,
  DEXTERITY_EFFECT : 0.02,
  DODGE_EFFECT : 0.01,
  RECOVERY_EFFECT : 0.01,
  CONSTITUTION_EFFECT : 5,

  NEGATIVE_EFFECT_TIME_ADJUST : 0,
  ITEM_LEVEL_ADJUST: 0,

  STAR_THRESHOLD: 6,
  MAX_STAR:5,

  NEGATIVE_EFFECTS : ["frozen","cursed","dizzy","forbid","poison","blind","stun"],

  ENEMY_POOL_CHANGE_PER_TURN: 29,
  ENEMY_LEVEL_POOL_CHANGE_PER_TURN: 89,
  ENEMY_NUNBER_CHANGE_PER_TURN: 501,
  MAX_ENEMY_TYPE_IN_FIELD:4,
  MAX_GEN_ENEMY_NUMBER: 4,
  MAX_ENEMY_LEVEL_DIFF: 3,

  currentHeroType: "normal",
  currentSkillPool: [],

  basicSkill: ["luckSkill"],
  // basicSkill: ["healSkill","coolingSkill","constitutionSkill","dexteritySkill","luckSkill"],
  heroBasicSkill: {
    normal: ["forwardSlashSkill","horizontalSlashSkill","verticalSlashSkill"],
    wizard: ["dispelSkill","missileSkill","spiderWebSkill"],
    cleric: ["dispelSkill"],
    thief: []
  },
  heroUnlockableSkill: {
    normal: ["backwardSlashSkill","whirlSkill","bigWhirlSkill","crossSlashSkill"],
    wizard: ["teleportSkill","meteorShowerSkill"],
    cleric: ["turnUndeadSkill"]
  }
}
