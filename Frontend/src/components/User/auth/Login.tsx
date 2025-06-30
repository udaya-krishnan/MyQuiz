import "./Login.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

function Login() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-wrapper">
          <img src="/assets/logo.png" alt="MyQuiz Logo" className="logo-image" />
        </div>

        <h2 className="login-title">Login</h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Submitted", values);
          }}
        >
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <img src="/assets/icons/envelope-solid.svg" alt="email icon" className="input-icon" />
                <Field type="email" id="email" name="email" placeholder="Enter your email" />
              </div>
              <ErrorMessage name="email" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <img src="/assets/icons/key-solid.svg" alt="password icon" className="input-icon" />
                <Field type="password" id="password" name="password" placeholder="Enter your password" />
              </div>
              <ErrorMessage name="password" component="div" className="error-text" />
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </Form>
        </Formik>

        <div className="links">
          <a href="/forgotpassword">Forgot password?</a>
          <a href="/auth">Create new account? Click Here</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
