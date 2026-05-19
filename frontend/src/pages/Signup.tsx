import SignupModal from "@/components/signup/SignupModal";
import { useState } from "react";

const Signup = () => {
  const [step, setStep] = useState(1);
  return (
    <div>
      <SignupModal step={step} setStep={setStep} />
    </div>
  );
};

export default Signup;
