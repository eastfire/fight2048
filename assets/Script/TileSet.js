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
var floor_n = {type:"floor", subtype:"normal"};
var portal_a = {type:"portal", subtype:"a"};
var portal_b = {type:"portal", subtype:"b"};
var pit_n = {type:"pit", subtype:"normal"};
var nail_n = {type:"nail", subtype:"normal"};

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


const TILES = {
  tiles6x3
}

export default TILES;
