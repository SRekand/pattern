//Storage Controller
const StorageCtrl = (function (){
    // public methods
    return {
        storeItem: function (item){
            let items;
            // check if theres any items in localstorage
            if(localStorage.getItem("items") === null){
                items = [];
                // push new item into list
                items.push(item);
                // set ls
                localStorage.setItem("items", JSON.stringify(items));
            } else {
                // get what is in ls
                items = JSON.parse(localStorage.getItem("items"));
                // push new item
                items.push(item);
                // reset ls
                localStorage.setItem("items", JSON.stringify(items));
            }
        },
        getItemsFromStorage: function (){
            let items;
            if(localStorage.getItem("items") === null){
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem("items"));
            }
            return items;
        }
    }
})();

// Item Controller
const ItemCtrl = (function () {

    const Item = function (id, name, calories){
        this.id = id
        this.name = name
        this.calories = calories
    }
    const data = {
        items: [
            // {id: 0, name: "Steak Dinner", calories: 1200},
            // {id: 1, name: "Cookie", calories: 400},
            // {id: 2, name: "Eggs", calories: 300}
        ],
        total: 0
    }

    return {
        getItems: function () {
            return data.items
        },
        addItem: function (name, calories){
            let ID;
            // Create ID
            if(data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1
                console.log(ID)
            } else {
                ID = 0
            }
            // Calories to number
            calories = parseInt(calories)
            // Create new items
            newItem = new Item(ID, name, calories);
            // Add to items array
            data.items.push(newItem)
            // Return new item
            return newItem;
        },
        getTotalCalories: function (){
            let total = 0;
            // loop through items and add calories
            data.items.forEach(function (item){
                total = total + item.calories;
            });
            // set total calories in data structure
            data.total = total;
            // return total
            return data.total;
        },
        logData: function (){
            return data
        }
    }
})();

const UICtrl = (function () {
    // UI selectors
    const UISelectors = {
        itemList: "#item-list",
        itemNameInput: "#item-name",
        itemCaloriesInput: "#item-calories",
        addBtn: ".add-btn",
        totalCalories: ".total-calories"
    }
    return {
        populateItemList: function (items) {
            let html = "";

            items.forEach(function (item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}:</strong><em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>`;
            });
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getSelectors: function (){
            return UISelectors;
        },
        getItemInput: function (){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem: function (item){
            // li element
            const li = document.createElement("li");
            // class
            li.className = "collection-item";
            // ID
            li.id = `item ${item.id}`;
            // add HTMl
            li.innerHTML = `<strong>${item.name}: </strong>
                <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>`;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement("beforeend", li)
        },
        clearInput: function (){
            document.querySelector(UISelectors.itemNameInput).value = "";
            document.querySelector(UISelectors.itemCaloriesInput).value = "";
        },
        showTotalCalories: function (totalCalories){
            document.querySelector(UISelectors.totalCalories).textContent = totalCalories;
        }
    }
})();

// app controller
const App = (function (ItemCtrl, StorageCtrl, UICtrl){
    const loadEventListeners = function() {
        const UISelectors = UICtrl.getSelectors();
        // add item event
        document.querySelector(UISelectors.addBtn).addEventListener("click", itemAddSubmit);
        // add document reload event
        document.addEventListener("DOMContentLoaded", getItemsFromStorage)
    }
    // item add sumbit function
    const itemAddSubmit = function (event){
        const input = UICtrl.getItemInput()
        if(input.name !== "" && input.calories !== ""){
            const newItem = ItemCtrl.addItem(input.name, input.calories)
            UICtrl.addListItem(newItem)
            // get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            // add total calories to UI
            UICtrl.showTotalCalories(totalCalories);
            // store in localStorage
            StorageCtrl.storeItem(newItem);
            // clear fields
            UICtrl.clearInput();
        }
        event.preventDefault()
    }
    // get items from storage
    const getItemsFromStorage = function (){
        // get items from storage
        const items = StorageCtrl.getItemsFromStorage()
        // populate items list
        UICtrl.populateItemList(items)
    }
    return{
        init: function () {
            console.log("Initializing App")
            const items = ItemCtrl.getItems()
            UICtrl.populateItemList(items)
            loadEventListeners();
        }
    }
})(ItemCtrl, StorageCtrl, UICtrl);

App.init()