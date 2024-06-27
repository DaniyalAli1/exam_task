"use server"

import prisma from '@/lib/db'
import React from 'react'

export const deleteUser = async(userid: string) => {
    await prisma.lorem.delete({
        where: {id: userid}
    })
}
