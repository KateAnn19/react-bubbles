import React, {useState} from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "<3Lambd4",
  });
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const {push} = useHistory();

  const getToken = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/api/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        push("/protected");
      })
      .catch((err) => console.log(err));
  };

    const handleChange = e => {
      setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
      })
    }

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={getToken}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
