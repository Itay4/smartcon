import React, { Fragment } from "react";
import { onboard } from "../utils/onboard";
import { login } from "../redux/actions/app";
// import Footer from "../../components/Footer";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

function Login(props: { user: any; login: any; }) {
  const { user, login } = props;
  const navigate = useNavigate();

  if (!user) {
    startLogin(login, navigate);
  } else {
    navigate("/my-pokemons");
  }

  return (
    <Fragment>
      <br />
      <h2>Login with any wallet and connect with RINKEBY testnet.</h2>
      <div style={{ position: "absolute", bottom: "30px", width: "100%" }}>
        {/* <Footer /> */}
      </div>
    </Fragment>
  );
}

const startLogin = async (login: (arg0: { user: any; navigate: any; }) => void, navigate: NavigateFunction) => {
  await onboard.walletSelect();
  await onboard.walletCheck();
  login({ user: onboard.getState(), navigate: navigate });
};

const mapStateToProps = (state: { app: { user: any; }; }) => ({
  user: state.app.user,
});

const mapDispatchToProps = (dispatch: (arg0: any) => any) => ({
  login: (payload: any) => dispatch(login(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
