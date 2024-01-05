

import prisma from "./prisma"



export const getActiveUser = async (session) => {
  if(!session) {
    throw new Error("No session for usercheck provided")
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        username: true,
        email: true,
      }
    })
    return user;
  } catch (error) {
    console.error('Error while aktiv user request', error)
    throw error;
  }
}
