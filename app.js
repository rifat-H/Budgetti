// budget controller
var budgetConroller = (function () {

    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
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
        }
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

        // return the budget

        // display the budget on ui
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