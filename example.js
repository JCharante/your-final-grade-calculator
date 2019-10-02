const { ClassCalculator } = require('./index');

const Chem = new ClassCalculator({
    name: "Chem",
    categories: [{
        name: 'Homework Assignments',
        weight: 100,
        buildUp: true,
        dropGrades: 1

    }],
    grades: [{
        category: 'Homework Assignments',
        pointsEarned: 10,
        maxPoints: 20,
    },
        {
            category: 'Homework Assignments',
            pointsEarned: 15,
            maxPoints: 20,
        },
        {
            category: 'Homework Assignments',
            pointsEarned: 13,
            maxPoints: 20,
        },
        {
            category: 'Homework Assignments',
            pointsEarned: 12,
            maxPoints: 20,
        },
        {
            category: 'Homework Assignments',
            maxPoints: 20,
            possibleExtraScore: 10
        }
    ]
})

console.log(Chem.getCatGrade('Homework Assignments'));
console.log(Chem.getHighestGrade('Homework Assignments'));
console.log(Chem.getLowestGrade('Homework Assignments'));
