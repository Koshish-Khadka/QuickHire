import Navbar from "@/components/Navbar";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "store/store";

type FormType = {
  skills: string;
  hourlyRate: number;
  availability: string;
};

const Onboarding = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<FormType>({
    defaultValues: {
      availability: "Full Time",
    },
  });
  const { user } = useSelector((state: RootState) => state.auth);
  // console.log(user);
  const submitForm = useMutation({
    mutationKey: ["onboarding"],
    mutationFn: async (data: FormType) => {
      const res = await api.patch("/workers/onboarding", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Onboard Successful");
      navigate("/");
    },
    onError: (error) => {
      console.log("Mutation error:", error);
      toast.error("Failed to send data");
    },
  });

  const onSubmit = (data: FormType) => {
    // console.log(data);
    submitForm.mutate(data);
  };

  useEffect(() => {
    if (!user || user?.role === "TASKER") {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user?.role === "WORKER" && user.isOnboarded) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="pt-18">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-5xl m-auto px-4 py-6"
        >
          <div className="border-b-2 border-b-gray-600 pb-5">
            <h1 className="text-3xl font-bold">Profile setup</h1>
            <p className="text-sm text-slate-500">
              Keep your profile complete to attract more job offers.
            </p>
          </div>
          {/* Skills */}
          <div className="pt-6 space-y-4 grid grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold">What are your skills?</h2>
              <p className="text-sm text-slate-500">
                Add the services you offer. Clients search by skill, so be
                specific.
              </p>
              <Field className="mt-4">
                <FieldLabel htmlFor="input-field-skills">
                  Your skills
                </FieldLabel>
                <Input
                  id="input-field-skills"
                  type="text"
                  placeholder="e.g.Cleaning,Helper,Labour"
                  {...register("skills", { required: true })}
                />
              </Field>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Set your hourly rate</h2>
              <p className="text-sm text-slate-500">
                You can change this later. Rates in your area typically run
                $20–$50/hr.
              </p>
              <Field className="mt-4">
                <FieldLabel htmlFor="input-field-rate">Hourly rate</FieldLabel>
                <Input
                  id="input-field-rate"
                  type="text"
                  placeholder="25"
                  {...register("hourlyRate", {
                    required: true,
                    valueAsNumber: true,
                  })}
                />
              </Field>
            </div>
            <div className="col-span-2 w-full">
              <FieldLabel htmlFor="input-field-" className="pb-4">
                Availability type:
              </FieldLabel>
              <Field>
                <RadioGroup
                  className="grid grid-cols-2 gap-4 "
                  defaultValue="Full Time"
                  onValueChange={(value) => setValue("availability", value)}
                >
                  <FieldLabel htmlFor="plus-plan">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Full Time</FieldTitle>
                        <FieldDescription>30+ hours per week</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="Full Time" id="Full Time" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="pro-plan">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Part Time</FieldTitle>
                        <FieldDescription>Under 30 hours/week</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="Part Time" id="Part Time" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="pro-plan">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Weekends only</FieldTitle>
                        <FieldDescription>Sat & Sun</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="Weekends" id="Weekends" />
                    </Field>
                  </FieldLabel>
                  <FieldLabel htmlFor="pro-plan">
                    <Field orientation="horizontal">
                      <FieldContent>
                        <FieldTitle>Flexible</FieldTitle>
                        <FieldDescription>Anytime</FieldDescription>
                      </FieldContent>
                      <RadioGroupItem value="Flexible" id="Flexible" />
                    </Field>
                  </FieldLabel>
                </RadioGroup>
              </Field>
            </div>
          </div>
          <div className="w-full flex justify-end  mt-6">
            <button className="text-sm border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
              Publish Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Onboarding;
