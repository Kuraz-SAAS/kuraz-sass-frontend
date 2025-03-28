import { useForm } from "react-hook-form";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent } from "../../../components/ui/select";
import DashboardLayout from "@/pages/layouts/dashboard/student/DashboardLayouts";

export default function CompleteProfile() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto mt-10 p-6">
        <h2 className="text-2xl font-semibold mb-6">Complete Your Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-3 gap-5">
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
            <Input id="email" type="email" className="w-full" {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" } })} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" type="tel" className="w-full" {...register("phone", { required: "Phone number is required" })} />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
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

          <Button variant="outline" type="submit" className="w-full">Submit</Button>
        </form>
      </div>
    </DashboardLayout>
  );
}
