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
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { z } from "zod"


const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters.",
    }),
    description: z.string()
})

const AddTaskForm = ({closeDrawer}) => {
    const form = useForm({
        resolver: zodResolver(formSchema)
    })

    const onSubmit = (data) => {
        closeDrawer();
        const task = axios.post('/api/add_tasks', data);
    };
    return (
        <Form {...form}>
        <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="space-y-8 mt-5">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel className='text-zinc-500'>Title</FormLabel>
                <FormControl>
                    <Input 
                    placeholder="title add karo"
                    className="bg-zinc-900 border-zinc-800 text-zinc-300"
                    {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
                <FormItem>
                <FormLabel className='text-zinc-500'>Description</FormLabel>
                <FormControl>
                    <Input 
                    placeholder="description add karo"
                    className="bg-zinc-900 border-zinc-800 text-zinc-300"
                    {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />

            <Button type="submit" className="m-auto w-full">Submit</Button>
        </form>
        </Form>
    )
}

export default AddTaskForm