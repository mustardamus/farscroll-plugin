###
# jQuery Farscroll Plugin - v0.1.0
#
# http://github.com/mustardamus/farscroll-plugin
# 
# Copyright (c) 2011 Sebstian Senf
# Dual licensed under the MIT and GPL licenses.
#   http://www.opensource.org/licenses/mit-license.php
#   http://www.gnu.org/licenses/gpl.html
###

class Farscroll
  defaults:
    height    : 18                    # the height of the DIV containing the cloned scrollbar
    background: 'rgba(0, 0, 0, 0.05)' # backgound color of the overlap (DIV height - scrollbar height)
    
  constructor: (el, options) ->
    @options       = $.extend {}, @defaults, options
    @winEl         = $ window
    @el            = el
    @elHeight      = el.height()
    @maxScrollLeft = @maxScrollLeft()
    
    if @maxScrollLeft > 0
      @cloneEl = @cloneScrollbar()
    
      @cloneScrollEvent @el, @cloneEl
      @cloneScrollEvent @cloneEl, @el
      
      @positionClone()
      @toggleClone()
    
      @winEl.on 'resize', =>
        @positionClone()
      
      @winEl.on 'scroll', =>
        @toggleClone()
  
  cloneScrollbar: (maxScrollLeft) ->
    width  = @el.outerWidth()
    clone  = $ '<div/>'
      class: 'farscroll-clone'
      html : '<div/>'
      css  :
        position  : 'fixed'
        overflow  : 'auto'
        display   : 'none'
        width     : width
        height    : @options.height
        background: @options.background
    
    clone.appendTo 'body'
    clone.children().css
      width : width + @maxScrollLeft
      height: 1
    
    clone
  
  cloneScrollEvent: (from, to) ->
    from.on 'scroll', ->
      to.scrollLeft from.scrollLeft()
  
  maxScrollLeft: ->
    @el.scrollLeft 99999
    max = @el.scrollLeft()
    @el.scrollLeft 0
    max
  
  positionClone: ->
    @cloneEl.css
      top : @winEl.height() - @options.height
      left: @el.offset().left
  
  toggleClone: ->
    height    = @options.height
    offsetTop = @el.offset().top + @elHeight + height
    fold      = @winEl.height() + @winEl.scrollTop() - offsetTop
    
    if fold < 0                       #above the fold
      if @elHeight < -fold + height
        @cloneEl.hide()
      else                            #overlaps the fold
        @cloneEl.fadeIn 'fast'
    else                              #below the fold
      @cloneEl.hide()

$.fn.farscroll = (options) ->
  for el in @
    new Farscroll $(el), options