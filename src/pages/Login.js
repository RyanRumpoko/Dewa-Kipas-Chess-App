import axios from "../api/axios";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

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
<<<<<<< HEAD
        localStorage.access_token = data.access_token;
=======
        await localStorage.setItem("access_token", data.access_token);
>>>>>>> afee3b67b7ae7a4f1c64d84a5858d49adde123af
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
    <div className="row">
      <div className="col-4"></div>

      <div className="col-4">
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
      </div>

      <div className="col-4"></div>
    </div>
  );
}
