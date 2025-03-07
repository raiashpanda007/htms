import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";

interface Member {
  name: string;
  age: number;
}

interface BookingsDialogProps {
  members: Member[];
  id: string;
}

function BookingsDialog({ members, id }: BookingsDialogProps) {
  const [adhaarNumbers, setAdhaarNumbers] = useState<Record<string, string>>({});

  const handleInputChange = (name: string, value: string) => {
    setAdhaarNumbers((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmCheckin = async () => {
    for (const member of members) {
      if (!adhaarNumbers[member.name] || adhaarNumbers[member.name].trim() === "") {
        alert("Please provide Aadhaar number for every member.");
        return;
      }
    }

    const payload = {
      bookingId: id,
      adhaarNumbers,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/hotel/checkin",
        payload,
        { withCredentials: true }
      );
      console.log("Check-in confirmed", response.data);
    } catch (error) {
      console.error("Error during check-in", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="border-none">
        <Button className="w-full h-full cursor-pointer">Web Check-in</Button>
      </DialogTrigger>
      <DialogContent className="bg-black text-white border-gray-700">
        <DialogHeader>
          <DialogTitle>Confirm Web Check-in</DialogTitle>
          <DialogDescription>
            Please enter the Aadhaar number for each member:
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-3">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col gap-2">
              <label className="text-gray-300 font-medium">
                {member.name} (Age: {member.age})
              </label>
              <Input
                type="text"
                placeholder="Enter Aadhaar Number"
                value={adhaarNumbers[member.name] || ""}
                onChange={(e) => handleInputChange(member.name, e.target.value)}
                className="bg-gray-800 text-white border-gray-600"
              />
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            className="bg-green-600 hover:bg-green-500 text-white font-semibold"
            onClick={handleConfirmCheckin}
          >
            Confirm Check-in
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookingsDialog;
