"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Building2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="flex h-screen">
      {/* Form Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <Building2 className="mx-auto h-12 w-12 text-primary" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <div>
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" /> Sign in
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="font-medium text-primary hover:underline"
            >
              Register now
            </Link>
          </p>
        </div>
      </div>

      {/* Image Side */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12">
            <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
            <p className="text-lg text-center mb-8">
              Connect with professionals and grow your network
            </p>
            <Link
              href="/auth/register"
              className="inline-flex items-center justify-center rounded-md bg-white px-8 py-3 text-sm font-medium text-gray-900 hover:bg-gray-100 transition-colors"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}