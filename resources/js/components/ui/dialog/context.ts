export type DialogContext = {
    open: () => boolean;
    setOpen: (value: boolean) => void;
};

export const DIALOG_CONTEXT = Symbol('dialog');
