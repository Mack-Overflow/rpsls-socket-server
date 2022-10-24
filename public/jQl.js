// console.log('Jquery Lite');
// const $ = (sel) => [...document.querySelectorAll(sel)];
const $$ = (sel) => document;

class ElementCollection extends Array {
  ready(cb) {
    const isReady = this.some((e) => {
      return e.readyState != null && e.readyState != 'loading';
    });
    if (isReady) {
      cb();
    } else {
      this.on('DOMContentLoaded', cb);
    }
  }

  on(event, cbOrSelector, cb) {
    if (typeof cbOrSelector === 'function') {
      this.forEach((e) => e.addEventListener(event, cb));
    } else {
      this.forEach((element) => {
        element.addEventListener(event, (e) => {
          if (e.target.matches(cbOrSelector)) cb(e);
        });
      });
    }
  }

  // createTag(tag) {
  //   document.createElement(tag);
  //   return this;
  // }

  next() {
    return this.map((e) => e.nextElementSibling).filter((e) => e != null);
  }

  prev() {
    return this.map((e) => e.previousElementSibling).filter((e) => e != null);
  }

  removeClass(className) {
    this.forEach((e) => e.classList.remove(className));
    return this;
  }

  addClass(className) {
    this.forEach((e) => e.classList.add(className));
    return this;
  }

  hasClass(className) {
    return (e) => e.classList.contains(className);
  }

  addId(idName) {
    (e) => e.setAttribute('id', idName);
  }

  css(property, value) {
    const camelProp = property.replace(/(-[a-z])/, (g) => {
      return g.replace('-', '').toUpperCase();
    });
    this.forEach((e) => (e.style[camelProp] = value));
    return this;
  }
}

function $(sel) {
  if (typeof sel === 'string' || sel instanceof String) {
    return new ElementCollection(...document.querySelectorAll(sel));
  } else {
    return new ElementCollection(sel);
  }
}

const dropDownx = document.querySelector('#course');
const dropDown = $('#course');

// console.log(dropDown);

// TODO: event listeners

// TODO: create DOM element

// TODO: jQuery get/set hidden, disabled

// TODO: get/set css attrs.
