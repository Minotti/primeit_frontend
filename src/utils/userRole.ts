import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { UserRoleEnum } from '@/enums/UserRoleEnum';

const authStore = useAuthStore()
const { role } = storeToRefs(authStore)

export let isAttendant: boolean = role.value === UserRoleEnum._ATTENDANT
export let isReceptionist: boolean = role.value === UserRoleEnum._RECEPTIONIST
export let isDoctor: boolean = role.value === UserRoleEnum._DOCTOR
