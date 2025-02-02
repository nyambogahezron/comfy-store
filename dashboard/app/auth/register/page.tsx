"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import {
  personalInfoSchema,
  organizationInfoSchema,
  verificationInfoSchema,
  registrationSchema,
} from "@/lib/validations/auth";
import type * as z from "zod";

type Step = "personal" | "organization" | "verification";

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<Step>("personal");
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
  });

  const handleNext = async () => {
    let isValid = false;
    if (currentStep === "personal") {
      isValid = await trigger(["firstName", "lastName", "email", "password"]);
      if (isValid) setCurrentStep("organization");
    } else if (currentStep === "organization") {
      isValid = await trigger(["organizationName", "role", "industry"]);
      if (isValid) setCurrentStep("verification");
    }
  };

  const handleBack = () => {
    if (currentStep === "organization") setCurrentStep("personal");
    else if (currentStep === "verification") setCurrentStep("organization");
  };

  const onSubmit = (data: z.infer<typeof registrationSchema>) => {
    console.log(data);
    // Handle registration logic here
  };

  const renderStep = () => {
    switch (currentStep) {
      case "personal":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  className={errors.firstName ? "border-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  className={errors.lastName ? "border-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password")}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>
        );
      case "organization":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input
                id="organizationName"
                {...register("organizationName")}
                className={errors.organizationName ? "border-red-500" : ""}
              />
              {errors.organizationName && (
                <p className="text-red-500 text-sm mt-1">{errors.organizationName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="role">Your Role</Label>
              <Input
                id="role"
                {...register("role")}
                className={errors.role ? "border-red-500" : ""}
              />
              {errors.role && (
                <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                {...register("industry")}
                className={errors.industry ? "border-red-500" : ""}
              />
              {errors.industry && (
                <p className="text-red-500 text-sm mt-1">{errors.industry.message}</p>
              )}
            </div>
          </div>
        );
      case "verification":
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                className={errors.phone ? "border-red-500" : ""}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                {...register("address")}
                className={errors.address ? "border-red-500" : ""}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-[80%] p-8">
        <div className="text-center mb-8">
          <Building2 className="mx-auto h-12 w-12 text-primary" />
          <h2 className="mt-6 text-3xl font-bold tracking-tight">
            Create your account
          </h2>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div
              className={`h-1 w-1/3 rounded ${
                currentStep === "personal" ? "bg-primary" : "bg-primary/30"
              }`}
            />
            <div
              className={`h-1 w-1/3 rounded mx-2 ${
                currentStep === "organization" ? "bg-primary" : "bg-primary/30"
              }`}
            />
            <div
              className={`h-1 w-1/3 rounded ${
                currentStep === "verification" ? "bg-primary" : "bg-primary/30"
              }`}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span
              className={
                currentStep === "personal" ? "text-primary" : "text-muted-foreground"
              }
            >
              Personal
            </span>
            <span
              className={
                currentStep === "organization"
                  ? "text-primary"
                  : "text-muted-foreground"
              }
            >
              Organization
            </span>
            <span
              className={
                currentStep === "verification"
                  ? "text-primary"
                  : "text-muted-foreground"
              }
            >
              Verify
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderStep()}

          <div className="mt-8 flex justify-between">
            {currentStep !== "personal" && (
              <Button type="button" variant="outline" onClick={handleBack}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            )}
            {currentStep === "verification" ? (
              <Button type="submit" className="ml-auto">
                Complete Registration
              </Button>
            ) : (
              <Button type="button" onClick={handleNext} className="ml-auto">
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/auth/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </Card>
    </div>
  );
}