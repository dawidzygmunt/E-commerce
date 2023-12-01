"use client"
import * as z from "zod"
import { Size } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AlertModal } from "@/components/modals/alert-modal";
import axiosInstance from "@/axiosconfig";



const formSchema = z.object({
  name: z.string().min(1),
  value: z.string().min(1)
});

type SizeFormValues = z.infer<typeof formSchema>;

interface SizeFormProps {
  ininitalData: Size | null;
}




export const SizeForm: React.FC<SizeFormProps> = ({
  ininitalData
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = ininitalData ? "Edit size" : "Create size";
  const description = ininitalData ? "Edit a size" : "Create a size";
  const toastMessage = ininitalData ? "Size updated" : "Size created";
  const action = ininitalData ? "Save changes" : "Create";


  const form = useForm<SizeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: ininitalData || {
      name: '',
      value: ''
    }
  });

  const onSubmit = async (data: SizeFormValues) => {
    try {
      setLoading(true);
      if (ininitalData) {
        await axiosInstance.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
      } else {
        await axiosInstance.post(`/api/${params.storeId}/sizes`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/sizes`)
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Somethink went wrong")
    } finally {
      setLoading(false)
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true)
      await axiosInstance.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
      router.refresh()
      router.push(`/${params.storeId}/sizes`)
      toast.success("Size deleted")
    } catch (error) {
      console.log(error);
      
      toast.error("Make sure you removed all products using this size first");
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex flex-items justify-between">
        <Heading
          title={title}
          description={description}
        />
        {ininitalData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => { setOpen(true) }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Size name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Size value" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}
