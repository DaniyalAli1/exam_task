"use server"

import prisma from "@/lib/db"
import { UserSchema } from "@/schemas/UserSchema"
import { z } from "zod"


export const createUser = async(values: z.infer<typeof UserSchema>) => {
    const user = await prisma.lorem.create({
        data:{
            name: values.name,
            isCompleted: true
        }
    })
}
