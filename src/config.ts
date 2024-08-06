export type ConfigProps = {
    Sidebar_drawer: any;
    Customizer_drawer: boolean;
    mini_sidebar: boolean;
    setHorizontalLayout: boolean;
    setRTLLayout: boolean;
    actTheme: string;
    inputBg: string;
    boxed: boolean;
    setBorderCard: boolean;
    fit_content: boolean;
    menu_item_active: string;
};

const config: ConfigProps = {
    Sidebar_drawer: null,
    Customizer_drawer: false,
    mini_sidebar: false,
    setHorizontalLayout: false, // Horizontal layout
    setRTLLayout: false, // RTL layout
    actTheme: 'BLUE_THEME',
    inputBg: 'BLUE_THEME',
    boxed: true,
    setBorderCard: false,
    fit_content: false,
    menu_item_active: 'bg-primary'
};

export default config;
