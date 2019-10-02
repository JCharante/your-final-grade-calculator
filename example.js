const { ClassCalculator } = require('./index');

const Chem = new ClassCalculator({
    name: "Chem",
    categories: [{
        name: 'Homework Assignments',
        weight: 50,
        buildUp: true,
        droppedGrades: 1
        //maxPoints: 100
    },
        {
            name: 'Exam',
            weight: 50,
            buildUp: true,
            maxPoints: 100
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
            possibleExtraScore: 10
        },
        {
            category: 'Homework Assignments',
            maxPoints: 20,
            possibleExtraScore: 0
        },
        {
            category: 'Exam',
            pointsEarned: 70,
            maxPoints: 100,
            possibleExtraScore: 0
        },
        {
            category: 'Exam',
            pointsEarned: 80,
            maxPoints: 100,
            possibleExtraScore: 0
        }
    ]
})

console.log(Chem.getCurrentGrade('Homework Assignments'));
console.log(Chem.getHighestGrade('Homework Assignments'));
console.log(Chem.getLowestGrade('Homework Assignments'));
