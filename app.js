// Storage Controller
// Create later

// Item Controller
const ItemCtrl = (function (){
    // Item Constructor
    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }

    // Data structure
    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookie', calories: 400},
            {id: 2, name: 'Eggs', calories: 300}
        ],
        total: 0
    }

    return{
        logData: function (){
            return data
        }
    }
})();

// UI Controller
const UICtrl = (function () {
    console.log('UICtrl')
})();

// App controller
const App = (function(ItemCtrl, UICtrl){
    return {
     init: function (){
         console.log('Initializing App')
     }
    }
})(ItemCtrl, UICtrl);

// Initialize App
App.init()