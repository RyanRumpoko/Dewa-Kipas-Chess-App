import axios from "../api/axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import loginImage from "../assets/login-image.svg"


export default function Login() {
  const history = useHistory();
  const [validate, setValidate] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e) {
    try {
      e.preventDefault();
      setValidate(true);
      if (email && password) {
        const { data } = await axios({
          method: "post",
          url: "users/login",
          data: { email, password },
        });
        console.log(data);
        localStorage.access_token = data.access_token;
        history.push("/home", data);
      }
    } catch ({ response }) {
      console.log(response.data, "<<<<<<<<<<");
    }
  }
  async function responseGoogle(res) {
    try {
      const { data } = await axios({
        method: "post",
        url: "users/googlelogin",
        data: res.profileObj,
      });
      await localStorage.setItem("access_token", data.access_token);
      await history.push("/home", data);
      console.log(data);
    } catch ({ response }) {
      console.log(response.data);
    }
  }
  return (
    <div className="row justify-content-center color-light" style={{color: "#999999"}}>
      {/* <div className="col-4"></div> */}

      <div id="form-login">
        <div className="container">
          <div className="row content">
            <div className="col-md-6 mt-5">
              <img src={loginImage} className="img-fluid" alt="login"/>
            </div>
            <div className="col-md-6">
              <h3 className="header-text mb-3">FORM LOGIN</h3>
              <form id="form-login-user" noValidate onSubmit={(e) => login(e)}>
                <div className="form-group">
                  <label>Email :</label>
                  <input type="email" name="email" className="form-control" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="form-group">
                  <label>Password :</label>
                  <input type="password" name="password" className="form-control" required onChange={(e) => setPassword(e.target.value)}/>
                </div>
                {/* style={{backgroundColor: "#b84703", color: "#161512"}} */}
                <button type="submit" className="btn btn-login mb-3 btn-outline-danger">LOGIN</button>
              </form>
              <div className="text-center mb-2"> OR </div>
              <GoogleLogin
              clientId="530630525203-62hcamr2a1e2or3qkidkgashtfd0tj4l.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
              className="btn-google"
              />
              <p>
              Don't have an account? <Link to="/register">Register here</Link>
              </p>
              {/* <a href="#" id="link-register" className="badge badge-info mt-3 text-center" style="width: 420px; height: 22px">Dont have an account? Click here to Register</a> */}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-sm-12 col-md-6 col-xl-4 mt-5" style={{}}>
        <h1>Login</h1>
        <form
          className={
            !validate ? "needs-validation" : "needs-validation was-validated"
          }
          noValidate
          onSubmit={(e) => login(e)}
        >
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              required
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please fill it</div>
          </div>

          <div className="mb-3" hidden>
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please fill it</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please fill it</div>
          </div>

          <div className="mb-3">
            <button className="btn btn-primary" type="submit">
              Submit
            </button>
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
            <GoogleLogin
              clientId="530630525203-62hcamr2a1e2or3qkidkgashtfd0tj4l.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
            ,
          </div>
        </form>
      </div> */}

    </div>
  );
}
