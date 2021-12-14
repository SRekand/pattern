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
        getItem: function (){
            return data.items
        },
        logData: function (){
            return data
        }
    }
})();

// UI Controller
const UICtrl = (function () {
    return {
        populateItemList: function (items){
            // create html content
            let html = '';

            // parse data and create list items html
            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
                    <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                    <a href="#" class="secondary-content">
                        <i class="edit-item fa fa-pencil"></i>
                    </a>
                </li>`;
            });

            // insert list items
            document.querySelector("#item-list").innerHTML = html;
        }
    }
})();

// App controller
const App = (function(ItemCtrl, UICtrl){
    return {
     init: function (){
         console.log('Initializing App')
         // Fetch items from data structure
         const items = ItemCtrl.getItem()
         // populate items list
         UICtrl.populateItemList(items)
     }
    }
})(ItemCtrl, UICtrl);

// Initialize App
App.init()