const moment = require("moment");
const fs = require("fs");
const { Writable, Readable, Transform } = require('stream');
const process = require('process');
let fileWrite = fs.createFileWrite
// console.log(fileWrite);



class MyReadable extends Readable {
    constructor () {
        super()
    }
    _read() {
        setTimeout(() => this.push(moment().format('LLLL')),1000)
        // this.push(null)
    }
}

class MyTransfor extends Transform {
    _transform(buufer, _, done) {
        let time = moment().format(buufer.toString());
        let rightFormat
        this.push(time)
    }


}

class MyWritable extends Writable {
    constructor(){
        super()
        this.file = fs.openSync("./time.txt", "w+")
    }
    _write(chunk, enc, done) {
        fs.write(this.file, chunk.toString() + '\n', () => {
            done()
        })
    }
}

let timeTransform  = new MyTransfor()
let writableStream = new MyWritable();
let readebleStream = new MyReadable();
let str = {a:'asdasdf'}
 readebleStream.pipe(writableStream);
// console.log(moment)