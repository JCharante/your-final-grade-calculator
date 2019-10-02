class ClassCalculator {
    constructor(data) {
        this.categories = data.categories.map(c => Object.assign({}, c, { grades: data.grades.filter(a => a.category === c.name) }))
        this.grades = data.grades;
    }
    getCurrentGrade(){
        let total = 0;
        this.categories.forEach(element => {
            total += this.getCatGrade(element.name);
        });
        return total;
    }
    getCatGrade(cat){
        cat = this.categories.filter(c => c.name === cat)[0];
        
        if (cat.buildUp == true){
            if (cat.topWorthMore){
                cat = this.dropGrades(cat);
                let total = 0;
                let max =  0;
                for (let i = 0; i < cat.topWorthMore && i < cat.grades.length; i++){
                    if (cat.grades[i].pointsEarned){
                        let cur = cat.grades[i]
                        total += (cur.pointsEarned/cur.maxPoints)*cat.topWorthValue;
                        max += cat.topWorthMore;
                    }
                }
                for (let i = cat.topWorthMore; i < cat.grades.length; i++){
                    if (cat.grades[i].pointsEarned){
                        let cur = cat.grades[i]
                        total += (cur.pointsEarned/cur.maxPoints)*cat.botWorthValue;
                        max += cat.topWorthMore;
                    }
                }
                return max/total;
            }
            let total = 0;
            let max = 0;
            for (let i = 0; i < cat.grades.length; i++){
                if (cat.grades[i].pointsEarned){
                    let cur = cat.grades[i]
                    total += cur.pointsEarned;
                    max += cur.maxPoints;
                }
            }
            return total/max;
        }
        let currentGrade = cat.maxPoints;
        for (let i = 0; i < cat.grades.length; i++){
            if (cat.grades[i].pointsEarned){
                currentGrade -= cat.grades[i].maxPoints - cat.grades[i].pointsEarned;
                if (currentGrade < 0){
                    currentGrade = 0;
                }
            }
        }
        return currentGrade/cat.maxPoints;
    }
    
    getA() {
        return this.data.a;
    }
    dropGrades(cat){
        if (cat.droppedGrades){
            cat.grades.sort(function(a, b){
                if (!a.pointsEarned && !b.pointsEarned){
                    return 0;
                }
                else if (!a.pointsEarned){
                    return 1;
                }
                else if (!b.pointsEarned){
                    return -1;
                }
                if (a.maxPoints - a.pointsEarned > b.maxPoints - b.pointsEarned){
                    return -1;
                }
                else if(a.maxPoints - a.pointsEarned < b.maxPoints - b.pointsEarned){
                    return 1;
                }
                return 0;
            })
            cat.grades.splice(0,droppedGrades);
        }
        return cat;
    }
}



module.exports = {
    ClassCalculator
}
