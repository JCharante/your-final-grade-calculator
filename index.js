class ClassCalculator {
    constructor(data) {
        this.categories = data.categories.map(c => Object.assign({}, c, { grades: data.grades.filter(a => a.category === c.name) }))
        this.grades = data.grades;
    }

    getCurrentGrade(){
        let total = 0;
        this.categories.forEach(element => {
            total += getCatGrade(element);
        });
        return total;
    }

    /**
     *
     * @param cat A string with the name of the Category
     */
    getCatGrade(cat){
        cat = this.categories.filter(c => c.name === cat)[0];
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
        if (cat.buildUp == true){
            
        }
    }


    getHighestGrade(){
        let total = 0;
        this.categories.forEach(element => {
            total += getCatHighest(element);
        });
        return total;
    }
    /**
     * Return the potential highest score for a category
     * @param cat A string with the name of the Category
     */
    getCatHighest(cat){
        cat = this.categories.filter(c => c.name === cat)[0];
        let lostPoints = 0;
        let totalPoints = 0;
        let extraPoints = 0;
        cat.grades.forEach(element => {
            if(element.maxPoints){
                totalPoints += element.pointsEarned;
            }
            if(element.possibleExtraCredit){
                extraPoints += element.possibleExtraCredit;
            }
            if(element.maxPoints && element.pointsEarned) {
                lostPoints += element.maxPoints - element.pointsEarned;
            }
        });
        return cat.weight*(1-(lostPoints+extraPoints)/totalPoints);
    }

    getLowestGrade(){
        let total = 0;
        this.categories.forEach(element => {
            total += getCatLowest(element);
        });
        return total;
    }
    /**
     * Return the potential lowest score for a category
     * @param cat A string with the name of the Category
     */
    getCatLowest(cat){
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
    }
    
    getA() {
        return this.data.a;
    }
}

module.exports = {
    ClassCalculator
}
