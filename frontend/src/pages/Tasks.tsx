import Navbar from "@/components/Navbar";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Search } from "lucide-react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Taskcard from "@/components/Taskcard";

const Tasks = () => {
  return (
    <div>
      <Navbar />
    
      <div className="pt-18 h-screen flex">
        <div className="w-64 border-r-2 border-r-slate-200 min-h-[calc(100vh-80px)] sticky top-18 p-6 overflow-y-auto">
          <div className="border-b-2 border-b-slate-200 pb-6 mb-4">
            <h3 className="text-sm mb-4 font-semibold text-slate-800">
              CATEGORY
            </h3>
            <RadioGroup
              defaultValue="comfortable"
              className="w-fit space-y-2 text-sm text-gray-700"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="Assembly" id="r1" />
                <Label htmlFor="r1">Assembly</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="Cleaning" id="r2" />
                <Label htmlFor="r2">Cleaning</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="Moving" id="r3" />
                <Label htmlFor="r3">Moving</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="HomeRepairs" id="r3" />
                <Label htmlFor="r3">HomeRepairs</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="Outdoor Help" id="r3" />
                <Label htmlFor="r3">Outdoor Help</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="border-b-2 border-b-slate-200 pb-6 mb-4">
            <h3 className="text-sm mb-4 font-semibold text-slate-800">
              BUDGET RANGE
            </h3>
            <Slider
              defaultValue={[75]}
              max={100}
              step={1}
              className="mx-auto w-full max-w-xs"
            />
          </div>
          <div className="border-b-2 border-b-slate-200 pb-6 mb-4">
            <h3 className="text-sm mb-4 font-semibold text-slate-800">
              URGENCY
            </h3>
            <RadioGroup
              defaultValue="comfortable"
              className="w-fit space-y-2 text-sm text-gray-700"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="high" id="r1" />
                <Label htmlFor="r1">HIGH - ASAP</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="medium" id="r2" />
                <Label htmlFor="r2">MEDIUM - THIS WEEK</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="low" id="r3" />
                <Label htmlFor="r3">LOW - FLEXIBLE</Label>
              </div>
            </RadioGroup>
          </div>

          <button className="w-full text-sm border border-[#1B7B6F] text-[#1B7B6F] px-4 py-2 rounded font-semibold transition-all duration-300 hover:scale-105 hover:ease-in-out">
            Clear all filters
          </button>
        </div>
        <div className="flex-1 p-6 h-[calc(100vh-72px)] overflow-y-auto">
          <div className="flex gap-x-4">
            <div className="flex-1">
              <InputGroup>
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
                <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
              </InputGroup>
            </div>
            <div className="w-38">
              <Select>
                <SelectTrigger className="w-full max-w-48">
                  <SelectValue placeholder="Most relevant" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Most relevant</SelectLabel>
                    <SelectItem value="banana">Newest first</SelectItem>
                    <SelectItem value="blueberry">Highest</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Task Cards */}
          <div className="mt-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <Taskcard key={index} />
            ))}
            {/* <Taskcard /> */}
          </div>
        </div>
      </div>
 
    </div>
  );
};

export default Tasks;
