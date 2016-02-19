'use strict';

const _ = require( 'lodash' );

module.exports = ( server, options ) => {

	return {
		'authenticate' : ( request, reply ) => {
			// should check database
			if ( options.authenticated ) {
				let session = require( process.cwd() + '/session' );
				let credentials = _.find( session, { 'token' : request.headers[ 'authorization' ] } );

				if ( !credentials ) {
					reply( 'Unauthorized' ).code( 401 );
				} else {
					reply.continue( { 'credentials' : credentials } );
				}
			} else {
				return reply.continue( {
					'credentials' : {
						'user' : 'guest'
					}
				} );
			}
		}
	};

};
