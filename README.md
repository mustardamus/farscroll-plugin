# jQuery Farscroll Plugin

Clone that scrollbar far away. [Demo](http://mustardamus.github.com/farscroll-plugin).

This simple Plugin enhances elements that have a overflowing fixed width but no fixed height,
the ones with the horizontal scrollbar like `pre`. If the element overlaps the page fold the
scrollbar is not visible. With this Plugin a cloned scrollbar is positioned over the element
when needed.

## Installation

Include jQuery and the Plugin in your page.

    <script src="js/jquery-1.7.min.js"></script>
    <script src="../lib/jquery.farscroll.js"></script>

## Initialization

Call the `farscroll()` function on the elements you want to have the horizontal scrollbar to
be cloned.

    $(document).ready(function() {
      $('pre#demo').farscroll();
    });
    
## Options

    $('pre#demo').farscroll({
      height    : 18,                   //the height of the DIV containing the cloned scrollbar
      background: 'rgba(0, 0, 0, 0.05)' //backgound color of the overlap (DIV height - scrollbar height)
    });

## Compilation

This Plugin is written in [CoffeeScript](http://jashkenas.github.com/coffee-script). Compile it
to JavaScript with `coffee -o ./lib/ -c ./src/`. If you have [Thor](https://github.com/wycats/thor)
installed use the `thor compile:js` task.

## License

Copyright (c) 2011 Sebstian Senf
Dual licensed under the [MIT](http://www.opensource.org/licenses/mit-license.php) and
[GPL](ttp://www.gnu.org/licenses/gpl.html) licenses.