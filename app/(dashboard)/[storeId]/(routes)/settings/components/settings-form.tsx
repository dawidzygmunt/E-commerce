"use client"
import * as z from "zod"
import { Store } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useOrigin } from "@/hooks/use-origin";
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
import { ApiAlert } from "@/components/ui/api-alert";
import axiosInstance from "@/axiosconfig";

interface SettingsFormProps {
  ininitalData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingsFormProps> = ({
  ininitalData
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: ininitalData
  });

  const onSubmit = async (data: SettingsFormValues) => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/api/stores/${params.storeId}`, data)
      router.refresh()
      toast.success("Store updated")
    } catch (error) {
      toast.error("Somethink sent wrong")
    } finally {
      setLoading(false)
    }
  };

  const onDelete = async () => {
    try {
      await axiosInstance.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push('/')
      toast.success("Store deleted")
    } catch (error) {
      toast.error("Make sure you removed all products and categories first");
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
          title="Settings"
          description="Manage store preferances"
        />
        <Button
          disabled={loading}
          variant="destructive"
          size="sm"
          onClick={() => { setOpen(true) }}
        >
          <Trash className="h-4 w-4" />
        </Button>
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
                    <Input disabled={loading} placeholder="Store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert 
        title="NEXT_PUBLIC_API_URL" 
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  )
}
