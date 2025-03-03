import { Menubar as MenubarPrimitive } from "bits-ui";
import { cva } from 'class-variance-authority';
import CheckboxItem from "./menubar-checkbox-item.svelte";
import Content from "./menubar-content.svelte";
import GroupHeading from "./menubar-group-heading.svelte";
import Item from "./menubar-item.svelte";
import RadioItem from "./menubar-radio-item.svelte";
import Separator from "./menubar-separator.svelte";
import Shortcut from "./menubar-shortcut.svelte";
import SubContent from "./menubar-sub-content.svelte";
import SubTrigger from "./menubar-sub-trigger.svelte";
import Trigger from "./menubar-trigger.svelte";
import Root from "./menubar.svelte";


const Menu = MenubarPrimitive.Menu;
const Group = MenubarPrimitive.Group;
const Sub = MenubarPrimitive.Sub;
const RadioGroup = MenubarPrimitive.RadioGroup;

export {
    CheckboxItem,
    Content, Group, GroupHeading, Item, Menu,
    //
    Root as Menubar,
    CheckboxItem as MenubarCheckboxItem,
    Content as MenubarContent, Group as MenubarGroup, GroupHeading as MenubarGroupHeading, Item as MenubarItem, Menu as MenubarMenu, RadioGroup as MenubarRadioGroup, RadioItem as MenubarRadioItem,
    Separator as MenubarSeparator,
    Shortcut as MenubarShortcut, Sub as MenubarSub, SubContent as MenubarSubContent,
    SubTrigger as MenubarSubTrigger,
    Trigger as MenubarTrigger, RadioGroup, RadioItem, Root, Separator,
    Shortcut, Sub, SubContent,
    SubTrigger,
    Trigger
};

export const navigationMenuTriggerStyle = cva(
  'group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden disabled:pointer-events-none disabled:opacity-50 data-active:bg-accent/50 data-[state=open]:bg-accent/50',
)
