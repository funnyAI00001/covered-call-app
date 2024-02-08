import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import LoadingOverlay from "../dialog/loadingOverlay";
import { getExpirations } from "../../actions/stockAction";

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  getExpirations
}) => {
  useEffect(() => {
    getExpirations()
  },[getExpirations]);

  if (isAuthenticated && loading) {
    return <LoadingOverlay text="loading..." color="success" />;
  }

  if (isAuthenticated) {
    return <Component />;
  }

  return <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  getExpirations: () => dispatch(getExpirations()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
