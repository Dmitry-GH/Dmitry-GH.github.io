(function(){
  'use strict';

angular
  .module('mainApp',['ngStorage'])
  .directive('items', ItemsDir);

function ItemsDir() {
    return {
        controller: ItemsController,
        controllerAs: 'itemsCtrl'
    };
}

ItemsController.$inject = ["$localStorage"];

function ItemsController($localStorage) {
  var vm = this;

  vm.currentItem = {};
  vm.userComment = {};
  vm.commentsNum = 0;
  vm.objRemoved = {};
  vm.items = [];
  
  vm.Save = function (saveLocal) {              // set data from LocalStorage
    $localStorage.LocalItems = saveLocal;
  };

  vm.Get = function () {                      // get data from LocalStorage
    if ($localStorage.LocalItems) {
      vm.items = $localStorage.LocalItems;
    }
  };

  vm.Get();   


  vm.addItem = function(){

    if (vm.currentItem.name) {    //check if input has data
      
      var isEqual = 0;

      for (var i = 0; i < vm.items.length; i++) {
        if (vm.currentItem.name === vm.items[i].name) {  //check if items already has the same name
          isEqual++;
        }
      }

      if (isEqual > 0) {
        alert("This name is already exist.");
      } else{
        vm.items.push({name: vm.currentItem.name, lable: 0, class: '', comments: [] });
      }

    } else alert("Please, type item name.");


    vm.currentItem.name = '';
    vm.Save(vm.items);
  };

  vm.deleteItem = function(itemName){                      //delete item
    vm.objRemoved = vm.items.filter(function(el) {
      return el.name !== itemName;
    });
    vm.items = vm.objRemoved;

    vm.Save(vm.items);
  };

  vm.isActive = function(itemClass, item){        //change className for item onClick

    for (var i = 0; i < vm.items.length; i++) {
      vm.items[i].class = '';
    }
    if (itemClass === '') {
      item.class = 'active';
      vm.commentsNum = vm.items.indexOf(item) + 1;
    } else item.class = '';

    vm.Save(vm.items);
  };

  vm.sendComment = function() {                 // send comment 
    for (var i = 0; i < vm.items.length; i++) {
      if (vm.items[i].class === 'active') {
        vm.items[i].comments.push({ text: vm.userComment.text });
        vm.items[i].lable = vm.items[i].comments.length;
      }
    }

    vm.userComment.text = '';
    vm.Save(vm.items);
  };
}

})();
