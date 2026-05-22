import SignupModal from "@/components/signup/SignupModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "store/store";

const Signup = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.auth);
  if (user) {
    navigate("/");
  }
  return (
    <div>
      <SignupModal step={step} setStep={setStep} />
    </div>
  );
};

export default Signup;
