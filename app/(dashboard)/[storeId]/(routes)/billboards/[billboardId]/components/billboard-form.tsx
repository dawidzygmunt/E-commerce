"use client"
import * as z from "zod"
import { Billboard } from "@prisma/client";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
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

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
});

type BillboardFormValues = z.infer<typeof formSchema>;

interface BillboardFormProps {
  ininitalData: Billboard | null;
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  ininitalData
}) => {
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin()

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const title = ininitalData ? "Edit billboard" : "Create billboard";
  const description = ininitalData ? "Edit a billboard" : "Create a billboard";
  const toastMessage = ininitalData ? "Billboard updated" : "Create created";
  const action = ininitalData ? "Save changes" : "Create";
  

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: ininitalData || {
      label: '',
      imageUrl: ''
    }
  });

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data)
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
      await axios.delete(`/api/stores/${params.storeId}`)
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
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
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
      <Separator />
    </>
  )
}