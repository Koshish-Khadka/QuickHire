import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useSelector } from "react-redux";
import type { RootState } from "store/store";

const ProfileSetup = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Profile Setup</h2>
      <p className="text-gray-600 mb-6">
        Complete your profile to get better task recommendations and increase
        your chances of getting hired.
      </p>
      <div className="flex gap-4 items-start">
        <div>
          <Avatar className="w-20 h-20 mb-4">
            <AvatarImage
              src="https://github.com/shadcn.png"
              alt="@shadcn"
              className="grayscale "
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <h4 className="text-xl font-bold">Koshish Khadka</h4>
          <p className="text-gray-500 mt-1 text-sm">
            lorea ipsum dolor sit amet Lorem ipsum dolor sit amet consectetur,
            adipisicing elit. Est quisquam quis necessitatibus quasi mollitia
            modi pariatur quibusdam magnam voluptatem odio cum, esse officia,
            veritatis reprehenderit aperiam error earum accusantium sunt.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Joined on January 1, 2024
          </p>

          <p className="text-sm text-gray-500 mt-2">
            Skills: React, Node.js, Python
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="secondary">Available</Badge>
            <Badge variant="secondary">25$</Badge>
          </div>
        </div>
      </div>
      {/* Section for additional profile information or actions */}
      <div className="mt-8 flex gap-4">
        {/* Personal Information */}

        <div className=" w-1/2 p-3">
          <h4 className="text-lg font-semibold">Personal Information</h4>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field className="col-span-2">
              <FieldLabel htmlFor="input-field-username">Full Name</FieldLabel>
              <Input
                id="input-field-username"
                type="text"
                value={user?.firstName + " " + user?.lastName}
                placeholder="Enter your full name"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
              <Input
                id="input-field-username"
                type="text"
                placeholder="Enter your username"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
              <Input
                id="input-field-username"
                type="text"
                placeholder="Enter your username"
              />
            </Field>{" "}
            <Field>
              <FieldLabel htmlFor="input-field-username">Username</FieldLabel>
              <Textarea placeholder="Type your message here." />
            </Field>
          </div>
        </div>
        {/* Additional info */}
        <div className=" flex-1 p-3">
          <h4 className="text-lg font-semibold">Additional Information</h4>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Field className="col-span-2">
              <FieldLabel htmlFor="input-field-email">Skills</FieldLabel>
              <Textarea placeholder="Enter your skills" />
            </Field>
            <Field>
              <FieldLabel htmlFor="input-field-username">
                HOURLY RATE
              </FieldLabel>
              <Input
                id="input-field-username"
                type="number"
                placeholder="$45"
              />
            </Field>
            <RadioGroup defaultValue="comfortable" className="w-fit">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="comfortable" id="r2" />
                <Label htmlFor="r2">available</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="compact" id="r3" />
                <Label htmlFor="r3">not available</Label>
              </div>
            </RadioGroup>
            <Button className="col-span-2 mt-4">Upload</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
