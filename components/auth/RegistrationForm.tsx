"use client";
import { Role } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUp } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  login: z.string().min(1),
  firstName: z
    .string()
    .min(4, { message: "First Name must be at least 4 characters" })
    .max(50, { message: "First Name must be at most 50 characters" }),
  lastName: z
    .string()
    .min(4, { message: "Last Name must be at least 4 characters" })
    .max(50, { message: "Last Name must be at most 50 characters" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .max(50, { message: "Password must be at most 50 characters" }),
});

export function RegistrationForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      login: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await signUp(
        values.login,
        values.firstName,
        values.lastName,
        Role.USER,
        values.password
      );
      toast.success("Registration successful!");
      router.push("/login");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Registration failed"
      );
      console.error(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-2xl font-bold">User Registration</h1>
            </div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="firstName">First Name</FormLabel>
                      <FormControl>
                        <Input
                          id="firstName"
                          type="text"
                          placeholder="John"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter first name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="lastName">Last Name</FormLabel>
                      <FormControl>
                        <Input
                          id="lastName"
                          type="text"
                          placeholder="Doe"
                          required
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Enter last name.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="login"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="login">Login</FormLabel>
                    <FormControl>
                      <Input
                        id="login"
                        type="text"
                        placeholder="login"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Enter login.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        placeholder="KDSfjern3245"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Create a strong password</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                Continue{" "}
                {form.formState.isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight />
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
