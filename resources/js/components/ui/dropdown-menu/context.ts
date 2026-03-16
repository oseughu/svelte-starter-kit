export type DropdownMenuContext = {
    open: () => boolean;
    setOpen: (value: boolean) => void;
};

export const DROPDOWN_MENU_CONTEXT = Symbol('dropdown-menu');
