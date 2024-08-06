import { CalendarIcon } from 'vue-tabler-icons';

export interface menu {
    header?: string;
    title?: string;
    icon?: any;
    to?: string;
    chip?: string;
    chipBgColor?: string;
    chipColor?: string;
    chipLabel?: boolean;
    chipVariant?: string;
    chipIcon?: string;
    children?: menu[];
    disabled?: boolean;
    type?: string;
    subCaption?: string;
    executable?: string;
    showMenu?: string;
}

const sidebarItem: menu[] = [
    { header: 'Menu' },
    {
        title: 'Marcações',
        icon: CalendarIcon,
        to: 'schedules'
    }
];

export default sidebarItem;
