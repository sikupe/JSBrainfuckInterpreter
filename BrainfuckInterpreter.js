Array.prototype.peek = function() {
    return this[this.length - 1];
};

const initialBandLength = 50;

class BrainfuckInterpreter {

    constructor(input) {
        this.input = input;
        this.stdin = "";
        this.band = this.emptyArray();
        this.sourcecodeCursor = 0;
        this.bandCursor = 0;
        this.whileStack = [];
    }

    execute() {
        let char = this.nextChar();
        while(char != '\0') {
            if(this.whileStack.peek() != -1) {
                switch(char){
                    case '>':
                        this.incrementCursor();
                        break;
                    case '<':
                        this.decrementCursor();
                        break;
                    case '+':
                        this.band[this.bandCursor]++;
                        break;
                    case '-':
                        this.band[this.bandCursor]--;
                        break;
                    case '.':
                        this.printCurrent();
                        break;
                    case ',':
                        this.readInput();
                        break;

                }
            }
            switch(char) {
                case '[':
                    this.beginWhile();
                    break;
                case ']':
                    this.endWhile();
                    break;
            }
            char = this.nextChar();  
        }
    }

    beginWhile() {
        if(this.whileStack.peek() < 0 || this.band[this.bandCursor] == 0) {
            this.whileStack.push(-1);
        } else {
            this.whileStack.push(this.sourcecodeCursor - 1);
        }
    }

    endWhile() {
        let cursor = this.whileStack.pop();
        if(cursor != -1) {
            this.sourcecodeCursor = cursor;
        }
    }

    printCurrent() {
        let chr = String.fromCharCode(this.band[this.bandCursor]);
        console.log(chr);
    }

    readInput() {
        // TODO
    }

    incrementCursor() {
        this.bandCursor++;
        if(this.bandCursor >= this.band.length) {
            this.band = this.band.concat(emptyArray);
        }
    }

    decrementCursor() {
        this.bandCursor--;
        if(this.bandCursor < 0) {
            this.band = emptyArray().concat(this.band);
            this.bandCursor += initialBandLength;
        }
    }

    emptyArray() {
        return new Array(initialBandLength).fill(0);
    }

    nextChar() {
        if(this.sourcecodeCursor >= this.input.length) {
            return '\0';
        }
        let char = this.input[this.sourcecodeCursor];
        this.sourcecodeCursor++;
        return char;
    }
}
