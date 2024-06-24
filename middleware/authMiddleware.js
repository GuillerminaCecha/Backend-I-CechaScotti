export const isAdmin = ( req, res, next ) => {
    const isAdminUser = true; 

    if ( isAdminUser ) {
        next();
    } else {
        res.status( 403 ).send( 'Access denied' );
    }
};

export const isEmployee = ( req, res, next ) => {
    const isEmployeeUser = true;
    if ( isEmployeeUser ) {
        next();
    } else {
        res.status( 403 ).send( 'Access denied' );
    }
};

export const isUser = ( req, res, next ) => {
    const isRegularUser = true; 

    if ( isRegularUser ) {
        next();
    } else {
        res.status( 403 ).send( 'Access denied' );
    }
};