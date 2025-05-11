define([
  'dojo/_base/declare',
  'jimu/BaseWidget',
  'esri/geometry/Point',
  'esri/symbols/SimpleMarkerSymbol',
  'esri/Color',
  'esri/graphic',
  'esri/geometry/webMercatorUtils'
], function(declare, BaseWidget, Point, SimpleMarkerSymbol, Color, Graphic, webMercatorUtils) {
  return declare([BaseWidget], {
    baseClass: 'zoom-to-coordinates',

    startup: function () {
      this.inherited(arguments);
      console.log('ZoomToCoordinates widget loaded');
    },

    _onZoomClick: function() {
      var lat = parseFloat(this.latInput.value);
      var lon = parseFloat(this.lonInput.value);

      if (isNaN(lat) || isNaN(lon)) {
        alert('Please enter valid coordinates.');
        return;
      }

      console.log('Zooming to coordinates:', lat, lon);

      // Create WGS84 point
      var wgsPoint = new Point(lon, lat, { wkid: 4326 });

      // Project to map spatial reference
      var mapPoint = webMercatorUtils.geographicToWebMercator(wgsPoint);

      var markerSymbol = new SimpleMarkerSymbol(
        SimpleMarkerSymbol.STYLE_CIRCLE,
        12,
        null,
        new Color([255, 0, 0])
      );

      var graphic = new Graphic(mapPoint, markerSymbol);
      this.map.graphics.clear();
      this.map.graphics.add(graphic);

      this.map.centerAndZoom(mapPoint, 10);
    }
  });
});
