const { ClassCalculator } = require('./index');

const Chem = new ClassCalculator({ a: "ahhh", name: "Chem" })

console.log(Chem.getA());
