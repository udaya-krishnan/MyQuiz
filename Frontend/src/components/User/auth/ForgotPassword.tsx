import "./ForgotPassword.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Minimum 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

function ForgotPassword() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-wrapper">
          <img src="/assets/logo.png" alt="MyQuiz Logo" className="logo-image" />
        </div>

        <h2 className="login-title">Reset Password</h2>

        <Formik
          initialValues={{ email: "", password: "", confirmPassword: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Reset Password Data:", values);
            alert("Password reset request submitted.");
          }}
        >
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" placeholder="Enter your email" />
              <ErrorMessage name="email" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label htmlFor="password">New Password</label>
              <Field type="password" id="password" name="password" placeholder="Enter new password" />
              <ErrorMessage name="password" component="div" className="error-text" />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
              />
              <ErrorMessage name="confirmPassword" component="div" className="error-text" />
            </div>

            <button type="submit" className="submit-button">Reset Password</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default ForgotPassword;
