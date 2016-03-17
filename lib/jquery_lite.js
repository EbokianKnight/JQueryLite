(function (root) {

  root.fnQueue = [];

  root.$l = function (arg) {
    var htmlArray;
    if (typeof arg === "string") {
      var selected = document.querySelectorAll(arg);
      htmlArray = [].slice.call(selected);
    } else if (arg instanceof HTMLElement) {
      htmlArray = [arg];
    } else if (typeof arg === 'function') {
      if (document.readyState === 'complete'){
        arg();
      } else {
        root.fnQueue.push(arg);
      }
      return;
    }
    return new _DOMNodeCollection(htmlArray);
  };

  document.addEventListener('DOMContentLoaded', function(){
    for (var i = 0; i < root.fnQueue.length; i++) {
      root.fnQueue[i]();
    }
  });


  ///////////////////////////////////////////////

  function _DOMNodeCollection (htmlArray) {
    this.array = htmlArray;
  }

  // empty, remove, attr, addClass, removeClass, html, find, children, and parent

  _DOMNodeCollection.prototype.html = function (string) {
    if (string) {
      for (var i = 0 ; i < this.array.length; i++) {
        this.array[i].innerHTML = string;
      }
    } else {
      return this.array[0].innerHTML;
    }
  };


  _DOMNodeCollection.prototype.empty = function () {
    for (var i = 0 ; i < this.array.length; i++) {
      this.array[i].innerHTML = "";
    }
  };

  _DOMNodeCollection.prototype.append = function (el) {
    var i;
    if (el instanceof _DOMNodeCollection) {
      for (i = 0 ; i < this.array.length; i++) {
        this.array[i].concat(el);
      }
    } else if (typeof el === "string") {
      el = document.createElement(el);
      for (i = 0 ; i < this.array.length; i++) {
        this.array[i].appendChild(el);
      }
    } else if (el instanceof HTMLElement) {
      for (i = 0 ; i < this.array.length; i++) {
        this.array[i].appendChild(el);
      }
    }
  };

  _DOMNodeCollection.prototype.attr = function (el, val) {
    if (arguments.length === 1) {
      return this.array[0].getAttribute(el);
    } else {
      for (var i = 0 ; i < this.array.length; i++) {
        this.array[i].setAttribute(el, val);
      }
    }
  };

  _DOMNodeCollection.prototype.addClass = function (classString) {
    for (var i = 0 ; i < this.array.length; i++) {
      this.array[i].classList.add(classString);
    }
  };

  _DOMNodeCollection.prototype.removeClass = function (classString) {
    for (var i = 0 ; i < this.array.length; i++) {
      this.array[i].classList.remove(classString);
    }
  };

  _DOMNodeCollection.prototype.children = function() {
    var newCollection = new _DOMNodeCollection([]);
    for (var i = 0 ; i < this.array.length; i++) {
      var kinder = this.array[i].childNodes;
      kinder = [].slice.call(kinder);
      newCollection.array = newCollection.array.concat(kinder);
    }
    return newCollection;
  };

  _DOMNodeCollection.prototype.parent = function() {
    var newCollection = new _DOMNodeCollection([]);
    for (var i = 0 ; i < this.array.length; i++) {
      newCollection.array.push(this.array[i].parentNode);
    }
    return newCollection;
  };

  _DOMNodeCollection.prototype.find = function(selector) {
    var newCollection = new _DOMNodeCollection([]);
    for (var i = 0 ; i < this.array.length; i++) {
      var caught = this.array[i].querySelectorAll(selector);
      newCollection.array.concat(caught);
    }
    return newCollection;
  };

  _DOMNodeCollection.prototype.remove = function(selector) {
    if (arguments.length === 0) {
      this.array = [];
    } else {
      for (var i = 0; i < this.array.length; i++) {
        if (this.array[i].querySelector(selector)) {
          this.array.splice(i, 1);
        }
      }
    }

  };

  _DOMNodeCollection.prototype.on = function(trigger, listener) {
    for (var i = 0; i < this.array.length; i++) {
      this.array[i].addEventListener(trigger, listener);
    }
  };

  _DOMNodeCollection.prototype.off = function(trigger, listener) {
    for (var i = 0; i < this.array.length; i++) {
      this.array[i].removeEventListener(trigger, listener);
    }
  };

  function merge(obj, obj2) {
    obj = (JSON.parse(JSON.stringify(obj)));
    for (var i = 0; i < obj2.length; i++) {
      var key = Object.keys(obj2)[i];
      var value = obj2[key];
      obj[key] = value;
    }
    return obj;
  }




})(this);


// JQuery("li") === $("li");
