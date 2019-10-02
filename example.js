const { ClassCalculator } = require('./index');

const Chem = new ClassCalculator({
    name: "Chem",
    categories: [{
        name: 'Homework Assignments'
    }],
    grades: [{
        category: 'Homework Assignments',
        pointsEarned: 90,
        maxPoints: 100,
    }]
})

console.log(Chem.getCatGrade('Homework Assignments'));
