// budget controller
var budgetConroller = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    calculateTotal = function (type) {
        var sum = 0;
        data.allItems[type].forEach(function (cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    }

    var data = {
        allItems: {
            exp: [],
            inc: [],
        },
        totals: {
            exp: 0,
            inc: 0,
        },

        budget: 0,
        percentage: -1,

    };

    return {
        addItem: function (type, des, val) {
            var newItem, ID;

            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }


            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            data.allItems[type].push(newItem);
            return newItem;
        },

        calculateBudget: function () {

            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');

            // calculate the budget = income = expenses
            data.budget = data.totals.inc - data.totals.exp;

            // calculate percentage of income that we spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }

        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalexp: data.totals.exp,
                percentage: data.percentage,
            }
        },

    }

})();


// ui controller
var uiController = (function () {

    var domStrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: 'budget__value',
        incomeLabel: 'budget__income--value',
        expenseLabel: 'budget__expenses--value',
        parcentageLabel: 'budget__expenses--percentage',
    }

    return {
        getinput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDesc).value,
                value: parseFloat(document.querySelector(domStrings.inputValue).value)
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml, element;
            // Create HTML String with placeholder text

            if (type === 'inc') {
                element = domStrings.incomeContainer;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn">X<i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = domStrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">X<i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace the placeholder text with some actual data

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert The html into the dom

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function () {
            var fields, fieldsArr;

            fields = document.querySelectorAll(domStrings.inputDesc + ', ' + domStrings.inputValue);

            fieldsArr = Array.prototype.slice.call(fields);

            fieldsArr.forEach(function (current, index, array) {
                current.value = "";
            });
            fieldsArr[0].focus();
        },

        displayBudget: function(obj){
            document.querySelector(domStrings.budgetLabel).textContent = obj.budget;
            document.querySelector(domStrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(domStrings.expenseLabel).textContent = obj.totalexp;
            document.querySelector(domStrings.parcentageLabel).textContent = obj.percentage;
        },

        getDOMstrings: function () {
            return domStrings;
        }
    }

}());


// global controller
var controller = (function (budgetCtrl, uiCtrl) {

    var setupEventListners = function () {

        var DOM = uiController.getDOMstrings();

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

        document.addEventListener('keypress', function (event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }


    var updateBudget = function () {

        // calculate the budget
        budgetConroller.calculateBudget();

        // return the budget
        var budget = budgetConroller.getBudget();

        // display the budget on ui
        uiController.displayBudget(budget);

    }


    var ctrlAddItem = function () {
        var input, newItem;

        // getting data from input field
        input = uiController.getinput();

        if (input.description !== "" && input.value !== NaN && input.value > 0) {

            // Adding item to budget controller
            newItem = budgetConroller.addItem(input.type, input.description, input.value);

            // add item to ui
            uiCtrl.addListItem(newItem, input.type);

            // clear fields 
            uiCtrl.clearFields();

            // calculate and update budget
            updateBudget();

        }
    }

    return {
        init: function () {
            console.log('Application has started...');
            setupEventListners();
        }
    }

})(budgetConroller, uiController);

controller.init();