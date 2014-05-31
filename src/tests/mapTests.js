require(['../lib/jControl'],
function(j)
{

	var body = j.body();
	
test('default roadmap', function(){
	var r = j.roadMap();
	body.add(r);
	r.show({
				  "center": new google.maps.LatLng(-34.397, 150.644),
				  "zoom": 8
				});
	ok(r.getOuterWidth() > 0);
});

test('default roadmap', function(){
	var r = j.terrainMap();
	body.add(r);
	r.show({
				  "center": new google.maps.LatLng(-34.397, 150.644),
				  "zoom": 8
				});
	ok(r.getOuterWidth() > 0);
});

test('default roadmap', function(){
	var r = j.satelliteMap();
	body.add(r);
	r.show({
				  "center": new google.maps.LatLng(-34.397, 150.644),
				  "zoom": 8
				});
	ok(r.getOuterWidth() > 0);
});

test('default roadmap', function(){
	var r = j.hybridMap();
	body.add(r);
	r.show({
				  "center": new google.maps.LatLng(-34.397, 150.644),
				  "zoom": 8
				});
	ok(r.getOuterWidth() > 0);
});

});