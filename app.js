// budget controller
var budgetConroller = (function () {

    // some code

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
        getinput: function(){
            return {
                 type : document.querySelector(domStrings.inputType).value,
                 description : document.querySelector(domStrings.inputDesc).value,
                 value : document.querySelector(domStrings.inputValue).value
            };
        },

        getDOMstrings: function(){
            return domStrings;
        }
    }

}());


// global controller
var controller = (function (budgetCtrl, uiCtrl) {

    var DOM = uiController.getDOMstrings

    var ctrlAddItem = function () {
        
        var input = uiController.getinput();
        console.log(input);
        
    }

    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {

            ctrlAddItem();

        }
    });

})(budgetConroller, uiController);