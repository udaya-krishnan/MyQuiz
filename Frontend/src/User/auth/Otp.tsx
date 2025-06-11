import "./Otp.css";
import { useState, useEffect } from "react";
import { Formik, Form, FieldArray } from "formik";
import * as Yup from "yup";

const otpLength = 6;

const validationSchema = Yup.object().shape({
  otp: Yup.array()
    .of(Yup.string().matches(/^[0-9]$/, "Must be a digit").required("Required"))
    .min(otpLength, "Enter all digits")
    .max(otpLength, "Only 6 digits required"),
});

function Otp() {
  const [timer, setTimer] = useState<number>(30);
  const [disabled, setDisabled] = useState<boolean>(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setDisabled(true);
    }
  }, [timer]);

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-wrapper">
          <img src="/assets/logo.png" alt="MyQuiz Logo" className="logo-image" />
        </div>

        <h2 className="login-title">Enter OTP</h2>

        <Formik
          initialValues={{ otp: new Array(otpLength).fill("") }}
          validationSchema={validationSchema}
          onSubmit={({ otp }) => {
            const fullOtp = otp.join("");
            alert(`Submitted OTP: ${fullOtp}`);
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="login-form">
              <div className="otp-input-group">
                <FieldArray
                  name="otp"
                  render={() =>
                    values.otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        className="otp-box"
                        value={digit}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (/^[0-9]?$/.test(val)) {
                            setFieldValue(`otp[${index}]`, val);
                            if (val && index < otpLength - 1) {
                              const next = document.getElementById(`otp-${index + 1}`);
                              next?.focus();
                            }
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !values.otp[index] && index > 0) {
                            const prev = document.getElementById(`otp-${index - 1}`);
                            prev?.focus();
                          }
                        }}
                      />
                    ))
                  }
                />
              </div>

              {errors.otp && touched.otp && typeof errors.otp === "string" && (
                <div className="error-text">{errors.otp}</div>
              )}

              <button type="submit" className="submit-button" disabled={disabled}>
                {disabled ? "Time Expired" : "Verify OTP"}
              </button>

              <p className="timer-text">Time remaining: {timer}s</p>
            </Form>
          )}
        </Formik>

        <div className="links">
          <a href="#">Didn't receive the code? Resend</a>
        </div>
      </div>
    </div>
  );
}

export default Otp;
