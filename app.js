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
    }

    return {
        getinput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDesc).value,
                value: document.querySelector(domStrings.inputValue).value
            };
        },

        addListItem: function (obj, type) {
            var html, newHtml;
            // Create HTML String with placeholder text

            if(type === 'inc'){
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn">DEL<i class="ion-ios-close-outline"></i></button></div></div></div>';
            }else if(type === 'exp'){
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">DEL<i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            // replace the placeholder text with some actual data

            newHtml = html.replace('%id%', obj.id);

            // Insert The html into the dom
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



    var ctrlAddItem = function () {
        var input, newItem;

        // getting data from input field
        input = uiController.getinput();

        // Adding item to budget controller
        newItem = budgetConroller.addItem(input.type, input.description, input.value);

        // add item to ui

    }

    return {
        init: function () {
            console.log('Application has started..');
            setupEventListners();
        }
    }

})(budgetConroller, uiController);

controller.init();