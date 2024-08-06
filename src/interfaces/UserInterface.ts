import type { UserRoleEnum } from '@/enums/UserRoleEnum';

export interface UserInterface {
    id: number
    email: string
    name: string
    role: UserRoleEnum
}
