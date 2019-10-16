module.exports = function DTLError(message, stack) {
    this.message = message;
    this.stack = stack;
}