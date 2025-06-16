"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, CheckCircle, AlertCircle, User } from "lucide-react";
import { submitIdea } from "@/lib/api/services/ideas";
import { StudentRegistrationForm } from "@/components/idea/student-registration-form";
import { toast } from "sonner";

interface IdeaSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface IdeaFormData {
  title: string;
  description: string;
  category: string;
  studentName: string;
  studentId: string;
}

const categories = [
  "Academic Services",
  "Campus Facilities",
  "Student Activities",
  "Technology",
  "Transportation",
  "Food Services",
  "Health & Wellness",
  "Other",
];

export function IdeaSubmissionDialog({
  open,
  onOpenChange,
}: IdeaSubmissionDialogProps) {
  const [step, setStep] = useState<"idea" | "student-registration" | "success">(
    "idea"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<IdeaFormData>({
    title: "",
    description: "",
    category: "",
    studentName: "",
    studentId: "",
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      studentName: "",
      studentId: "",
    });
    setStep("idea");
    setError(null);
    setLoading(false);
  };

  const handleClose = () => {
    onOpenChange(false);
    setTimeout(resetForm, 300); // Reset after dialog closes
  };

  const handleIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await submitIdea({
        studentId: formData.studentId,
        title: formData.title,
        description: formData.description,
        category: formData.category,
      });

      if (response.success) {
        setStep("success");
        toast.success("Your idea has been submitted successfully!");
      } else {
        if (
          response.error === "Unauthorized" ||
          response.error?.includes("record not found")
        ) {
          setStep("student-registration");
        } else {
          setError(response.error || "Failed to submit idea");
        }
      }
    } catch (error) {
      console.error("Error submitting idea:", error);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleStudentRegistered = () => {
    setStep("idea");
    // Retry idea submission automatically
    handleIdeaSubmit(new Event("submit") as any);
  };

  const updateFormData = (field: keyof IdeaFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            {step === "idea" && (
              <>
                <User className="h-6 w-6 text-orange-500" />
                Share Your Idea
              </>
            )}
            {step === "student-registration" && (
              <>
                <User className="h-6 w-6 text-blue-500" />
                Student Registration Required
              </>
            )}
            {step === "success" && (
              <>
                <CheckCircle className="h-6 w-6 text-green-500" />
                Idea Submitted Successfully
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        {step === "idea" && (
          <form onSubmit={handleIdeaSubmit} className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentName">Your Name *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) =>
                    updateFormData("studentName", e.target.value)
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="studentId">Student ID *</Label>
                <Input
                  id="studentId"
                  value={formData.studentId}
                  onChange={(e) => updateFormData("studentId", e.target.value)}
                  placeholder="Enter your student ID"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Idea Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="Give your idea a clear, descriptive title"
                required
                minLength={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => updateFormData("category", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category for your idea" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Describe your idea in detail. What problem does it solve? How would it benefit students?"
                rows={5}
                required
                minLength={10}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Submit Idea
              </Button>
            </div>
          </form>
        )}

        {step === "student-registration" && (
          <div className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                We need to register you as a student first before you can submit
                ideas. Please fill in your details below.
              </AlertDescription>
            </Alert>

            <StudentRegistrationForm
              initialData={{
                name: formData.studentName,
                studentId: formData.studentId,
              }}
              onSuccess={handleStudentRegistered}
              onCancel={() => setStep("idea")}
            />
          </div>
        )}

        {step === "success" && (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Thank You!</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Your idea &quot;{formData.title}&quot; has been submitted
              successfully. We&apos;ll review it and get back to you soon.
            </p>
            <Button
              onClick={handleClose}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
