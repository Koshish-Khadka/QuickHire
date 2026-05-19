import {
  Stepper,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { useForm, type SubmitHandler } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../lib/axios";

type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  location: string;
  phoneNumber: string;
  bio: string;
  role: string;
};

const SignupModal = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<Inputs>({
    defaultValues: {
      role: "WORKER",
    },
  });
  const steps = [
    {
      description: "Desc for step one",
      step: 1,
      title: "Step One",
    },
    {
      description: "Desc for step two",
      step: 2,
      title: "Step Two",
    },
    {
      description: "Desc for step three",
      step: 3,
      title: "Step Three",
    },
  ];

  const handleRegister = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await api.post("/auth/signup", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registration successful! Please log in.");

      navigate("/login");
    },
    onError: (error) => {
      toast.error("Registration failed. Please try again.");
      console.log(error);
    },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => handleRegister.mutate(data);

  return (
    <div className="fixed inset-0 bg-black/15 backdrop-blur-md flex justify-center items-center">
      <div className="w-full max-w-96 p-6 bg-white shadow-2xl rounded-md">
        <h2 className="text-2xl font-bold text-center text-[#1B7B6F]">
          QuickHire
        </h2>
        {/* stepper */}
        <div className="w-full space-y-8 text-center mt-8">
          <Stepper defaultValue={2}>
            {steps.map(({ step, title }) => (
              <StepperItem
                className="relative flex-1 flex-col!"
                key={step}
                step={step}
              >
                <StepperTrigger className="flex-col gap-3 rounded">
                  <StepperIndicator />
                  <div className="space-y-0.5 px-2">
                    <StepperTitle>{title}</StepperTitle>
                  </div>
                </StepperTrigger>
                {step < steps.length && (
                  <StepperSeparator className="-order-1 -translate-y-1/2 absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] m-0 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                )}
              </StepperItem>
            ))}
          </Stepper>
        </div>
        <h3 className="text-center mt-8 text-2xl font-semibold ">
          Tell us about you
        </h3>
        <>
          <form
            action=""
            className="w-full grid grid-cols-2 mt-8 gap-x-4 space-y-4"
          >
            {step === 1 && (
              <>
                <Field>
                  <FieldLabel htmlFor="input-field-username">
                    First Name
                  </FieldLabel>
                  <Input
                    id="input-field-username"
                    type="text"
                    placeholder="Koshish"
                    {...register("firstName", { required: true })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="input-field-username">
                    Last Name
                  </FieldLabel>
                  <Input
                    id="input-field-username"
                    type="text"
                    placeholder="Khadka"
                    {...register("lastName", { required: true })}
                  />
                </Field>
                <Field className="grid col-span-2">
                  <FieldLabel htmlFor="input-field-username">
                    I want to:
                  </FieldLabel>
                  <RadioGroup
                    className="max-w-sm"
                    onValueChange={(value) => setValue("role", value)}
                  >
                    <FieldLabel htmlFor="plus-plan">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Find Work</FieldTitle>
                          <FieldDescription>
                            I am looking for a job
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="WORKER" id="WORKER" />
                      </Field>
                    </FieldLabel>
                    <FieldLabel htmlFor="pro-plan">
                      <Field orientation="horizontal">
                        <FieldContent>
                          <FieldTitle>Post Jobs</FieldTitle>
                          <FieldDescription>
                            I want to hire taskers
                          </FieldDescription>
                        </FieldContent>
                        <RadioGroupItem value="TASKER" id="TASKER" />
                      </Field>
                    </FieldLabel>
                  </RadioGroup>
                </Field>
              </>
            )}
            {step === 2 && (
              <>
                <Field className="grid col-span-2">
                  <FieldLabel htmlFor="input-field-username">Email</FieldLabel>
                  <Input
                    id="input-field-username"
                    type="text"
                    placeholder="abc@gmail.com"
                    {...register("email", { required: true })}
                  />
                </Field>
                <Field className="grid col-span-2">
                  <FieldLabel htmlFor="input-field-password">
                    Password
                  </FieldLabel>
                  <Input
                    id="input-field-password"
                    type="password"
                    placeholder="••••••••"
                    {...register("password", { required: true })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="input-field-location">
                    Location
                  </FieldLabel>
                  <Input
                    id="input-field-location"
                    type="text"
                    placeholder="New York"
                    {...register("location", { required: true })}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="input-field-phoneNumber">
                    Phone Number
                  </FieldLabel>
                  <Input
                    id="input-field-phoneNumber"
                    type="text"
                    placeholder="123-456-7890"
                    {...register("phoneNumber", { required: true })}
                  />
                </Field>
                <Field className="grid col-span-2">
                  <FieldLabel htmlFor="input-field-bio">Bio</FieldLabel>
                  <Textarea
                    id="textarea-message"
                    placeholder="Type your message here."
                    {...register("bio", { required: true })}
                  />
                </Field>
              </>
            )}
          </form>
          {step === 1 && (
            <button
              onClick={() => setStep(2)}
              className=" mt-8 w-full text-sm bg-[#1B7B6F] text-white px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out"
            >
              Next
            </button>
          )}
          {step === 2 && (
            <div className="flex gap-x-2">
              <button
                onClick={() => setStep(1)}
                className="mt-8 w-full text-sm border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out"
              >
                Back
              </button>
              <button
                onClick={handleSubmit(onSubmit)}
                className=" mt-8 w-full text-sm bg-[#1B7B6F] text-white px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out"
              >
                {handleRegister.isPending ? "Registering..." : "Register"}
              </button>
            </div>
          )}
        </>

        <a
          href="/login"
          className="text-sm text-slate-600 block text-center mt-4"
        >
          Already have an account?{" "}
          <span className="text-[#1B7B6F] hover:underline">Log in</span>
        </a>
      </div>
    </div>
  );
};

export default SignupModal;
