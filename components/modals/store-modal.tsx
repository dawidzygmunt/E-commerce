"use client";

import * as z from "zod"
import axios from "axios";
import { useForm } from "react-hook-form"
import { useState } from "react";
import toast from "react-hot-toast";

import { signOut } from "next-auth/react"
import { Modal } from "../ui/modal";
import { useStoreModal } from "@/hooks/use-store-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { error } from "console";
import axiosInstance from "@/axiosconfig";



const formSchema = z.object({
  name: z.string().min(1)
})

export const StoreModal = () => {
  const storeModal = useStoreModal();

  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    }
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)

      const response = await axiosInstance.post('/api/stores', values)

      window.location.assign(`/${response.data.id}`)
      console.log("Store created");
      
      
    } catch (error) {
      toast.error("Something went wrong")
      console.log(error);
      
    } finally {
      setLoading(false)
    }
  }


  return (
    <Modal
      title="Create store"
      description="Add a new storage to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >

      <div>
        <div className="space-y-4 py-2 pb-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input 
                      disabled={loading}
                      placeholder="E-Commerce" 
                      {...field} 
                    />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button 
                  disabled={loading}
                  variant="outline" 
                  onClick={storeModal.onClose}>
                    Anuluj
                </Button>
                <Button type="submit" disabled={loading}>Kontynuuj</Button>
              </div>
            </form>
          </Form>
        </div>
      </div>

    </Modal>
  )
}