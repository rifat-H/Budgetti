// budget controller
var budgetConroller = (function () {

    // some code

})();


// ui controller
var uiController = (function () {

    // some code

}());

// global controller
var controller = (function (budgetCtrl, uiCtrl) {

    var ctrlAddItem = function () {
        console.log('it works');
        
    }

    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    document.addEventListener('keypress', function (event) {
        if (event.keyCode === 13 || event.which === 13) {

            ctrlAddItem();

        }
    });

})(budgetConroller, uiController);