var floor_n = {type:"floor", subtype:"normal1"}
var wall_n = {type:"wall", subtype:"n"};
var wall_s = {type:"wall", subtype:"s"};
var wall_e = {type:"wall", subtype:"e"};
var wall_w = {type:"wall", subtype:"w"};
var wall_ne = {type:"wall", subtype:"ne"};
var wall_se = {type:"wall", subtype:"se"};
var wall_nw = {type:"wall", subtype:"nw"};
var wall_sw = {type:"wall", subtype:"sw"};
var wall_nenw = {type:"wall", subtype:"nenw"};
var wall_sesw = {type:"wall", subtype:"sesw"};
var wall_nese = {type:"wall", subtype:"nese"};
var wall_nwsw = {type:"wall", subtype:"nwsw"};
var wall_nenwsesw = {type:"wall", subtype:"nenwsesw"};
var wall_nel = {type:"wall", subtype:"nelong"};
var wall_sel = {type:"wall", subtype:"selong"};
var wall_nwl = {type:"wall", subtype:"nwlong"};
var wall_swl = {type:"wall", subtype:"swlong"};
var wall_nsl = {type:"wall", subtype:"nslong"};
var wall_ewl = {type:"wall", subtype:"ewlong"};
var wall_newl = {type:"wall", subtype:"newlong"};
var wall_sewl = {type:"wall", subtype:"sewlong"};
var wall_nsel = {type:"wall", subtype:"nselong"};
var wall_nswl = {type:"wall", subtype:"nswlong"};
var wall_nlse = {type:"wall", subtype:"nlongse"};
var wall_nlsw = {type:"wall", subtype:"nlongsw"};
var wall_slne = {type:"wall", subtype:"slongne"};
var wall_slnw = {type:"wall", subtype:"slongnw"};
var wall_elsw = {type:"wall", subtype:"elongsw"};
var wall_elnw = {type:"wall", subtype:"elongnw"};
var wall_wlse = {type:"wall", subtype:"wlongse"};
var wall_wlne = {type:"wall", subtype:"wlongne"};
var wall_nlsesw = {type:"wall", subtype:"nlongsesw"};
var wall_slnenw = {type:"wall", subtype:"slongnenw"};
var wall_elnwsw = {type:"wall", subtype:"elongnwsw"};
var wall_wlnese = {type:"wall", subtype:"wlongnese"};
var wall_nelsw = {type:"wall", subtype:"nelongsw"};
var wall_nwlse = {type:"wall", subtype:"nwlongse"};
var wall_selnw = {type:"wall", subtype:"selongnw"};
var wall_swlne = {type:"wall", subtype:"swlongne"};
var wall_h = {type:"wall", subtype:"hole"};
var belt_n = {type:"belt", subtype:"n"};
var belt_s = {type:"belt", subtype:"s"};
var belt_e = {type:"belt", subtype:"e"};
var belt_w = {type:"belt", subtype:"w"};
var portal_a = {type:"portal", subtype:"a"};
var portal_b = {type:"portal", subtype:"b"};
var pit_n = {type:"pit", subtype:"normal"};
var nail_n = {type:"nail", subtype:"normal"};

var changeTiles = function(originTiles, changes){
  var tiles = [];
  var originWidth = originTiles.length;
  var originHeight = originTiles[0].length; //assuming originTiles is rectangle
  //shallow copy
  for ( var x=0; x < originWidth; x++ ) {
    for (var y = 0; y < originHeight; y++) {
      tiles[x] = tiles[x] || [];
      tiles[x][y] = originTiles[x][y]
    }
  }
  changes.forEach(function(tileEntry){
    tiles[tileEntry.position.x][tileEntry.position.y] = tileEntry;
  })
  return tiles;
}

var WALL_ROTATE90_MAP = {
    n:wall_e,
    e:wall_s,
    s:wall_w,
    w:wall_n,
    ne:wall_se,
    se:wall_sw,
    sw:wall_nw,
    nw:wall_ne,
    nenw:wall_nese,
    nese:wall_sesw,
    sesw:wall_nwsw,
    nwsw:wall_nenw,
    nelong:wall_sel,
    selong:wall_swl,
    swlong:wall_nwl,
    nwlong:wall_nel,
    newlong:wall_nsel,
    nselong:wall_sewl,
    sewlong:wall_nswl,
    nswlong:wall_newl,
    nlongse:wall_elsw,
    elongsw:wall_slnw,
    slongnw:wall_wlne,
    wlongne:wall_nlse,
    nlongsw:wall_elnw,
    elongnw:wall_slne,
    slongne:wall_wlne,
    wlongne:wall_nlsw,
    nlongsesw:wall_elnwsw,
    elongnwsw:wall_slnenw,
    slongnenw:wall_wlnese,
    wlongnese:wall_nlsesw,
    nelongsw:wall_selnw,
    selongnw:wall_swlne,
    swlongne:wall_nwlse,
    nwlongse:wall_nelsw
};
var BELT_ROTATE90_MAP = {
    n: belt_e,
    e: belt_s,
    s: belt_w,
    w: belt_n
}

var tiles6x3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_ne]
];
var tiles7x3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_ne]
];
var tiles4x4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles5x4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles6x4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles7x4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles4x5 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles5x5 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles6x5 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles7x5 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles4x6 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles5x6 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles6x6 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles7x6 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles3x7 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles4x7 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles5x7 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles6x7 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];
var tiles7x7 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Rhombus = [
    [null,null,wall_sw,wall_w,wall_w,wall_nw,null,null],
    [null,wall_sw,wall_swl,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_sel,floor_n,floor_n,wall_nel,wall_ne,null],
    [null,null,wall_se,wall_e,wall_e,wall_ne,null,null]
];

var tiles7x7Rhombus = [
    [null,null,null,wall_sw,wall_w,wall_nw,null,null,null],
    [null,null,wall_sw,wall_swl,floor_n,wall_nwl,wall_nw,null,null],
    [null,wall_sw,wall_swl,floor_n,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_sel,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [null,null,wall_se,wall_sel,floor_n,wall_nel,wall_ne,null,null],
    [null,null,null,wall_se,wall_e,wall_ne,null,null,null]
];

var tiles6x6Triangle = [
    [null,null,null,null,null,wall_sw,wall_w,wall_nw],
    [null,null,null,null,wall_sw,wall_swl,floor_n,wall_n],
    [null,null,null,wall_sw,wall_swl,floor_n,floor_n,wall_n],
    [null,null,wall_sw,wall_swl,floor_n,floor_n,floor_n,wall_n],
    [null,wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Triangle = [
    [null,null,null,null,null,null,wall_sw,wall_w,wall_nw],
    [null,null,null,null,null,wall_sw,wall_swl,floor_n,wall_n],
    [null,null,null,null,wall_sw,wall_swl,floor_n,floor_n,wall_n],
    [null,null,null,wall_sw,wall_swl,floor_n,floor_n,floor_n,wall_n],
    [null,null,wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_n],
    [null,wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x5Cross5x3 = [
    [null,wall_sw,wall_w,wall_w,wall_w,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles6x6Cross6x4 = [
    [null,wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles6x6Cross6x2 = [
    [null,null,wall_sw,wall_w,wall_w,wall_nw,null,null],
    [null,null,wall_s,floor_n,floor_n,wall_n,null,null],
    [wall_sw,wall_w,wall_swl,floor_n,floor_n,wall_nwl,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_sel,floor_n,floor_n,wall_nel,wall_e,wall_ne],
    [null,null,wall_s,floor_n,floor_n,wall_n,null,null],
    [null,null,wall_se,wall_e,wall_e,wall_ne,null,null]
];

var tiles7x7Cross7x5 = [
    [null,wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles7x7Cross7x3 = [
    [null,null,wall_sw,wall_w,wall_w,wall_w,wall_nw,null,null],
    [null,null,wall_s,floor_n,floor_n,floor_n,wall_n,null,null],
    [wall_sw,wall_w,wall_swl,floor_n,floor_n,floor_n,wall_nwl,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_sel,floor_n,floor_n,floor_n,wall_nel,wall_e,wall_ne],
    [null,null,wall_s,floor_n,floor_n,floor_n,wall_n,null,null],
    [null,null,wall_se,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles5x6ZigVertical = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_sesw,wall_sewl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_newl,wall_nenw],
    [wall_sesw,wall_sewl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles6x6UpArrow = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw,null,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles6x6UpArrow2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_nw,null,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [null,wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_n],
    [null,wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne,null,null]
]

var tiles6x6C = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_ne,wall_se,wall_e,wall_e,wall_ne]
];

var tiles7x7D = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_nwsw,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nswl,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_se,wall_sel,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [null,null,wall_se,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles6x5HRotate90 = [
    [wall_sw,wall_w,wall_w,wall_nwsw,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,wall_nswl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nsel,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_nese,wall_e,wall_e,wall_ne]
];

var tiles5x6H = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_sewl,floor_n,floor_n,floor_n,floor_n,wall_newl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x6H2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_sewl,floor_n,floor_n,wall_newl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x5H2Rotate90 = [
    [wall_sw,wall_w,wall_w,wall_nwsw,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,wall_nsl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nswl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nsel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nsl,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_nese,wall_e,wall_e,wall_ne]
];

var tiles6x6H = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6H2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_sel,floor_n,floor_n,wall_nel,wall_e,wall_ne],
    [wall_sw,wall_w,wall_swl,floor_n,floor_n,wall_nwl,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x5N = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_elsw,wall_sewl,floor_n,floor_n,wall_nel,wall_ne],
    [wall_sw,wall_swl,floor_n,floor_n,wall_newl,wall_wlne,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x6N = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_elsw,wall_sewl,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_sw,wall_swl,floor_n,floor_n,wall_nel,wall_ne,null],
    [wall_sw,wall_swl,floor_n,floor_n,wall_newl,wall_wlne,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x5Loop = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_newl,wall_ewl,wall_sewl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x5Loop2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_h,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x5Loop3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nel,wall_e,wall_sel,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,wall_s,floor_n,wall_n],
    [wall_s,floor_n,wall_nwl,wall_w,wall_swl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Loop = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Loop2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Loop3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nel,wall_e,wall_e,wall_sel,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,wall_s,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,wall_s,floor_n,wall_n],
    [wall_s,floor_n,wall_nwl,wall_w,wall_w,wall_swl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Loop = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Loop2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Loop3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nel,wall_e,wall_e,wall_e,wall_sel,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nwl,wall_w,wall_w,wall_w,wall_swl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Loop4 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_newl,wall_ewl,wall_elnwsw,wall_ewl,wall_sewl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_sewl,floor_n,wall_nsl,floor_n,wall_newl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_newl,wall_ewl,wall_wlnese,wall_ewl,wall_sewl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6Z = [
    [null,null,null,null,wall_sw,wall_w,wall_w,wall_nw],
    [null,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_sw,wall_w,wall_w,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_e,wall_e,wall_ne],
    [wall_s,floor_n,floor_n,wall_n,null,null,null,null],
    [wall_se,wall_e,wall_e,wall_ne,null,null,null,null]
];

var tiles6x6Whirl = [
    [null,null,null,wall_sw,wall_w,wall_w,wall_nw,null],
    [wall_sw,wall_w,wall_w,wall_swl,floor_n,floor_n,wall_n,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [null,wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [null,wall_s,floor_n,floor_n,wall_nel,wall_e,wall_e,wall_ne],
    [null,wall_se,wall_e,wall_e,wall_ne,null,null,null]
];

var tiles6x6Whirl2 = [
    [wall_sw,wall_w,wall_nw,null,wall_sw,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,wall_n,null],
    [null,wall_s,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_sel,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_ne,null,wall_se,wall_e,wall_ne]
];

var tiles6x6Mi = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_w,wall_nwsw,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_swlne,floor_n,floor_n,wall_nwlse,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_selnw,floor_n,floor_n,wall_nelsw,wall_ewl,wall_nenw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_se,wall_e,wall_nese,wall_e,wall_e,wall_nese,wall_e,wall_ne]
];

var tiles7x7Mi = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_w,wall_w,wall_nwsw,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_swlne,floor_n,floor_n,floor_n,wall_nwlse,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_selnw,floor_n,floor_n,floor_n,wall_nelsw,wall_ewl,wall_nenw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_se,wall_e,wall_nese,wall_e,wall_e,wall_e,wall_nese,wall_e,wall_ne]
];

var tiles6x5IO = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x5IOI = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x7A = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw,null,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw,null],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [null,wall_s,floor_n,wall_nel,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [null,wall_s,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne,null],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles6x5E = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nsel,floor_n,wall_nsel,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nlse,wall_e,wall_slne,floor_n,wall_n],
    [wall_s,floor_n,wall_n,null,wall_s,floor_n,wall_n],
    [wall_se,wall_e,wall_ne,null,wall_se,wall_e,wall_ne]
];

var tiles6x7F = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_nel,floor_n,floor_n,wall_nswl,floor_n,floor_n,wall_n],
    [null,null,wall_s,floor_n,floor_n,wall_nsl,floor_n,floor_n,wall_n],
    [null,null,wall_se,wall_e,wall_e,wall_nlsw,floor_n,floor_n,wall_n],
    [null,null,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [null,null,null,null,null,wall_se,wall_e,wall_e,wall_ne]
];

var tiles6x7J = [
    [null,null,null,null,null,wall_sw,wall_w,wall_w,wall_nw],
    [wall_sw,wall_w,wall_w,wall_nw,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [null,null,null,null,null,wall_se,wall_e,wall_e,wall_ne]
];

var tiles6x7J2 = [
    [wall_sw,wall_w,wall_w,wall_nw,null,wall_sw,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,wall_n,null,wall_s,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nwl,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [null,null,null,null,null,wall_se,floor_n,floor_n,wall_ne],
    [null,null,null,null,null,wall_se,wall_e,wall_e,wall_ne]
];

var tiles6x6L = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nwl,wall_e,wall_e,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,wall_n,null,null,null],
    [wall_s,floor_n,floor_n,floor_n,wall_n,null,null,null],
    [wall_se,wall_e,wall_e,wall_e,wall_ne,null,null]
];

var tiles6x6L2 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_e,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n,null,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,wall_n,null,null],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_ne,null]
];

var tiles6x6L3 = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_e,wall_e,wall_ne],
    [wall_s,floor_n,floor_n,wall_n,null,null,null,null],
    [wall_s,floor_n,floor_n,wall_n,null,null,null,null],
    [wall_s,floor_n,floor_n,wall_n,null,null,null,null],
    [wall_se,wall_e,wall_e,wall_ne,null,null,null]
];

var tiles7x7Snake = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_w,wall_w,wall_nwsw,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_nese,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7Snake2 = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nelsw,wall_ewl,wall_selnw,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nswl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nwlse,wall_ewl,wall_ewl,wall_ewl,wall_swlne,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x6T = [
    [null,null,null,null,wall_sw,wall_w,wall_w,wall_nw],
    [null,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [wall_sw,wall_w,wall_w,wall_w,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_sel,floor_n,floor_n,wall_n],
    [null,null,null,null,wall_s,floor_n,floor_n,wall_n],
    [null,null,null,null,wall_se,wall_e,wall_e,wall_ne]
];

var tiles7x5SplitAndPortal=[
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,portal_a,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,portal_a,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
]

var tiles7x6SplitAndPortal=[
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,portal_a,floor_n,floor_n,floor_n,floor_n,portal_b,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,portal_b,floor_n,floor_n,floor_n,floor_n,portal_a,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
]

var tiles7x7Split4AndPortal=[
    [wall_sw,wall_w,wall_w,wall_w,wall_nwsw,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,portal_a,floor_n,floor_n,wall_nsl,floor_n,floor_n,portal_b,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_sesw,wall_ewl,wall_ewl,wall_ewl,wall_nenwsesw,wall_ewl,wall_ewl,wall_ewl,wall_nenw],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nsl,floor_n,floor_n,floor_n,wall_n],
    [wall_s,portal_b,floor_n,floor_n,wall_nsl,floor_n,floor_n,portal_a,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_nese,wall_e,wall_e,wall_e,wall_ne]
]

var tiles7x6M = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_elsw,wall_sewl,floor_n,floor_n,wall_nel,wall_ne],
    [null,null,null,wall_s,floor_n,floor_n,wall_newl,wall_nenw,null],
    [wall_sw,wall_w,wall_wlse,wall_sewl,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles5x7Eight = changeTiles(tiles5x7,[
    {type:"wall",subtype:"hole",position:{x:3,y:2}},
    {type:"wall",subtype:"hole",position:{x:3,y:5}}
    ]);

var tiles5x7P = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_sel,floor_n,wall_h,floor_n,wall_n],
    [null,null,null,null,wall_s,floor_n,floor_n,floor_n,wall_n],
    [null,null,null,null,wall_s,floor_n,floor_n,floor_n,wall_n],
    [null,null,null,null,wall_se,wall_e,wall_e,wall_e,wall_ne]
];

var tiles6x7U = [
    [wall_sw,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_e,wall_e,wall_e,wall_e,wall_ne],
    [wall_s,floor_n,floor_n,wall_nwl,wall_w,wall_w,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_e,wall_ne]
];

var tiles7x7X = [
    [wall_sw,wall_w,wall_w,wall_nw,null,wall_sw,wall_w,wall_w,wall_nw],
    [wall_s,floor_n,floor_n,wall_nwl,wall_nwsw,wall_swl,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,wall_nswl,floor_n,floor_n,floor_n,wall_n],
    [wall_se,wall_sel,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [null,wall_sesw,wall_sewl,floor_n,floor_n,floor_n,wall_newl,wall_nenw,null],
    [wall_sw,wall_swl,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_s,floor_n,floor_n,floor_n,wall_nsel,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,wall_nel,wall_nese,wall_sel,floor_n,floor_n,wall_n],
    [wall_se,wall_e,wall_e,wall_ne,null,wall_se,wall_e,wall_e,wall_ne]
];


var tiles7x7Y = [
    [null,null,null,null,null,wall_sw,wall_w,wall_w,wall_nw],
    [null,null,null,null,wall_sw,wall_swl,floor_n,floor_n,wall_n],
    [wall_sw,wall_w,wall_w,wall_w,wall_swl,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nel,wall_ne],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_newl,wall_nenw,null],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,floor_n,wall_nwl,wall_nw],
    [wall_se,wall_e,wall_e,wall_e,wall_sel,floor_n,floor_n,floor_n,wall_n],
    [null,null,null,null,wall_se,wall_sel,floor_n,floor_n,wall_n],
    [null,null,null,null,null,wall_se,wall_e,wall_e,wall_ne]
];

var tiles5x5Wang = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_nwsw,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nswl,floor_n,wall_nswl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nsel,floor_n,wall_nsel,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_se,wall_e,wall_nese,wall_e,wall_nese,wall_e,wall_ne]
];

var tiles6x5Wang = [
    [wall_sw,wall_w,wall_nwsw,wall_w,wall_nwsw,wall_w,wall_nw],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_s,floor_n,wall_nswl,floor_n,wall_nswl,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,floor_n,floor_n,floor_n,floor_n,wall_n],
    [wall_s,floor_n,wall_nsel,floor_n,wall_nsel,floor_n,wall_n],
    [wall_s,floor_n,wall_nsl,floor_n,wall_nsl,floor_n,wall_n],
    [wall_se,wall_e,wall_nese,wall_e,wall_nese,wall_e,wall_ne]
];

const TILES = {
  tiles6x3,
  tiles7x3,
  tiles4x4,
  tiles5x4,
  tiles6x4,
  tiles7x4,
  tiles4x5,
  tiles5x5,
  tiles6x5,
  tiles7x5,
  tiles4x6,
  tiles5x6,
  tiles6x6,
  tiles7x6,
  tiles3x7,
  tiles4x7,
  tiles5x7,
  tiles6x7,
  tiles7x7,
  tiles6x6Rhombus,
  tiles7x7Rhombus,
  tiles6x6Triangle,
  tiles7x7Triangle,
  tiles5x5Cross5x3,
  tiles6x6Cross6x4,
  tiles6x6Cross6x2,
  tiles7x7Cross7x5,
  tiles7x7Cross7x3,
  tiles5x6ZigVertical,
  tiles6x6UpArrow,
  tiles6x6UpArrow2,
  tiles6x6C,
  tiles7x7D,
  tiles6x5HRotate90,
  tiles5x6H,
  tiles5x6H2,
  tiles6x5H2Rotate90,
  tiles6x6H,
  tiles6x6H2,
  tiles6x5N,
  tiles7x6N,
  tiles5x5Loop,
  tiles5x5Loop2,
  tiles5x5Loop3,
  tiles6x6Loop,
  tiles6x6Loop2,
  tiles6x6Loop3,
  tiles7x7Loop,
  tiles7x7Loop2,
  tiles7x7Loop3,
  tiles7x7Loop4,
  tiles6x6Z,
  tiles6x6Whirl,
  tiles6x6Whirl2,
  tiles6x6Mi,
  tiles7x7Mi,
  tiles6x5IO,
  tiles7x5IOI,
  tiles6x7A,
  tiles6x5E,
  tiles6x7F,
  tiles6x7J,
  tiles6x7J2,
  tiles6x6L,
  tiles6x6L2,
  tiles6x6L3,
  tiles7x7Snake,
  tiles7x7Snake2,
  tiles6x6T,
  tiles7x5SplitAndPortal,
  tiles7x6SplitAndPortal,
  tiles7x7Split4AndPortal,
  tiles7x6M,
  tiles5x7Eight,
  tiles5x7P,
  tiles6x7U,
  tiles7x7X,
  tiles7x7Y,
  tiles5x5Wang,
  tiles6x5Wang
}

module.exports = TILES;
