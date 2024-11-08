"use client"
import * as z from "zod"
import { Billboard } from "@prisma/client"
import { useForm } from "react-hook-form"
import { Trash } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import axiosInstance from "@/axiosconfig"

import { Heading } from "@/components/ui/heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
import { AlertModal } from "@/components/modals/alert-modal"
import ImageUpload from "@/components/ui/image-upload"
import { Checkbox } from "@/components/ui/checkbox"

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
  showText: z.boolean(),
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  ininitalData: Billboard | null
}

export const BillboardForm: React.FC<BillboardFormProps> = ({
  ininitalData,
}) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = ininitalData ? "Edit billboard" : "Create billboard"
  const description = ininitalData ? "Edit a billboard" : "Create a billboard"
  const toastMessage = ininitalData ? "Billboard updated" : "Billboard created"
  const action = ininitalData ? "Save changes" : "Create"

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: ininitalData || {
      label: "",
      imageUrl: "",
      showText: false,
    },
  })

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true)
      if (ininitalData) {
        await axiosInstance.patch(
          `/api/${params.storeId}/billboards/${params.billboardId}`,
          data
        )
      } else {
        await axiosInstance.post(`/api/${params.storeId}/billboards`, data)
      }
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      router.refresh()
      toast.success(toastMessage)
    } catch (error) {
      toast.error("Something sent wrong")
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axiosInstance.delete(
        `/api/${params.storeId}/billboards/${params.billboardId}`
      )
      router.refresh()
      router.push(`/${params.storeId}/billboards`)
      router.refresh()
      toast.success("Billboard deleted")
    } catch (error) {
      toast.error(
        "Make sure you removed all categories using this billboard first"
      )
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
        <Heading title={title} description={description} />
        {ininitalData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => {
              setOpen(true)
            }}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Background image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    disabled={loading}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Billboard label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="showText"
              render={({ field }) => (
                <FormItem className="flex flex-row space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Show text on billboard</FormLabel>
                    <FormDescription>
                      Should it display the label on the billboard?
                    </FormDescription>
                  </div>
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
