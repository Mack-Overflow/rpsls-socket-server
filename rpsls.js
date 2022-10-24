const { response } = require("express");

/**
 * RPSLS
 * One command byte, where some commands have one or more data bytes
 */
module.exports = {
    commandTypeBits: {
        move: '000',
        text: '001',
        voice: '010',
        emoticon: '011',
        id: '100',
        name: '101',
        verdict: '110',
        extended: '111',
    },
    moveBits: {
        spock: '0000',
        rock: '0001',
        paper: '0010',
        scissors: '0100',
        lizard: '1000'
    },
    /**
     * Key necessary funcitonality and hook for RPSLS gameplay
     * @param inputBits: Bits provided to process next
     * @param playerId: Id of the player, set once ID bytes have been processed
     */
    processInput: function(inputBits, playerId=null) {
        // console.log(inputBits);
        let moreCommands = this.moreBitSet(inputBits.slice(0,8));
        let command = this.determineCommandBits(inputBits.slice(1,4));
        console.log(command);
        return this["process_"+command](inputBits.slice(4), playerId);
        // return command;
        // console.log(moreCommands);
        // let commandBuffer = new ArrayBuffer(3);
        // let view = new DataView(commandBuffer);
        // view.setUint
    },
    
    determineCommandBits: function(commandType) {
        return Object.keys(this.commandTypeBits).find(key => this.commandTypeBits[key] === commandType);
    },
    determineMoveBits: function(move) {
        let key = Object.keys(this.moveBits).find(key => this.moveBits[key] === move);
        // console.log(key);
        return key;
    },
    followingCommands: function (in_byte) {
        return Boolean(in_byte & 0b10000000);
    },
    getFirstFive: function(w) {
        return w & 0b00011111;
    },
    handleLogin: function() {

    },
    isolateBits: function() {
        let x = 0b00000100;
        console.log(x.toString(2).padStart(8, '0'));
    },
    
    isThirdSet: function(w) {
        return Boolean(w & 0b0000100);
    },
    
    moreBitSet: function(firstByte) {
        return Boolean(firstByte & 0b10000000);
    },
    binString2Dec: function(binaryString) {
        return parseInt(binaryString,2);
    },

    process_id: function(remaining_bits) {
        console.log("processing Id bytes: "+remaining_bits);
        let id12Bits = remaining_bits.slice(0,12);
        console.log("12 Id bits: "+id12Bits);
        // console.log("Id as int: "+this.binString2Dec(id12Bits))
        let playerId = this.binString2Dec(id12Bits);
        // console.log(remaining_bits.slice(12));
        this.processInput(remaining_bits.slice(12), playerId);
    },
    process_move: function(remaining_bits, playerId) {
        let move = this.determineMoveBits(remaining_bits);
        let response = {move: move, playerId: playerId};
        console.log(playerId)
        console.log("response: "+JSON.stringify(response));
        return response;
        // console.log("processing move: "+this.determineMoveBits(remaining_bits));
    },
    process_name: function(remaining_bits) {

    },
    process_text: function(remaining_bits) {

    },
    process_emoticon: function(remaining_bits) {

    },
    process_extended: function(remaining_bits) {

    },
    process_voice: function(remaining_bits) {

    }
}