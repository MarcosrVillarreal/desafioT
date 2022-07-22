const bit = require("./bit");

const format = [
  { tag: "PTemp", type: "int", len: 12 },
  { tag: "BattVolt.value", type: "int", len: 12 },
  { tag: "WaterLevel", type: "int", len: 8 },
  { tag: "float", type: "float"}
]; 

const formatDecode =  [
  { tag: "v0", type: "int", len: 8 },
  { tag: "v1", type: "int", len: 8 },
  { tag: "v2", type: "int", len: 8 },
];

var object = { "PTemp": -41, "BattVolt.value": 224, "WaterLevel": 115, "float": 4.14 }; 

var encode = bit.getEncode(object, format);

var decode = bit.getDecode(encode.buffer, format);

console.log(encode.size, encode.buffer);
console.log(decode);