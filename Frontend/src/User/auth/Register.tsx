import "./Register.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits")
    .required("Phone number is required"),
  password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm your password"),
});

function Register() {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-wrapper">
          <img src="/assets/logo.png" alt="MyQuiz Logo" className="logo-image" />
        </div>

        <h2 className="login-title">Sign Up</h2>

        <Formik
          initialValues={{
            fullName: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log("Form Submitted", values);
          }}
        >
          <Form className="login-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <div className="input-with-icon">
                <img src="/assets/icons/user-solid.svg" alt="name icon" className="input-icon" />
                <Field type="text" id="fullName" name="fullName" placeholder="Enter your full name" />
              </div>
              <ErrorMessage name="fullName" component="div" className="error-text" />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-with-icon">
                <img src="/assets/icons/envelope-solid.svg" alt="email icon" className="input-icon" />
                <Field type="email" id="email" name="email" placeholder="Enter your email" />
              </div>
              <ErrorMessage name="email" component="div" className="error-text" />
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="input-with-icon">
                <img src="/assets/icons/phone-solid.svg" alt="phone icon" className="input-icon" />
                <Field type="text" id="phone" name="phone" placeholder="Enter your phone number" />
              </div>
              <ErrorMessage name="phone" component="div" className="error-text" />
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-with-icon">
                <img src="/assets/icons/key-solid.svg" alt="password icon" className="input-icon" />
                <Field type="password" id="password" name="password" placeholder="Create a password" />
              </div>
              <ErrorMessage name="password" component="div" className="error-text" />
            </div>

            {/* Confirm Password */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="input-with-icon">
                <img src="/assets/icons/key-solid.svg" alt="confirm icon" className="input-icon" />
                <Field type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm password" />
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="error-text" />
            </div>

            <button type="submit" className="submit-button">
              Create Account
            </button>
          </Form>
        </Formik>

        <div className="links">
          <a href="/">Already have an account? Login here</a>
        </div>
      </div>
    </div>
  );
}

export default Register;
