import Global from "global"
const Enemy = require("enemy");
import Effect from "effect"

cc.Class({
    extends: Enemy,

    properties: {
      isBoss: true,
    },

    start(){
      this.life = 3;
      this.weakPoint = {
        x: 0,
        y: 0
      }
      //TODO show life

      //TODO show weakPoint


    }
    // update (dt) {},
});
