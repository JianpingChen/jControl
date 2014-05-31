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
	
test('by default command is executable', function()
{
	var defaultCmd = j.command();
	ok(defaultCmd.canExecute());
	defaultCmd.execute();
	defaultCmd.dispose();
});

test('host canExecute should control command enabled state', function()
{
	var host = j.mockCommandHost();
	var cmd = j.command(host.execute, host.canExecute);
	var param = 'message';
	
	ok(cmd.canExecute(), 'host enabled command');
	cmd.execute(param);
	ok(host.executeCalled, 'must call host function');
	equal(host.callParam, param, 'must pass correct param');
	
	host.reset();
	host.canExecuteFunction = false;
	ok(!cmd.canExecute(), 'host disable command');
	ok(!host.executeCalled);
	equal(host.callParam, null);
	cmd.execute(param);
	ok(!host.executeCalled, 'should not call host function');
	equal(host.callParam, null, 'no param expected');
});

test('command should notify listeners with correct state', function()
{
	var host = j.mockCommandHost();
	var cmd = j.command(host.execute, host.canExecute);

	var listener = j.mockEventListener();
	cmd.subscribeToValueChange(listener.callback);
	ok(!listener.callbackInvoked);
	equal(listener.sender, null);
	equal(listener.callbackArg, null);
	cmd.notifyObservers();
	ok(listener.callbackInvoked);
	deepEqual(listener.sender, cmd);
	equal(listener.callbackArg, cmd.canExecute());
	
	host.reset();
	host.canExecuteFunction = false;
	cmd.notifyObservers();
	ok(listener.callbackInvoked);
	deepEqual(listener.sender, cmd);
	ok(!cmd.canExecute());
	equal(listener.callbackArg, cmd.canExecute());
});

});