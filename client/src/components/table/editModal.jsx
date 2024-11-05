import React, { useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";

const EditModal = ({ rowData, pageContext, onClose }) => {
  const [formData, setFormData] = useState({ ...rowData });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Effect to reset the form when rowData changes
  useEffect(() => {
    setFormData({ ...rowData });
  }, [rowData]);

  const handleSave = () => {
    // Save logic here (e.g., API call)
    console.log("Saved Data:", formData);
    onClose(); // Close the modal after saving
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit {pageContext}</DialogTitle>
          <DialogDescription>
            Make changes to your {pageContext} here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {pageContext === "bookings" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="joinerName" className="text-right">
                  Joiner Name
                </Label>
                <Input
                  id="joinerName"
                  name="joinerName"
                  value={formData.joinerName}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactNumber" className="text-right">
                  Contact Number
                </Label>
                <Input
                  id="contactNumber"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          {pageContext === "travelAgency" && (
            <>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="agencyName" className="text-right">
                  Agency Name
                </Label>
                <Input
                  id="agencyName"
                  name="agencyName"
                  value={formData.agencyName}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="contactPerson" className="text-right">
                  Contact Person
                </Label>
                <Input
                  id="contactPerson"
                  name="contactPerson"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Input
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="col-span-3"
                />
              </div>
            </>
          )}
          {/* Add more cases for other contexts as needed */}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
