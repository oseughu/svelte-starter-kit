export type SheetContext = {
    open: () => boolean;
    setOpen: (value: boolean) => void;
};

export const SHEET_CONTEXT = Symbol('sheet');
