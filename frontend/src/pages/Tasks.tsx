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
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export type Tasktype = {
  applications?: {
    workerId: string;
    status: string;
  }[];
  budget: number;
  category: string;
  createdAt: string;
  description: string;
  endDate: string;
  location: string;
  id: string;
  status: string;
  startDate: string;
  title: string;
  urgency: string;
  userId: string;
  user: {
    firstName: string;
    lastName: string;
    location: string;
  };
};

const Tasks = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchtext, setSearchText] = useState("");
  const category = searchParams.get("category") || "";
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 4;

  const { data, isLoading, isError } = useQuery<Tasktype[]>({
    queryKey: ["tasks", category, page],
    queryFn: async () => {
      const res = await api.get(`/jobs`, {
        params: { category },
      });
      return res.data.data;
    },
    placeholderData: (previousData) => previousData,
    enabled: !!category, // important
  });

  const SearchResult = data?.filter((element) => {
    const search = searchtext.toLowerCase();
    return (
      element.title.toLowerCase().includes(search) ||
      element.category.toLowerCase().includes(search) ||
      element.user.firstName.toLowerCase().includes(search) ||
      element.location.toLowerCase().includes(search)
    );
  });

  const totalPages = Math.ceil((SearchResult?.length || 0) / ITEMS_PER_PAGE);

  const paginatedTasks = SearchResult?.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handlePageIncrement = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePageDecrement = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isError) {
    return toast.error("Failed to fetch data");
  }
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
              value={category}
              defaultValue="Assembly"
              onValueChange={(value) =>
                setSearchParams({
                  category: value,
                })
              }
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
        <div className="flex-1 p-6 h-[calc(100vh-72px)] max-w-5xl m-auto overflow-y-auto">
          <div className="flex gap-x-4">
            <div className="flex-1">
              <InputGroup>
                <InputGroupInput
                  placeholder="Search..."
                  value={searchtext}
                  onChange={(e) => setSearchText(e.target.value)}
                />
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
          <div className="mt-12 flex flex-col gap-12 ">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <TailSpin
                  visible={true}
                  height="80"
                  width="80"
                  color="#4fa94d"
                  radius="1"
                />
              </div>
            ) : data?.length === 0 ? (
              <p className="text-2xl text-center font-black text-red-700">
                No task found
              </p>
            ) : (
              paginatedTasks?.map((task) => (
                <Link to={`/tasks/${task.id}`} key={task.id}>
                  <Taskcard data={task} />
                </Link>
              ))
            )}
            {/* <Taskcard /> */}
          </div>
        </div>
      </div>
      {/* pagination  */}
      <div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageDecrement();
                }}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  href="#"
                  isActive={page === i + 1}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(i + 1);
                  }}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageIncrement();
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Tasks;
