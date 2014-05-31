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
require(['../lib/jControl.js'],
function(j)
{

QUnit.config.reorder = false;

	var server = j.serviceProxy('http://localhost:65224/api/Contact');

test('GET All should return list', function(){

	var option = {
		successCallback: function(data){
			start();
			ok(data.length > 5);
			ok(data[0].Id == 10);
		}
	};
	var get = j.restGetAll(option);
	server.executeAsyncCall(get);
	
	expect(2);
	stop();
});

test('GET should return single', function(){

	var option = {
		successCallback: function(data){
			start();
			ok(data.Name == 'Mary Ann');
			ok(data.Id == 10);
		}
	};
	var get = j.restGet('10', option);
	server.executeAsyncCall(get);
	
	expect(2);
	stop();
});

test('POST should add single', function(){
	var newContact = {
		Id: 21,
			Name: 'Jason Smith',
			Gender: 'Male',
			//DateOfBirth: new Date(),
			Email: 'jason.smith@visualdynamics.com'
	};
	var option = {
		successCallback: function(){
			var getOption = {
				successCallback: function(data){
					start();
					ok(data.Id == 21);
				}
			};
			var getOne = j.restGet('21', getOption);
			server.executeAsyncCall(getOne);
		},
		redirectCallback: function(){
			start();
			ok(false);
		},
		failureCallback: function(){
			start();
			ok(false);
		}
	};
	var post = j.restPost(newContact, option);
	server.executeAsyncCall(post);
	
	expect(1);
	stop();
});

test('PUT should update single', function(){
	var newContact = {
		Id: 21,
			Name: 'Jessica Ford',
			Gender: 'Female',
			//DateOfBirth: new Date(),
			Email: 'jessica.ford@visualdynamics.com'
	};
	var option = {
		successCallback: function(){
			var getOption = {
				successCallback: function(data){
					start();
					ok(data.Name == 'Jessica Ford');
				}
			};
			var getOne = j.restGet('21', getOption);
			server.executeAsyncCall(getOne);
		},
		redirectCallback: function(){
			start();
			ok(false);
		},
		failureCallback: function(){
			start();
			ok(false);
		}
	};
	var put = j.restPut('21', newContact, option);
	server.executeAsyncCall(put);
	
	expect(1);
	stop();
});

test('DELETE should delete single', function(){
	var option = {
		successCallback: function(){
			var getOption = {
				successCallback: function(data){
					start();
					ok(false);
				},
				failureCallback: function(){
					start();
					ok(true);
				}
			};
			var getOne = j.restGet('21', getOption);
			server.executeAsyncCall(getOne);
		},
		redirectCallback: function(){
			start();
			ok(false);
		},
		failureCallback: function(){
			start();
			ok(false);
		}
	};
	
	var del = j.restDelete('21', option);
	server.executeAsyncCall(del);
	
	expect(1);
	stop();
});

});