"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";
import { createStudent } from "@/lib/api/services/student";

interface StudentRegistrationFormProps {
  initialData?: {
    name: string;
    studentId: string;
  };
  onSuccess: () => void;
  onCancel: () => void;
}

interface StudentFormData {
  studentId: string;
  name: string;
  email: string;
  course: string;
  level: string;
  number: string;
}

const courses = [
  "BSc. Computer Science",
  "BSc. Information Technology",
  "BSc. Business Administration",
  "BSc. Accounting",
  "BSc. Nursing",
  "BSc. Pharmacy",
];

const levels = [
  "Level 100",
  "Level 200",
  "Level 300",
  "Level 400",
  "Level 500",
];

export function StudentRegistrationForm({
  initialData,
  onSuccess,
  onCancel,
}: StudentRegistrationFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<StudentFormData>({
    studentId: initialData?.studentId || "",
    name: initialData?.name || "",
    email: "",
    course: "",
    level: "",
    number: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await createStudent(formData);

      if (response) {
        onSuccess();
      } else {
        setError("Failed to register student. Please try again.");
      }
    } catch (error) {
      console.error("Error registering student:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const updateFormData = (field: keyof StudentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reg-name">Full Name *</Label>
          <Input
            id="reg-name"
            value={formData.name}
            onChange={(e) => updateFormData("name", e.target.value)}
            placeholder="Enter your full name"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-studentId">Student ID *</Label>
          <Input
            id="reg-studentId"
            value={formData.studentId}
            onChange={(e) => updateFormData("studentId", e.target.value)}
            placeholder="Enter your student ID"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-email">Email Address *</Label>
        <Input
          id="reg-email"
          type="email"
          value={formData.email}
          onChange={(e) => updateFormData("email", e.target.value)}
          placeholder="Enter your email address"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="reg-course">Course *</Label>
          <Select
            value={formData.course}
            onValueChange={(value) => updateFormData("course", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your course" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="reg-level">Level *</Label>
          <Select
            value={formData.level}
            onValueChange={(value) => updateFormData("level", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="reg-number">Phone Number *</Label>
        <Input
          id="reg-number"
          type="tel"
          value={formData.number}
          onChange={(e) => updateFormData("number", e.target.value)}
          placeholder="Enter your phone number"
          required
        />
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Register & Continue
        </Button>
      </div>
    </form>
  );
}
