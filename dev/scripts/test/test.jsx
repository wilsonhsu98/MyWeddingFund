/** @jsx React.DOM */
define([

	'react'

], function(

	React

) {

	'use strict';

	var ExampleComponent = React.createClass({
		displayName: 'ExampleComponent',

		render: function() {
			return ( < div className = "test" > Simple RequireJS Example < /div>);
		}

	});

	return ExampleComponent;
});