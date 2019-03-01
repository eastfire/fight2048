import Global from "global";
import Common from "common";
import Storage from "storage";

export default {
  achievements:[
  {
    name:"die1",
    title:"第一滴血",
    desc: "死亡1次",
    prerequests: null,
    reward: 5,
    icon: "",
    validate:function(){
      return Storage.statistics.gameTime >= 1;
    }
  },
  ]
}
