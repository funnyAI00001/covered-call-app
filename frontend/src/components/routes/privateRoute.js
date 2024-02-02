import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoadingOverlay from '../dialog/loadingOverlay';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading }
}) => {
    if (isAuthenticated && loading) {
        return <LoadingOverlay text='loading...' color='success'/>
    }

    if (isAuthenticated) {
        return <Component />
    }

    return <Navigate to='/login' />
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps) (PrivateRoute);