import { defineStore } from 'pinia';
import { isEmpty } from 'lodash';

export const useErrorsStore = defineStore({
    id: 'errors',
    state: () => ({
        errors: {} as any
    }),
    actions: {
        setErrors(data: []) {
            this.errors = data;
        },
        clearError(key: any) {
            delete this.errors[key];
        },
        clearAll() {
            this.errors = {};
        }
    },
    getters: {
        hasError: (state) => !isEmpty(state.errors)
    }
});
