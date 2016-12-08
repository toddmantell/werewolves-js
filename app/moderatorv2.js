(function () {
    'use strict';
    
    document.getElementById('generate').addEventListener('click', generateForm);

    //Villagers
    generateListener('sheriff');
    generateListener('cupid');
    generateListener('witch');
    generateListener('collector');
    generateListener('defender');
    generateListener('vigilante');

    //Werewolves
    generateListener('werewolf');//also need to implement logic
    generateListener('whitewolf');
    generateListener('bigbadwolf');
    generateListener('wolffather');
    generateListener('wildchild');
    generateListener('wolfhound');

    //Outsiders
    generateListener('angel');
    generateListener('dracula');
    generateListener('gypsy');
    
    //extending Array.prototype to include a method to move elements to different places in the array
    Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
    }; 
    
    
    //if a box is checked, check it against the characters and then add it to the appropriate nights? 
    var allCharacters = ['angel', 'bigbadwolf', 'collector', 'cupid', 'defender', 'dracula', 'gypsy', 'psychicsisters', 'vigilante', 'witch', 'werewolf', 'whitewolf', 'wolffather', 'wildchild', 'wolfhound'];

    function traversecharactersArray(charactersArray, night) {
        for (var i = 0; i < charactersArray.length; i += 1) {            
            
            /*switch (charactersArray[i].elementObject.newListItem){
                case 'defenderitem':
                    secondNight[0] = elementObject;
                    break;
                case 'cupiditem': 
                case 'angelitem': //break this out into another function that handles this logic?
                    night[i] = elementObject;
                    (!firstNight[0]) ?
                    firstNight.push(elementObject) : firstNight[0] = elementObject;
                    break;
                case 'werewolfitem': 
                case 'bigbadwolfitem': 
                case 'witchitem': 
                case 'draculaitem':
                case 'gypsyitem':
                case 'psychicsistersitem':
                    firstNight.push(elementObject);
                    secondNight.push(elementObject);
                    thirdNight.push(elementObject);
                    fourthNight.push(elementObject);
                    break;
                case 'whitewolfitem':
                    secondNight.push(elementObject);
                    fourthNight.push(elementObject);
                    break;
                case 'vigilanteitem':
                    secondNight.push(elementObject);
                    thirdNight.push(elementObject);
                    fourthNight.push(elementObject);
                    break;
            }
            
        }
    }

    var charactersArray = [], firstNight = [], secondNight = [], thirdNight = [], fourthNight = [];

    //Gets the element and attaches the event listener to it
    function generateListener(elementName) {
        var inputCheckbox = document.getElementById(elementName + '-checkbox');
        inputCheckbox.addEventListener('click', function () {toggleCheckbox({element: inputCheckbox, newListItem: elementName + 'item', textToDisplay: elementName})});
    }

    //Object parameter pattern: pass in an object that has the properties we need, also prevents passing in bad data
    function toggleCheckbox(elementObject) {

        var checkedValue = elementObject.element.checked;
        
        if (!checkedValue) {                        
            removeItemFromNight(elementObject.newListItem);            
        }
        else{
            if (!charactersArray.includes(elementObject)){
                charactersArray.push(elementObject);
                addToNight(elementObject);
            }
        }
    }
    
    function removeItemFromNight(elementToRemove) {            
            elementToRemove.parentNode.removeChild(elementToRemove);
    }
    
    //adds the individual role to a night and makes sure the ordering is correct
    function addToNight(elementObject) {
        //implement ordering logic:
        //First Night Only: Cupid, Lovers, Angel, Three Brothers
        //First Night Order: Cupid, Lovers, Three Brothers, Sisters, Dracula, Vampires, Werewolves, Big Bad
        //Every Other Night: White Wolf, Wolf Hunter (if exists)
        //Every Night: Defender, Dracula, Vampires, Werwolves, Big Bad (until one wolf killed), Witch, Gypsy, Psychic Sisters, Collector, Vigilante
        //Witch is always after the werewolves, Dracula always before werewolves
        if (charactersArray.includes(elementObject)) {
            console.log("cupid is in the array");
            
            var character = charactersArray.find(function (element) {
                return element.textToDisplay === 'cupid';
            });
        
            firstNight.push(character);
        }
        
    
    
    
        switch (elementObject.newListItem){
                case 'defenderitem':
                    secondNight[0] = elementObject;
                    break;
                case 'cupiditem': 
                case 'angelitem': //break this out into another function that handles this logic?
                    (!firstNight[0]) ?
                    firstNight.push(elementObject) : firstNight[0] = elementObject;
                    break;
                case 'werewolfitem': 
                case 'bigbadwolfitem': 
                case 'witchitem': 
                case 'draculaitem':
                case 'gypsyitem':
                case 'psychicsistersitem':
                    firstNight.push(elementObject);
                    secondNight.push(elementObject);
                    thirdNight.push(elementObject);
                    fourthNight.push(elementObject);
                    break;
                case 'whitewolfitem':
                    secondNight.push(elementObject);
                    fourthNight.push(elementObject);
                    break;
                case 'vigilanteitem':
                    secondNight.push(elementObject);
                    thirdNight.push(elementObject);
                    fourthNight.push(elementObject);
                    break;
            }
    }
    
    function generateForm() {        
        var nightOne = document.getElementById('1stnight');
        var nightTwo = document.getElementById('2ndnight');
        var nightThree = document.getElementById('3rdnight');
        var nightFour = document.getElementById('4thnight');
        
        addToGameFlow(firstNight, nightOne);
        addToGameFlow(secondNight, nightTwo);
        addToGameFlow(thirdNight, nightThree);
        addToGameFlow(fourthNight, nightFour);        
    }

    function addToGameFlow(elementArray, night) {
        if (elementArray.length > 0)
        {
            for (var i = 0; i < elementArray.length; i += 1) {
                night.innerHTML += '<li id='+elementArray[i].newListItem+'>'+elementArray[i].textToDisplay.toUpperCase()+'</li>';
            }
        }
    }
    
    //polyfill for Array.prototype.find in case it isn't supported (it's an ES6 addition)
    if (!Array.prototype.find) {
      Object.defineProperty(Array.prototype, 'find', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(predicate) {
          if (this == null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
          }
          if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
          }
          var list = Object(this);
          var length = list.length >>> 0;
          var thisArg = arguments[1];
          var value;

          for (var i = 0; i < length; i++) {
            if (i in list) {
              value = list[i];
              if (predicate.call(thisArg, value, i, list)) {
                return value;
              }
            }
          }
          return undefined;
        }
      });
    }
}());