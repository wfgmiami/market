(function($, window, undefined) {
  import axios from 'axios';

  axios.get('/api/stocks/nasdaq')
  .then( response => response.data )
  .then( nasdaq => this.setState( { nasdaq }))
  .catch( err => console.log( err ))

  var InfiniteScroll = function() {
      this.initialize = function() {
          this.setupEvents();
      };

      this.setupEvents = function() {
          $(window).on(
              'scroll',
              this.handleScroll.bind(this)
          );
  loadData()
      };

      this.handleScroll = function() {
          var scrollTop = $(document).scrollTop();
          var windowHeight = $(window).height();
          var height = $(document).height() - windowHeight;
          var scrollPercentage = (scrollTop / height);

          // if the scroll is more than 90% from the top, load more content.
          if(scrollPercentage > 0.9) {
              this.doSomething();
          }
      }

      this.doSomething = function() {
          // Do something.
          // Load data or whatever.

  loadData()


      }

      this.initialize();
  }

  var loadData = function(){

  var items = [];
  var jsonFile = jQuery.getJSON("https://raw.githubusercontent.com/wfgmiami/investoshop/master/nasdaq.json", function (data) {

    for(var i = 0; i < data.length; i++){
      items.push("<tr>");
      $.each( data[i], function( key, val ) {
            items.push( "<td id='" + key + "'>" + val + "</td>" );

        });
      items.push("</tr>");
    }


    $( "<tbody/>", {"class": "my-new-list",    html: items.join( "" )  }).appendTo( "table" );
  })

  }

  $(document).ready(
      function() {
          // Initialize scroll
          new InfiniteScroll();
      }
  );

})(jQuery, window);
