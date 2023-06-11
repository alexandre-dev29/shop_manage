import { Account } from "@prisma/client"

export const accountStub = (): Account => {
  return {
    phoneNumber: "+243975344824",
    agentCode: "code",
    agentName: "alexandre",
  }
}
