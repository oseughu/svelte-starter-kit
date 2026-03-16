import { cn } from '@/lib/utils';

export { default as NavigationMenu } from './NavigationMenu.svelte';
export { default as NavigationMenuItem } from './NavigationMenuItem.svelte';
export { default as NavigationMenuLink } from './NavigationMenuLink.svelte';
export { default as NavigationMenuList } from './NavigationMenuList.svelte';

export function navigationMenuTriggerStyle(className = '') {
    return cn(
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-accent hover:text-accent-foreground',
        className,
    );
}
