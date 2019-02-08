// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html
import TILES from "TileSet";
import Tile from "tile";

cc.Class({
    extends: cc.Component,

    properties: {

      tilePrefabs:[cc.Prefab],
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
      this.initTileMap()
      this.initTiles()
    },

    start () {

    },
    initTileMap() {
      this.tileMap = {};
      for ( var i = 0; i < this.tilePrefabs.length; i++ ) {
        this.tileMap[this.tilePrefabs[i].name] = this.tilePrefabs[i]
      }
    },
    initTiles() {
      var initTiles = TILES.tiles6x3;
      var tileWidth = 120;
      if ( !initTiles ) return;
      this.tiles = [];
      this.width = initTiles.length;
      this.height = 0;
      for ( var i = 0; i < this.width; i++){
          if ( !this.tiles[i] ) this.tiles.push([]);
      }

      for ( var x = 0; x < this.width; x++){
          if ( !initTiles[x] ) continue;
          var height = initTiles[x].length;
          if ( this.height < height) this.height = height
          for ( var y = 0; y <height; y++){
              var tileEntry = initTiles[x][y];
              if ( !tileEntry ) continue;
              var tile;
              if ( this.tileMap[tileEntry.type] ) {
                tile = cc.instantiate(this.tileMap[tileEntry.type]);
                tile.getComponent(Tile).setType(tileEntry.type, tileEntry.subtype)
              }
              if ( tile ) {
                this.node.addChild(tile);
                tile.getComponent(Tile).x = x;
                tile.getComponent(Tile).y = y;
                tile.setPosition(x*tile.width-(this.width-1)*tileWidth/2, y*tile.height-(this.height-1)*tileWidth/2);
              }
              this.tiles[x][y]=tile;
          }
      }
      var maxSize = Math.max(this.width, this.height)

      var padding = 20;

      var scaleRate = (cc.winSize.width - padding*2)/((maxSize-2)*tileWidth);
      this.node.scaleX = scaleRate;
      this.node.scaleY = scaleRate;
    }
    // update (dt) {},
});
