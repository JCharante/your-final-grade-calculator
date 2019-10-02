class ClassCalculator {
    constructor(data) {
        this.categories = data.categories.map(c => Object.assign({}, c, { grades: data.grades.filter(a => a.category === c.name) }));
        this.grades = data.grades;
    }

    getCurrentGrade(){
        let total = 0;
        this.categories.forEach(element => {
            let cur = this.getCatGrade(element.name);
            if (element.maxPercent && cur > element.maxPercent){
                cur = element.maxPercent;
            }
            total += cur*element.weight;
        });
        return total;
    }

    /**
     *
     * @param cat A string with the name of the Category
     */
    getCatGrade(cat){
        cat = this.categories.filter(c => c.name === cat)[0];
        cat = this.dropGrades(cat);
        if (cat.buildUp == true){
            if (cat.topWorthMore){

                let total = 0;
                let max =  0;
                for (let i = 0; i < cat.topWorthMore && i < cat.grades.length; i++){
                    if (cat.grades[i].pointsEarned){
                        let cur = cat.grades[i];
                        total += (cur.pointsEarned/cur.maxPoints)*cat.topWorthValue;
                        max += cat.topWorthMore;
                    }
                }
                for (let i = cat.topWorthMore; i < cat.grades.length; i++){
                    if (cat.grades[i].pointsEarned){
                        let cur = cat.grades[i];
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
                    let cur = cat.grades[i];
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

    getHighestGrade(){
        let total = 0;
        this.categories.forEach(element => {
            total += this.getCatHighest(element.name);
        });
        return total;
    }
    /**
     * Return the potential highest score for a category
     * @param cat A string with the name of the Category
     */
    getCatHighest(cat){
        cat = this.dropGrades(cat);
        cat = this.categories.filter(c => c.name === cat)[0];
        let lostPoints = 0;
        let totalPoints = 0;
        let extraPoints = 0;
        cat.grades.forEach(element => {
            if(element.maxPoints){
                totalPoints += element.maxPoints;
            }
            if(element.possibleExtraScore){
                extraPoints += element.possibleExtraScore;
            }
            if(element.maxPoints && element.pointsEarned) {
                lostPoints += (element.maxPoints - element.pointsEarned);
            }
        });

        return cat.weight*(1-(lostPoints-extraPoints)/totalPoints);
        //return totalPoints;
    }

    getLowestGrade(){
        let total = 0;
        this.categories.forEach(element => {
            total += this.getCatLowest(element.name);
        });
        return total;
    }
    /**
     * Return the potential lowest score for a category
     * @param cat A string with the name of the Category
     */
    getCatLowest(cat){
        cat = this.dropGrades(cat);
        cat = this.categories.filter(c => c.name === cat)[0];
        let earnedPoints = 0;
        let totalPoints = 0;
        cat.grades.forEach(element => {
            if(element.maxPoints){
                totalPoints += element.maxPoints;
            }
            if(element.maxPoints && element.pointsEarned) {
                earnedPoints += element.pointsEarned;
            }
        });
        return cat.weight*earnedPoints/totalPoints;
        //return earnedPoints;
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
            cat.grades.splice(0,cat.droppedGrades);
        }
        return cat;
    }

    getA() {
        return this.data.a;
    }
}



module.exports = {
    ClassCalculator
}
