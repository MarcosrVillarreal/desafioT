const doubleConversion = require('double-conversion-decimal-binary');
const itb = require("int-to-binary");

/**
 * Funcion encode
 * @param {*} req 
 * @param {*} res 
 */
const getEncode = (object, format) => {
  try {
    let buffer = "";

    /**
     * Recorremos el formato item por item
     */
    for (itemFormat of format) {

      /**
       * Si existe el objeto dentro del format lo formateo
       */
      if (object[itemFormat.tag]) {

        /**
         * Formateo de acuerdo al tipo
         */
        switch (itemFormat.type) {
          case "int":
            buffer += itb.signed(object[itemFormat.tag], itemFormat.len);
            break;
          case "uint":
            buffer += doubleConversion.uint32(object[itemFormat.tag]).toStringBinary().substr(-itemFormat.len);
            break;
          case "float":
            buffer += doubleConversion.float32(object[itemFormat.tag]).toStringBinary();
            break;
          case "ascii":
            break;
          default:
            break;
        }
      }
    }

    let size = buffer.length;

    return { size, buffer }
  } catch (error) {
    console.log(error);
  }
}

/**
 * Funcion Decode
 * @param {*} buffer 
 * @param {*} format 
 * @returns 
 */
const getDecode = (buffer, format) => {
  try {
    /**
     * si es binaria la trama, la dejo como viene sino hago la conversion
     */
    let tramaCompleta = (ifBinary(buffer))? buffer : doubleConversion.uint32(buffer).toStringBinary();
    let largoTrama = (ifBinary(buffer))? tramaCompleta : format.reduce((sum, value) => (typeof value.len == "number" ? sum + value.len : sum), 0);
    let trama = tramaCompleta.substr(-largoTrama);
    let len = 0;
    let obj = new Object();

    /**
     * Recorremos el formato item por item
     */
     for (itemFormat of format) {
      /**
       * Formateo de acuerdo al tipo
       */
      switch (itemFormat.type) {
        case "int":
          obj[itemFormat.tag] = ([trama.substr(len,itemFormat.len)].map(getSigned))[0];
          len += itemFormat.len;
          break;
        case "uint":
          obj[itemFormat.tag] = doubleConversion.StringBinary(trama.substr(len,itemFormat.len)).toUint32();
          len += itemFormat.len;
          break;
        case "float":
          obj[itemFormat.tag] = doubleConversion.StringBinary(trama.substr(len,32)).toFloat32();
          // Se agregan los 32 bits del float
          len += 32;
          break;
        case "ascii":
          len += itemFormat.len;
          break;
        default:
          break;        
      }
    }

    return JSON.stringify(obj);
  } catch (error) {
    console.log(error);
  }
}

/**
 * chequar si es binario
 */
const ifBinary = (string) => {
    let isBinary = false;
    for (let i = 0; i < string.length; i++) {
      if (string[i] == "0" || string[i] == "1") {
        isBinary = true;
      } else {
        isBinary = false;
      }
    }
    return isBinary;
}

/**
 * Obtener el int del binary signed
 */
const getSigned = binStr => parseInt(binStr.length >= 8 && binStr[0] === "1" ?
                  binStr.padStart(32, "1") : binStr.padStart(32, "0"), 2) >> 0;

module.exports = { getEncode, getDecode };