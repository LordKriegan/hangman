function gameChar (let) {
    this.realChar = let;
    this.viewChar = (let === " ") ? " " : "_";
};

module.exports = gameChar;