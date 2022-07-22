# Desafio

## Install

**npm**:  
`npm i install`

## Usage

```javascript
const bit = require("./bit");

//Encode, object json y format (ver ejemplo)
bit.getEncode(object, format);

//Decode, buffer (bitString) y format (ver ejemplo)
bit.getDecode(buffer, format);
```

## Examples

### Format:

```javascript
const format = [
  { tag: "PTemp", type: "int", len: 12 },
  { tag: "BattVolt.value", type: "int", len: 12 },
  { tag: "WaterLevel", type: "int", len: 8 },
  { tag: "float", type: "float"}
]; 

var object = { 
  "PTemp": -41, 
  "BattVolt.value": 224, 
  "WaterLevel": 115, 
  "float": 4.14 
}; 
```     
