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
        totals:{
            exp: 0,
            inc: 0,
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
    }

    return {
        getinput: function () {
            return {
                type: document.querySelector(domStrings.inputType).value,
                description: document.querySelector(domStrings.inputDesc).value,
                value: document.querySelector(domStrings.inputValue).value
            };
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

        var input = uiController.getinput();
        console.log(input);

    }

    return {
        init: function () {
            console.log('Application has started..');
            setupEventListners();
        }
    }

})(budgetConroller, uiController);

controller.init();