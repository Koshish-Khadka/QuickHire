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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "../ui/textarea";

const SignupModal = ({
  step,
  setStep,
}: {
  step: number;
  setStep: (step: number) => void;
}) => {
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
        {step === 1 && (
          <>
            <form
              action=""
              className="w-full grid grid-cols-2 mt-8 gap-x-4 space-y-4"
            >
              <Field>
                <FieldLabel htmlFor="input-field-username">
                  First Name
                </FieldLabel>
                <Input
                  id="input-field-username"
                  type="text"
                  placeholder="Koshish"
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
                />
              </Field>
              <Field className="grid col-span-2">
                <FieldLabel htmlFor="input-field-username">
                  I want to:
                </FieldLabel>
                <FieldLabel>
                  <Field orientation="horizontal">
                    <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
                    <FieldContent>
                      <FieldTitle>Find Work</FieldTitle>
                      <FieldDescription>
                        I am looking for jobs.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
                <FieldLabel>
                  <Field orientation="horizontal">
                    <Checkbox id="toggle-checkbox-2" name="toggle-checkbox-2" />
                    <FieldContent>
                      <FieldTitle>Post Work</FieldTitle>
                      <FieldDescription>
                        I want to hire people.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              </Field>
            </form>
            <button
              onClick={() => setStep(2)}
              className=" mt-8 w-full text-sm bg-[#1B7B6F] text-white px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out"
            >
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <form
              action=""
              className="w-full grid grid-cols-2 mt-8 gap-x-4 space-y-4"
            >
              <Field className="grid col-span-2">
                <FieldLabel htmlFor="input-field-username">Email</FieldLabel>
                <Input
                  id="input-field-username"
                  type="text"
                  placeholder="abc@gmail.com"
                />
              </Field>
              <Field className="grid col-span-2">
                <FieldLabel htmlFor="input-field-password">Password</FieldLabel>
                <Input
                  id="input-field-password"
                  type="password"
                  placeholder="••••••••"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="input-field-location">Location</FieldLabel>
                <Input
                  id="input-field-location"
                  type="text"
                  placeholder="New York"
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="input-field-phone">Phone no</FieldLabel>
                <Input
                  id="input-field-phone"
                  type="text"
                  placeholder="123-456-7890"
                />
              </Field>
              <Field className="grid col-span-2">
                <FieldLabel htmlFor="input-field-bio">Bio</FieldLabel>
                <Textarea
                  id="textarea-message"
                  placeholder="Type your message here."
                />
              </Field>
            </form>
            <div className="flex gap-x-2">
              <button
                onClick={() => setStep(1)}
                className="mt-8 w-full text-sm border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out"
              >
                Back
              </button>
              <button className=" mt-8 w-full text-sm bg-[#1B7B6F] text-white px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
                Register
              </button>
            </div>
          </>
        )}

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
