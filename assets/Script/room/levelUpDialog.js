import Global from "global";
import Common from "common";
import Effect from "effect";

cc.Class({
    extends: cc.Component,

    properties: {
      okButton: cc.Button,
      refreshButton: cc.Button,
      choiceList: cc.Layout,
      title: cc.Label,
      choicePrefab: cc.Prefab,
      priceLabel: cc.Label,
      price: {
        default: 1,
        notify(oldValue){
          if ( oldValue == this.price ) return;
          this.priceLabel.string = "-"+this.price;
          this.refreshButton.interactable = Global.currentRoomScene.star >= this.price;
        }
      }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      this.title.string = "恭喜你升到第"+Global.currentRoom.hero.getComponent("hero").level+"级";
      this.priceLabel.string = "-"+this.price;
      this.refreshButton.interactable = Global.currentRoomScene.star >= this.price;
      this.currentChoice = null;
    },
    initChoicePool(pool, choiceNumber, callback, context) {
      this.currentChoice = null;
      this.callback = callback;
      this.context = context;
      this.choiceNumber = choiceNumber;
      this.pool = pool;

      this.generateList();
    },
    onOk() {
      this.node.runAction(cc.sequence(
        cc.fadeOut(Global.DIALOG_EXIT_TIME),
        cc.removeSelf(),
        cc.callFunc(function(){
          if (this.callback) {
            this.callback.call(this.context);
          }
        },this),
      ))
    },
    onRefresh() {
      if ( Global.currentRoomScene.star >= this.price ) {
        Global.currentRoomScene.star -= this.price;
        this.price = this.price*2;
        this.generateList();
      }
    },
    generateList(){
      this.choiceList.node.removeAllChildren();

      var candidates = this.pool.filter(function(choice){
        if ( typeof choice == "function" )
          choice = choice();
        if ( choice.validate ) {
          return choice.validate()
        } else return true;
      },this)
      var choices = Common.sample(candidates, this.choiceNumber);
      choices.forEach(function(choice){
        if ( typeof choice == "function" )
          choice = choice();

        var choiceLayout = cc.instantiate(this.choicePrefab)
        choiceLayout.x = 0;
        choiceLayout.getComponent("choice").dialog = this;
        choiceLayout.getComponent("choice").choice = choice;
        this.choiceList.node.addChild(choiceLayout);
      },this)
    },
    // update (dt) {},
});
