import React from "react";
import { motion } from "framer-motion";
import { User, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";

interface StudentInfoFormProps {
  formData: Partial<Student>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<Student>>>;
  searchError: string | null;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  studentIdInput: string;
}
const Courses = [
  "BSc. Computer Science",
  "BSc. Information Technology",
  "BSc. Business Administration",
  "BSc. Accounting",
  "BSc. Nursing",
  "BSc. Pharmacy",
];

const Levels = ["Level 100", "Level 200", "Level 300", "Level 400"];
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Student } from "@prisma/client";

export const studentFormSchema = z.object({
  studentId: z.string().min(1, "Student ID is required"),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  course: z.string().min(1, "Course is required"),
  level: z.string().min(1, "Level is required"),
  number: z.string().min(1, "Phone number is required"),
});

export type StudentFormValues = z.infer<typeof studentFormSchema>;

export function StudentInfoForm({
  formData,
  setFormData,
  searchError,
  setStep,
  studentIdInput,
}: StudentInfoFormProps) {
  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentFormSchema),
    defaultValues: {
      studentId: formData?.studentId || studentIdInput || "",
      name: formData?.name || "",
      email: formData?.email || "",
      course: formData?.course || "",
      level: formData?.level || "",
      number: formData?.number || "",
    },
  });

  const onSubmit = (data: StudentFormValues) => {
    setFormData(data);
    setStep(2);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          <div className="mb-8 text-center">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-orange-500"
            >
              <User className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="mb-2 text-3xl font-bold text-gray-800">
              Student Information
            </h3>
            <p className="text-gray-600">
              Please provide your details to continue
            </p>
          </div>

          {searchError && (
            <Alert className="mb-6">
              <AlertCircle className="w-4 h-4" />
              <AlertTitle>Student ID Not Found</AlertTitle>
              <AlertDescription>
                We couldn&apos;t find your student ID in our system. Please fill
                in your details below.
              </AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <motion.div whileFocus={{ scale: 1.02 }}>
              <FormField
                control={form.control}
                name="studentId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Student ID</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <FormField
                control={form.control}
                name="number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a course" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Courses.map((course) => (
                          <SelectItem key={course} value={course}>
                            {course}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>

            <motion.div whileFocus={{ scale: 1.02 }}>
              <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Level</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Levels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </motion.div>
          </div>

          <div className="flex justify-between mt-12">
            <Button
              onClick={() => setStep(1)}
              type="button"
              variant="outline"
              className="px-8 py-3 border-2 border-gray-300 rounded-full hover:bg-gray-50"
            >
              Previous
            </Button>
            <Button
              type="submit"
              disabled={!form.formState.isValid || form.formState.isSubmitting}
              className="px-8 py-3 text-white rounded-full bg-gradient-to-r from-blue-600 to-orange-600 hover:from-blue-700 hover:to-orange-700"
            >
              Next
            </Button>
          </div>
        </motion.div>
      </form>
    </Form>
  );
}
