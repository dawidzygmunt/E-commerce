"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import InputField from "./ui/form-field"




const GeneralInforForm = () => {
  const formSchema = z.object({
    firstName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    country: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    city: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
  })
  

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        firstName: "",
        lastName: "",
        country: "",
        city: "",
      },
    })
  
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
      // Do something with the form values.
      // ✅ This will be type-safe and validated.
      console.log(values)
    }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input placeholder="John" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input placeholder="Doe" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="country"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Country</FormLabel>
            <FormControl>
              <Input placeholder="Poland" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <InputField 
        control={form.control}
        name="city"
        label="City"
        placeholder="Kraków"
      />

      <InputField 
        control={form.control}
        name="address"
        label="Address"
        placeholder="e.g. California"
      />

      <InputField 
        control={form.control}
        name="email"
        label="Email"
        placeholder="example@gmail.com"
      />

      <InputField 
        control={form.control}
        name="phoneNumber"
        label="Phone Number"
        placeholder="e.g. +(48) 685 487 455"
      />

      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default GeneralInforForm