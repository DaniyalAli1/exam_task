"use server"

import prisma from '@/lib/db'
import React from 'react'

export const getLorems = async() => {
    return await prisma.lorem.findMany()
}
