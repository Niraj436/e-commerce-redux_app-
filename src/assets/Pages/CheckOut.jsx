import React, { useReducer } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CheckOut = () => {
  const addressReducer = (state, event) => {
    return { ...state, [event.target.name]: event.target.value };
  };

  const [shippingAddress, setShippingAddress] = useReducer(addressReducer, {});

  console.log(shippingAddress);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const proccedTopayment = e =>{
    e.preventDefault()
    dispatch({type:"save_shipping_info", payload:shippingAddress})
    navigate('/proccedTopayment')
  }
  return (
    <>
      <div className="container">
        <form action="" className="m-auto w-50 my-4">
          onChange={setShippingAddress}
          <div className="col-md-8 col-lg-12">
            <h4 className="mb-3">Personal information</h4>
            <div className="row g-3">
              <div className="col-sm-6">
                <label htmlFor="firstName" className="form-label">
                  First name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder=""
                  name="firstName"
                  required
                  onChange={setShippingAddress}
                />
              </div>

              <div className="col-sm-6">
                <label htmlFor="lastName" className="form-label">
                  Last name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder=""
                  name="lastName"
                  required
                  onChange={setShippingAddress}
                />
                <div className="invalid-feedback">
                  Valid last name is required.
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-group has-validation">
                  <span className="input-group-text">@</span>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    placeholder="Username"
                    name="username"
                    required
                    onChange={setShippingAddress}
                  />
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="email" className="form-label">
                  Email <span className="text-body-secondary">(Optional)</span>
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  name="email"
                  onChange={setShippingAddress}
                />
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  name="address"
                  required
                  onChange={setShippingAddress}
                />
              </div>

              <div className="col-12">
                <label htmlFor="address2" className="form-label">
                  Address 2{" "}
                  <span className="text-body-secondary">(Optional)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="address2"
                  placeholder="Apartment or suite"
                  name="address2"
                  onChange={setShippingAddress}
                />
              </div>

              <div className="col-md-5">
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select
                  className="form-select"
                  id="country"
                  name="country"
                  required
                  onChange={setShippingAddress}
                >
                  <option>Choose...</option>
                  <option>United States</option>
                  <option>Nepal</option>
                  <option>India</option>
                  <option>UK</option>
                  <option>Bangladesh</option>
                  <option>Sir lanka</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid country.
                </div>
              </div>

              <div className="col-md-4">
                <label htmlFor="state" className="form-label">
                  State
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="state"
                  placeholder=""
                  name="state"
                  required
                  onChange={setShippingAddress}
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="zip" className="form-label">
                  Zip
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  placeholder=""
                  name="zip"
                  required
                  onChange={setShippingAddress}
                />
              </div>
              <div className="my-4">
                <button className="btn btn-warning w-100" onClick={proccedTopayment}>
                  Proceed to payment
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckOut;
