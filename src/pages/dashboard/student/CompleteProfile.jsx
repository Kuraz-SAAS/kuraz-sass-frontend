import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent } from "../../../components/ui/select";
import DashboardLayout from "@/pages/layouts/dashboard/student/DashboardLayouts";
import { toast } from "react-toastify";
import Axios from "@/middleware/Axios";

export default function CompleteProfile() {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(true);

  // Fetch student profile data
  useEffect(() => {
    const fetchStudentProfile = async () => {
      try {
        const response = await Axios.get("api/student/profile");
        const student = response.data.student;

        // Populate form fields with fetched data
        reset({
          firstName: student.name.split(" ")[0] || "",
          lastName: student.name.split(" ")[1] || "",
          grandFatherName: student.grand_father_name || "",
          email: student.email || "",
          dateOfBirth: student.date_of_birth || "",
          phone: student.phone || "",
          sex: student.sex || "",
        });

        setLoading(false);
      } catch (error) {
        toast.error("Failed to load profile");
        setLoading(false);
      }
    };

    fetchStudentProfile();
  }, [reset]);

  const onSubmit = async (data) => {
    try {
      const response = await Axios.post("api/student/profile/edit", {
        name: `${data.firstName} ${data.lastName}`,
        grand_father_name: data.grandFatherName,
        email: data.email,
        sex: data.sex,
        city: "Addis Ababa",
        date_of_birth: data.dateOfBirth,
        disabled: false,
      });

      toast.success(response.data.message || "Profile updated successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-semibold mb-6">Complete Your Profile</h2>

        {loading ? (
          <p>Loading profile...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-10">
            <div className="grid grid-cols-3 gap-5">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" className="w-full" {...register("firstName", { required: "First name is required" })} />
                {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
              </div>

              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" className="w-full" {...register("lastName", { required: "Last name is required" })} />
                {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
              </div>

              <div>
                <Label htmlFor="grandFatherName">Grandfather Name</Label>
                <Input id="grandFatherName" className="w-full" {...register("grandFatherName", { required: "Grandfather name is required" })} />
                {errors.grandFatherName && <p className="text-red-500 text-sm">{errors.grandFatherName.message}</p>}
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input disabled id="email" type="email" className="w-full" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" } })} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>

              <div>
                <Label htmlFor="dateOfBirth">Date of Birth</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  className="w-full"
                  {...register("dateOfBirth", { required: "Date of birth is required" })}
                />
                {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>}
              </div>


              <div>
                <Label htmlFor="sex">Sex</Label>
                <Select onValueChange={(value) => setValue("sex", value)} defaultValue="">
                  <SelectTrigger className="w-full">Select Sex</SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sex && <p className="text-red-500 text-sm">{errors.sex.message}</p>}
              </div>
            </div>

            <Button variant="outline" type="submit" className="w-full">Submit</Button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
}
