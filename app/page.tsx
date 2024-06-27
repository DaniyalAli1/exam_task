"use client";
import Image from "next/image";

import { FaRegTrashAlt } from "react-icons/fa";

import React, { useCallback, useEffect, useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserSchema } from "@/schemas/UserSchema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { createUser } from "@/actions/createUser";
import { getLorems } from "@/actions/getLorems";
import { deleteUser } from "@/actions/deleteUser";

export default function Home() {
  const [userInfo, setUserInfo] = useState<any>();

  const router = useRouter()

  useEffect(()=>{
    getLorems().then((data)=>{
      setUserInfo(data)
    })
  }, [userInfo])

  const handleDelete = useCallback((userid: string)=>{
    deleteUser(userid).then(()=>{
      router.refresh      
    })
  }, [])

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof UserSchema>) {
    createUser(values);
  }

  return (
    <main className="min-h-screen bg-[#f7f8bf] ">
      <div className="items-start pt-5 justify-center grid grid-cols-3 gap-8 px-10">
        <div className="bg-[#c0f9d0] rounded-lg p-4">
          <div className="text-center">lorem Ipsum</div>
          <div className="text-center text-5xl font-bold">01</div>
        </div>
        <div className="bg-[#f3c0f8] rounded-lg p-4">
          <div className="text-center">lorem Ipsum</div>
          <div className="text-center text-5xl font-bold">11</div>
        </div>

        <div className="bg-[#f8d8c1] rounded-lg p-4">
          <div className="text-center">lorem Ipsum</div>
          <div className="text-center text-5xl font-bold">52</div>
        </div>
      </div>

      <div className="mt-10 flex justify-center items-center ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row space-x-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="bg-white">
                  <FormControl>
                    <Input placeholder="Enter something here" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="bg-black text-white" type="submit">
              Enter
            </Button>
          </form>
        </Form>
      </div>

      <div className="mt-10 w-full flex flex-wrap justify-center">
        {userInfo?.map((userinfo: any) => {
          return (
            <Card key={userinfo.id} className="bg-white w-1/2 m-2 shadow-lg rounded-lg p-4 border-black">
              <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="text-black">{userinfo.name}</p>
                  <Button className="bg-red-600 rounded-xl">Click Me</Button>
                </div>
                <div className="text-3xl flex justify-end items-center">
                  <FaRegTrashAlt onClick={()=>handleDelete(userinfo.id)}/>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
