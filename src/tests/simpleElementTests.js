/*
This file is part of jControl® JavaScript library, an object oriented JavaScript programming framework.

Copyright (C) 2014 Visual Dynamics Software Ltd.
Trademark jControl® is a registered trademark of Visual Dynamics Software Ltd.

jControl® Open Source is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

jControl® Open Source is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with jControl® Open Source.  If not, see <http://opensource.org/licenses/GPL-3.0/>.

Contact information: jp.chen.jianping@gmail.com
*/
require(['../lib/jControl'],
function(j)
{

test('area should have AREA tag', function() {
	var e = j.area();
	equal(e.getTagName(), 'AREA');
});

test('article should have ARTICLE tag', function() {
	var e = j.article();
	equal(e.getTagName(), 'ARTICLE');
});

test('HTML5: audio should have AUDIO tag', function() {
	var e = j.audio();
	equal(e.getTagName(), 'AUDIO');
});

test('bdo should have BDO tag', function() {
	var e = j.bdo();
	equal(e.getTagName(), 'BDO');
});

test('br should have BR tag', function() {
	var e = j.br();
	equal(e.getTagName(), 'BR');
});

test('HTML5: canvas should have CANVAS tag', function() {
	var e = j.canvas();
	equal(e.getTagName(), 'CANVAS');
});

test('caption should have CAPTION tag', function() {
	var e = j.caption('caption');
	equal(e.getTagName(), 'CAPTION');
});

test('datetimeInput should have INPUT tag', function() {
	var e = j.datetimeInput();
	equal(e.getTagName(), 'INPUT');
});

test('div should have DIV tag and correct name', function() {
	var name = 'myDiv';
	var e = j.div(name);
	equal(e.getTagName(), 'DIV');
	equal(e.getHtmlElement().getAttribute('name'), name);
});

test('embed should have EMBED tag and correct name', function() {
	var e = j.embed();
	equal(e.getTagName(), 'EMBED');
});

test('figcaption should have FIGCAPTION tag', function() {
	var e = j.figCaption('figcaption');
	equal(e.getTagName(), 'FIGCAPTION');
});

test('figure should have FIGURE tag', function() {
	var e = j.figure();
	equal(e.getTagName(), 'FIGURE');
});

test('footer should have FOOTER tag', function() {
	var e = j.footer();
	equal(e.getTagName(), 'FOOTER');
});

test('h1 should have H1 tag', function() {
	var e = j.h1();
	equal(e.getTagName(), 'H1');
});

test('h2 should have H2 tag', function() {
	var e = j.h2();
	equal(e.getTagName(), 'H2');
});

test('h3 should have H3 tag', function() {
	var e = j.h3();
	equal(e.getTagName(), 'H3');
});

test('h4 should have H4 tag', function() {
	var e = j.h4();
	equal(e.getTagName(), 'H4');
});

test('h5 should have H5 tag', function() {
	var e = j.h5();
	equal(e.getTagName(), 'H5');
});

test('h6 should have H6 tag', function() {
	var e = j.h6();
	equal(e.getTagName(), 'H6');
});

test('header should have HEADER tag', function() {
	var e = j.header();
	equal(e.getTagName(), 'HEADER');
});

test('hr should have HR tag', function() {
	var e = j.hr();
	equal(e.getTagName(), 'HR');
});

test('keygen should have KEYGEN tag', function() {
	var e = j.keygen();
	equal(e.getTagName(), 'KEYGEN');
});

test('label should have LABEL tag', function() {
	var e = j.label();
	equal(e.getTagName(), 'LABEL');
});

test('map should have MAP tag', function() {
	var e = j.map();
	equal(e.getTagName(), 'MAP');
});

test('object should have OBJECT tag', function() {
	var e = j.objectElement();
	equal(e.getTagName(), 'OBJECT');
});

test('p should have P tag', function() {
	var e = j.p();
	equal(e.getTagName(), 'P');
});

test('param should have PARAM tag', function() {
	var e = j.param();
	equal(e.getTagName(), 'PARAM');
});

test('source should have SOURCE tag', function() {
	var e = j.source();
	equal(e.getTagName(), 'SOURCE');
});

test('span should have SPAN tag', function() {
	var e = j.span();
	equal(e.getTagName(), 'SPAN');
});


test('HTML5: svg should have SVG tag', function() {
	var e = j.svg();
	equal(e.getTagName(), 'SVG');
});

test('table should have TABLE tag', function() {
	var e = j.table();
	equal(e.getTagName(), 'TABLE');
});

test('th should have TH tag', function() {
	var e = j.th();
	equal(e.getTagName(), 'TH');
});

test('thead should have THEAD tag', function() {
	var e = j.thead();
	equal(e.getTagName(), 'THEAD');
});


test('tbody should have TBODY tag', function() {
	var e = j.tbody();
	equal(e.getTagName(), 'TBODY');
});

test('td should have TD tag', function() {
	var e = j.td();
	equal(e.getTagName(), 'TD');
});

test('tr should have TR tag', function() {
	var e = j.tr();
	equal(e.getTagName(), 'TR');
});

test('track should have TRACK tag', function() {
	var e = j.track();
	equal(e.getTagName(), 'TRACK');
});

test('tfoot should have TFOOT tag', function() {
	var e = j.tfoot();
	equal(e.getTagName(), 'TFOOT');
});

test('HTML5: video should have VIDEO tag', function() {
	var e = j.video();
	equal(e.getTagName(), 'VIDEO');
});

});
