const Notation = require("notation");

let obj = {
    foo:{
        bar:null
    }
};

var notation = new Notation(obj);
console.log(notation.get("qux"));