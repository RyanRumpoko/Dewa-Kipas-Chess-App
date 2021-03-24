import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../api/axios";

export default function Login() {
  const [validate, setValidate] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  async function register(e) {
    try {
      e.preventDefault();
      setValidate(true);
      if (username || email || password) {
        const { data } = await axios({
          method: "post",
          url: "users/register",
          data: { username, email, password },
        });
        console.log(data);
        history.push("/login");
      }
    } catch ({ response }) {
      console.log(response);
    }
  }
  return (
    <div className="row justify-content-center color-light" style={{color: "#999999"}}>
      <div className="col-4"></div>

      <div className="col-4">
        <h1>Register</h1>
        <form
          className={
            !validate ? "needs-validation" : "needs-validation was-validated"
          }
          noValidate
          onSubmit={(e) => register(e)}
        >
          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
            />
            <div className="valid-feedback">Looks good!</div>
            <div className="invalid-feedback">Please fill it</div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              required
              onChange={(e) => setEmail(e.target.value)}
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
              Already have an Account? <Link to="/login">Login here</Link>
            </p>
          </div>
        </form>
      </div>

      <div className="col-4"></div>
    </div>
  );
}
