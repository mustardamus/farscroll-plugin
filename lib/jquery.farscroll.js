(function() {
  /*
  # jQuery Farscroll Plugin - v0.1.0
  #
  # http://github.com/mustardamus/farscroll-plugin
  # 
  # Copyright (c) 2011 Sebstian Senf
  # Dual licensed under the MIT and GPL licenses.
  #   http://www.opensource.org/licenses/mit-license.php
  #   http://www.gnu.org/licenses/gpl.html
  */
  var Farscroll;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Farscroll = (function() {
    Farscroll.prototype.defaults = {
      height: 18,
      background: 'rgba(0, 0, 0, 0.05)'
    };
    function Farscroll(el, options) {
      this.options = $.extend({}, this.defaults, options);
      this.winEl = $(window);
      this.el = el;
      this.elHeight = el.height();
      this.maxScrollLeft = this.maxScrollLeft();
      if (this.maxScrollLeft > 0) {
        this.cloneEl = this.cloneScrollbar();
        this.cloneScrollEvent(this.el, this.cloneEl);
        this.cloneScrollEvent(this.cloneEl, this.el);
        this.positionClone();
        this.toggleClone();
        this.winEl.on('resize', __bind(function() {
          return this.positionClone();
        }, this));
        this.winEl.on('scroll', __bind(function() {
          return this.toggleClone();
        }, this));
      }
    }
    Farscroll.prototype.cloneScrollbar = function(maxScrollLeft) {
      var clone, width;
      width = this.el.outerWidth();
      clone = $('<div/>', {
        "class": 'farscroll-clone',
        html: '<div/>',
        css: {
          position: 'fixed',
          overflow: 'auto',
          display: 'none',
          width: width,
          height: this.options.height,
          background: this.options.background
        }
      });
      clone.appendTo('body');
      clone.children().css({
        width: width + this.maxScrollLeft,
        height: 1
      });
      return clone;
    };
    Farscroll.prototype.cloneScrollEvent = function(from, to) {
      return from.on('scroll', function() {
        return to.scrollLeft(from.scrollLeft());
      });
    };
    Farscroll.prototype.maxScrollLeft = function() {
      var max;
      this.el.scrollLeft(99999);
      max = this.el.scrollLeft();
      this.el.scrollLeft(0);
      return max;
    };
    Farscroll.prototype.positionClone = function() {
      return this.cloneEl.css({
        top: this.winEl.height() - this.options.height,
        left: this.el.offset().left
      });
    };
    Farscroll.prototype.toggleClone = function() {
      var fold, height, offsetTop;
      height = this.options.height;
      offsetTop = this.el.offset().top + this.elHeight + height;
      fold = this.winEl.height() + this.winEl.scrollTop() - offsetTop;
      if (fold < 0) {
        if (this.elHeight < -fold + height) {
          return this.cloneEl.hide();
        } else {
          return this.cloneEl.fadeIn('fast');
        }
      } else {
        return this.cloneEl.hide();
      }
    };
    return Farscroll;
  })();
  $.fn.farscroll = function(options) {
    var el, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = this.length; _i < _len; _i++) {
      el = this[_i];
      _results.push(new Farscroll($(el), options));
    }
    return _results;
  };
}).call(this);
