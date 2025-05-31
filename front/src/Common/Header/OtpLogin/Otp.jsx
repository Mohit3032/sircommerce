import React, { useContext, useState } from "react";
import axios from "axios";
import './Otp.scss'
import { OtpInput } from "reactjs-otp-input" // Import reactjs-otp-input
import MyContext from "../../Context/MyContext";
import { Helmet } from "react-helmet";
import { PencilLine } from "lucide-react";
import LoginEmail from "../Login/LoginEmail";

function OTPForm() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");
    const [phoneError, setPhoneError] = useState("");

    const { handleLogin, url, Navigate, setMainloader } = useContext(MyContext)
    const sendOtp = async () => {
        if (phoneNumber.length !== 10 || !/^\d+$/.test(phoneNumber)) {
            setPhoneError("Please enter a valid mobile number.");
            return;
        }
        setMainloader(true);
        document.querySelector('body').style.overflow = "hidden";
        try {
            await axios.post(`${url}/send-otp`, { phoneNumber });
            setOtpSent(true);
            setError("");
            setPhoneError("");
        } catch (err) {
            setError("Failed to send OTP. Try again.");
        } finally {
            document.querySelector('body').style.overflow = "auto";
            setMainloader(false);
        }
    };

    const verifyOtp = async (otpValue) => {
        setMainloader(true);
        document.querySelector('body').style.overflow = "hidden";
        try {
            // Verify OTP and check user existence
            const { data } = await axios.post(`${url}/verify-otp`, { phoneNumber, otp: otpValue });

            if (data.success) {
                handleLogin(data);
                Navigate("/");
            }
            else {

                Navigate(`/register?mobile=${phoneNumber}`);

            }

        } catch (error) {
            alert(error.response ? error.response.data.error : error.message);
        } finally {
            document.querySelector('body').style.overflow = "auto";
            setMainloader(false);
        }
    };

    const handleOtpChange = (value) => {
        setOtp(value);
        if (value.length === 6) {
            // Automatically verify OTP when 6 digits are entered
            verifyOtp(value);
        }
    };

    const handlePhoneNumberChange = (e) => {
        const input = e.target.value;
        if (/^\d*$/.test(input) && input.length <= 10) {
            setPhoneNumber(input);
            setPhoneError(""); // Clear the error when user starts typing valid input
        }
    };



    return (
        <div className="otp-main">
            <Helmet>
                <title>Login - VHX View</title>
                <meta name="description" content="Log in to your account." />
                <meta name="keywords" content="login, sign in, account" />
                <meta property="og:title" content="Login - VHX View" />
                <meta property="og:description" content="Log in to your account." />
                {/* <meta property="og:url" content="https://your-website.com/login" /> */}
            </Helmet>
            <LoginEmail />
            
            <div className="or-container">
                <hr />
                <h3>OR</h3>
                <hr />
            </div>


            {!otpSent && (
                <>
                    <h1>Login With OTP</h1>
                    <p>Please enter your 10 digit mobile number</p>
                    <div className="mob">
                        <label htmlFor="otp-mobile">Mobile : </label>
                        <input
                            className="otp-mobile"
                            type="tel"
                            maxLength={10}
                            name="otp-mobile"
                            id="otp-mobile"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={handlePhoneNumberChange}
                        />
                        {phoneError && <p className="moberror">{phoneError}</p>}
                    </div>
                    <button className="send-otp" onClick={sendOtp}>Send OTP</button>
                </>
            )}
            {otpSent && (
                <div className="otpbox">
                    <h1>Please enter OTP for verification</h1>
                    <p>Please enter the code sent to Phone Number</p>
                    <p className="phoneedit">{phoneNumber} <PencilLine size={15} className="editicn" onClick={() => Navigate(-1)} strokeWidth={1} /> </p>
                    <OtpInput
                        value={otp}
                        onChange={handleOtpChange} // Trigger verification on change
                        numInputs={6} // Number of OTP digits
                        // Separator between inputs
                        inputStyle={{
                            width: "2rem",
                            height: "2rem",
                            margin: "0.5rem",
                            fontSize: "1rem",
                            borderRadius: "4px",
                            border: "1px solid #ccc",
                        }}
                    />
                    <button className="send-otp" >Verify</button>
                </div>
            )}

            {error && <p >{error}</p>}
        </div>
    );
}

export default OTPForm;
