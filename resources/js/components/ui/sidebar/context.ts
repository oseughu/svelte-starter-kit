import type { Readable, Writable } from 'svelte/store';

export type SidebarContext = {
    state: Readable<'expanded' | 'collapsed'>;
    open: Writable<boolean>;
    setOpen: (value: boolean) => void;
    isMobile: Readable<boolean>;
    openMobile: Writable<boolean>;
    setOpenMobile: (value: boolean) => void;
    toggleSidebar: () => void;
};

export const SIDEBAR_COOKIE_NAME = 'sidebar_state';
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = '16rem';
export const SIDEBAR_WIDTH_MOBILE = '18rem';
export const SIDEBAR_WIDTH_ICON = '3rem';
export const SIDEBAR_KEYBOARD_SHORTCUT = 'b';

export const SIDEBAR_CONTEXT = Symbol('sidebar');
