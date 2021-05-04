"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChunkedText = (function () {
    function ChunkedText(text, maxChunkSize) {
        if (maxChunkSize === void 0) { maxChunkSize = 2000; }
        this.maxChunkSize = maxChunkSize;
        this.chunks = [];
        this._textLength = 0;
        this.pushText(text);
        this.resetToStart();
    }
    Object.defineProperty(ChunkedText.prototype, "currChar", {
        get: function () {
            return this.chunk[this.posInChunk];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChunkedText.prototype, "currPos", {
        get: function () {
            return this._currPos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ChunkedText.prototype, "textLength", {
        get: function () {
            return this._textLength;
        },
        enumerable: true,
        configurable: true
    });
    ChunkedText.prototype.resetToStart = function () {
        this.setChunk(0);
        this.posInChunk = -1;
        this._currPos = -1;
    };
    ChunkedText.prototype.resetToEnd = function () {
        this.setChunk(this.chunks.length - 1);
        this.posInChunk = this.chunkLength - 1;
        this._currPos = this._textLength;
    };
    ChunkedText.prototype.addText = function (text) {
        this.pushText(text);
        if (this._currPos === -1) {
            this.chunk = this.chunks[0];
            this.chunkLength = this.chunk.length;
        }
        else
            this.setPositionTo(this._currPos);
    };
    ChunkedText.prototype.getText = function () {
        return this.chunks.join('');
    };
    ChunkedText.prototype.moveToNextChar = function () {
        this.posInChunk++;
        this._currPos++;
        if (this.posInChunk < this.chunkLength)
            return true;
        if (this.setChunk(this.chunkIndex + 1)) {
            this.posInChunk = 0;
            return true;
        }
        else {
            this.posInChunk = this.chunkLength;
            this._currPos = this._textLength;
            return false;
        }
    };
    ChunkedText.prototype.moveToPrevChar = function () {
        this.posInChunk--;
        this._currPos--;
        if (this.posInChunk >= 0)
            return true;
        if (this.setChunk(this.chunkIndex - 1)) {
            this.posInChunk = this.chunkLength - 1;
            return true;
        }
        else {
            this.posInChunk = -1;
            this._currPos = -1;
            return false;
        }
    };
    ChunkedText.prototype.setPositionTo = function (position) {
        var restLength = position;
        this.chunkIndex = 0;
        for (var ind = 0; true; ind++) {
            if (this.setChunk(ind)) {
                if (restLength > this.chunkLength)
                    restLength -= this.chunk.length;
                else {
                    this.posInChunk = restLength;
                    this._currPos = position;
                    return;
                }
            }
            else {
                this.posInChunk = this.chunkLength;
                this._currPos = this._textLength;
                return;
            }
        }
    };
    ChunkedText.prototype.setChunk = function (index) {
        var prevChunkVal = this.chunk;
        this.chunk = this.chunks[index];
        if (!this.chunk) {
            this.chunk = prevChunkVal;
            return false;
        }
        this.chunkIndex = index;
        this.chunkLength = this.chunk.length;
        return true;
    };
    ChunkedText.prototype.pushText = function (text) {
        if (!text.length)
            return;
        var textPos = 0;
        while (textPos < text.length) {
            if (textPos === 0) {
                var lastChunk = this.chunks.pop();
                if (lastChunk) {
                    if (lastChunk.length < this.maxChunkSize) {
                        var restLen = this.maxChunkSize - lastChunk.length;
                        this.chunks.push(lastChunk + text.substr(textPos, restLen));
                        textPos += restLen;
                        continue;
                    }
                    else
                        this.chunks.push(lastChunk);
                }
            }
            this.chunks.push(text.substr(textPos, this.maxChunkSize));
            textPos += this.maxChunkSize;
        }
        this._textLength += text.length;
    };
    return ChunkedText;
}());
exports.ChunkedText = ChunkedText;
