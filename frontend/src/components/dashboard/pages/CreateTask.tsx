import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

type TaskFormData = {
  title: string;
  category: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  budget: string;
  urgency: string;
  latitude: number;
  longitude: number;
};

const CreateTask = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: TaskFormData) => {
    console.log(data);
    // Here you can handle the form submission, e.g., send data to the server
  };
  return (
    <div className="border p-6 rounded-md shadow">
      <h2 className="text-2xl font-semibold mb-4">Post a new task</h2>
      <p className="text-gray-600 mb-6">
        Describe your task and find the right worker quickly.
      </p>
      <div className="mt-8 flex gap-4">
        {/* job details form */}
        <form
          className="grid grid-cols-2 w-full gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Field>
            <FieldLabel htmlFor="input-field-title">Task Title</FieldLabel>
            <Input
              id="input-field-title"
              type="text"
              placeholder="e.g. Garden cleanup needed"
              {...register("title")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-category">Category</FieldLabel>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" {...register("category")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <FieldLabel htmlFor="input-field-description">
              Description
            </FieldLabel>
            <Textarea
              id="input-field-description"
              placeholder="Describe your task in detail..."
              {...register("description")}
            />
          </Field>
          {/* <Field>
            <FieldLabel htmlFor="input-field-skills">
              Required skills
            </FieldLabel>
            <Input
              id="input-field-skills"
              type="text"
              placeholder="e.g. Weeding, lawn mowing etc."
              {...register("skills")}
            />
          </Field> */}
          <Field>
            <FieldLabel htmlFor="input-field-address">Address</FieldLabel>
            <Input
              id="input-field-address"
              type="text"
              placeholder="e.g. 123 Main St, City, State"
              {...register("location")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-start-date">START DATE</FieldLabel>
            <Input
              id="input-field-start-date"
              type="date"
              {...register("startDate")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-end-date">END DATE</FieldLabel>
            <Input
              id="input-field-end-date"
              type="date"
              {...register("endDate")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-address">BUDGET</FieldLabel>
            <Input
              id="input-field-address"
              type="text"
              placeholder="e.g. 123 Main St, City, State"
              {...register("budget")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-category">URGENCY</FieldLabel>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Theme" {...register("urgency")} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-address">latitude</FieldLabel>
            <Input
              id="input-field-address"
              type="number"
              {...register("latitude")}
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="input-field-address">longitude</FieldLabel>
            <Input
              id="input-field-address"
              type="number"
              {...register("longitude")}
            />
          </Field>
          <Button type="submit" className="col-span-2">
            Post Task
          </Button>
        </form>
        {/* Location form */}
      </div>
    </div>
  );
};

export default CreateTask;
