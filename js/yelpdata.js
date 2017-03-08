var app = window.app || {};
app.yelpData = (function ($) {
  "use strict";
  var me = {
    getYelpInfo: getYelpInfo,
    yelpRatings: [],
    loadYelpRatings: loadYelpRatings
  };

  function loadYelpRatings() {

    console.log("Making api request for Yelp Ratings...")
    for (var i = 0; i < app.placeViewModel.markers.length; i++) {
      console.log("yelp id = ", app.placeViewModel.places()[i].yelpID);
      me.getYelpInfo(app.placeViewModel.places()[i].yelpID);
    }


  }

  function getYelpInfo(yelpId) {

    function nonce_generate() {
      return (Math.floor(Math.random() * 1e12).toString());
    }

    var YELP_KEY = "Zwcl1st6vGfHoXGgOe6YKA",  // goes into parameters variable
      YELP_TOKEN = "uOEA_bV6OnwIlsQ2Am2vt-cy8Agjmt11", // goes into parameters variable
      YELP_KEY_SECRET = "eWwJXkpiSzV83uz-oetgkaZEt6M",  // goes into oauthSignature.generate() method
      YELP_TOKEN_SECRET = "FSyNzwQFbBtId5RE4By7Ziy2mIU"; // goes into oauthSignature.generate() method

    //console.log("yelp url = ", yelp_url);

    var parameters = {
      oauth_consumer_key: YELP_KEY,
      oauth_token: YELP_TOKEN,
      oauth_nonce: nonce_generate(),
      oauth_timestamp: Math.floor(Date.now() / 1000),
      oauth_signature_method: 'HMAC-SHA1',
      oauth_version: '1.0',
      callback: 'cb'
    };

    var yelp_url = 'https://api.yelp.com/v2/business/' + yelpId;

    parameters.oauth_signature = oauthSignature.generate('GET', yelp_url, parameters,
      YELP_KEY_SECRET, YELP_TOKEN_SECRET);

    $.ajax({
      url: yelp_url,
      data: parameters,
      cache: true,
      dataType: 'jsonp json text',
      jsonpCallback: 'cb'
    }).done(function (response) {
      //document.getElementById('yelpRating').src = response.rating_img_url;
      console.log("response = " +  response.rating_img_url + " yelp url = " + yelp_url);
      me.yelpRatings.push({ "yelp_id": yelpId, "rating": response.rating_img_url } );

      console.log(me.yelpRatings);
    }).fail(function (response) {
      // If the ajax call fails, then the yelp data will not be displayed.

      console.log("Ajax called failed: Data could not be retrieved from Yelp API");
      console.log(yelp_url);
      console.dir(response);
    });
  };

  return me;
})(jQuery);

