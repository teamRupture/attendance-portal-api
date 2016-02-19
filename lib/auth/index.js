'use strict';

exports.register = ( server, options, next ) => {
	server.auth.scheme( 'api-scheme', require( './scheme' ) );

	server.auth.strategy( 'authenticated-check', 'api-scheme', {
		'authenticated' : true
	} );

	next();
};

exports.register.attributes = {
	'pkg' : {
		'name'    : 'auth',
		'version' : '1.0.0'
	}
};
