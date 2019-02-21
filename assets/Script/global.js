export default {
  currentRoom: null,
  currentRoomScene: null,

  STEP_TIME: 0.100,
  GENERATE_TIME: 0.300,
  HERO_ATTACK_TIME: 0.3,
  ENEMY_ATTACK_TIME: 0.3,

  TILE_WIDTH: 120,
  TILE_HEIGHT: 120,

  HP_INFLATION_RATE: 20,
  SCORE_INFLATION_RATE: 20,
  EXP_INFLATION_RATE: 10,
  MONEY_INFLATION_RATE: 1,

  STAR_THRESHOLD: 6,
  MAX_STAR: 5,

  ORIGIN_CONSTITUTION_EFFECT : 5,
  ORIGIN_CHOICE_NUMBER : 3,

  LUCK_EFFECT : 0.01,
  CUNNING_EFFECT : 0.01,
  DEXTERITY_EFFECT : 0.01,
  DODGE_EFFECT : 0.01,
  RECOVERY_EFFECT : 0.01,
  CONSTITUTION_EFFECT : 5,

  NEGATIVE_EFFECT_TIME_ADJUST : 0,

  NEGATIVE_EFFECTS : ["frozen","cursed","dizzy","forbidDraw","poison","blind"],
  AUTO_DECREASE_EFFECTS : ["dizzy","forbidDraw","dispel","poison","blind","forwardSlash"], //freeze is handle in Movable
}
