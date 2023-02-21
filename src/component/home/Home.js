import React, { useState } from "react";
import "./Home.css";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar.js";
import { getCompanyBaseUrl } from "../../service/api/auth";
import Error from "../../service/error/Error";
import Success from "../../service/error/Success";
const Home = () => {
  const [state, setState] = useState({
    userCode: "",
    loading: false,
    companyUrl: false,
    error: false,
  });
  const handleChange = (event) => {
    setState((old) => ({ ...old, [event.target.name]: event.target.value }));
  };
  const handleSubmit = async () => {
    setState({ ...state, loading: true });
    const data = await getCompanyBaseUrl(state.userCode);
    console.log(data.url);
    if (data.error) {
      setState({
        ...state,
        loading: false,
        error: data.error,
        companyUrl: false,
      });
      return;
    }
    setState({
      ...state,
      loading: false,
      companyUrl: window.location + data.url.split(".")[0],
      error: false,
    });
  };
  return (
    <>
      <Navbar />
      <div className="m-auto mt-4 home">
        <div className="p-2">
          <h3 className="text-center text-white">Login to Payrol</h3>
          <p className="pt-1 text-center text-white">
            Find out the payrol.com URL for your company
          </p>
          <div className="w-50 m-auto minput-group mb-3">
            <label className="form-label tetx-left text-white">
              Enter your user code:
            </label>
            <input
              name="userCode"
              type="text"
              className="form-control"
              placeholder="user code...."
              onChange={handleChange}
            />
            <div className="mt-2">
              {state.error && <Error message={state.error} />}
              {state.companyUrl && (
                <Success message={state.companyUrl} show="true" />
              )}
            </div>
            <div className="buttonDiv">
              <div className="button" onClick={handleSubmit}>
                {state.loading ? (
                  <i
                    className="fa fa-refresh fa-spin"
                    style={{ display: "", marginLeft: "2px" }}
                  />
                ) : (
                  "Search"
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
