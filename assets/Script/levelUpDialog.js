import Global from "global";
import Common from "common";

cc.Class({
    extends: cc.Component,

    properties: {
      okButton: {
        type: cc.Button,
        default: null,
      },
      refreshButton: {
        type: cc.Button,
        default: null,
      },
      choiceList: {
        type: cc.Layout,
        default: null
      },
      title:{
        type: cc.Label,
        default: null
      },
      choicePrefab: {
        type: cc.Prefab,
        default: null
      },
      priceLabel: {
        type: cc.Label,
        default: null
      },
      price: {
        default: 1,
        notify(oldValue){
          if ( oldValue == this.price ) return;
          this.priceLabel.string = "-"+this.price;
        }
      }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
      this.title.string = "恭喜你升到第"+Global.currentRoom.hero.getComponent("hero").level+"级";
      this.priceLabel.string = "-"+this.price;
      this.currentChoice = null;
    },
    initChoicePool(pool, choiceNumber, callback, context) {
      this.choiceLayouts = [];
      this.currentChoice = null;
      this.callback = callback;
      this.context = context;
      this.choiceNumber = choiceNumber;
      this.pool = pool;

      this.generateList();
    },
    onOk() {
      if ( !this.currentChoice ) return;
      this.currentChoice.onChosen();
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
        this.price = this.price+1;
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
        this.choiceList.node.addChild(choiceLayout);

        cc.loader.loadRes(choice.icon, cc.SpriteFrame, function (err, spriteFrame) {
          cc.find("choiceIcon", choiceLayout).getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        cc.find("choiceName", choiceLayout).getComponent(cc.Label).string = choice.name;
        cc.find("choiceDesc", choiceLayout).getComponent(cc.Label).string = choice.desc;

        choiceLayout.choice = choice;
        choiceLayout.on('touchend', ( event ) => {
          this.currentChoice = choiceLayout.choice;
          choiceLayout.runAction(cc.scaleTo(Global.CHOICE_SELECT_TIME, 1.1))
          this.choiceLayouts.forEach(function(layout){
            if ( layout != choiceLayout ) {
              layout.runAction(cc.scaleTo(Global.CHOICE_SELECT_TIME,1))
            }
          },this)
        })
        this.choiceLayouts.push(choiceLayout)
      },this)
    },
    // update (dt) {},
});
