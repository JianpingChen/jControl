require(['../lib/jControl'],
function(j)
{
	var body = j.body();

test('pieChart can draw a pieChart', function(){
	var pie = j.pieChart();
	body.add(pie);
	var columns = [
		{ type: 'string', label: 'Topping'},
		{ type: 'number', label: 'Slices'}
	];
	var rows = [
          ['Mushrooms', 3],
          ['Onions', 1],
          ['Olives', 1],
          ['Zucchini', 1],
          ['Pepperoni', 2]
        ];
	var options = {'title':'How Much Pizza I Ate Last Night',
                       'width':400,
                       'height':300};
	pie.setDisplay('inline-block')
		.draw(columns, rows, options);
	equal(pie.getOuterWidth(), 400);
});

test('barChart can draw a barChart', function(){
	var bar = j.barChart();
	body.add(bar);
	var data = [
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ];
	var options = {
          title: 'Company Performance',
          vAxis: {title: 'Year',  titleTextStyle: {color: 'red'}},
		  'width':400,
          'height':300
        };
	bar.setDisplay('inline-block')
		.draw(data, options);
	equal(bar.getOuterWidth(), 400);
});

test('columnChart can draw a columnChart', function(){
	var bar = j.columnChart();
	body.add(bar);
	var data = [
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ];
	var options = {
          title: 'Company Performance',
          hAxis: {title: 'Year', titleTextStyle: {color: 'red'}},
		  'width':400,
          'height':300
        };
	bar.setDisplay('inline-block')
		.draw(data, options);
	equal(bar.getOuterWidth(), 400);
});

test('lineChart can draw a lineChart', function(){
	var bar = j.lineChart();
	body.add(bar);
	var data = [
          ['Year', 'Sales', 'Expenses'],
          ['2004',  1000,      400],
          ['2005',  1170,      460],
          ['2006',  660,       1120],
          ['2007',  1030,      540]
        ];
	var options = {
          title: 'Company Performance',
          hAxis: {title: 'Year', titleTextStyle: {color: 'red'}},
		  'width':400,
          'height':300
        };
	bar.setDisplay('inline-block')
		.draw(data, options);
	equal(bar.getOuterWidth(), 400);
});

});