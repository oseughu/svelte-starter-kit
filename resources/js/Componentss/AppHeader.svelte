<script lang="ts">
    import AppLogo from '@/components/AppLogo.svelte';
    import AppLogoIcon from '@/components/AppLogoIcon.svelte';
    import Breadcrumbs from '@/components/Breadcrumbs.svelte';
    import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
    import { Button } from '@/components/ui/button';
    import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
    import {
        Menubar as NavigationMenu,
        MenubarItem as NavigationMenuItem,
        MenubarTrigger as NavigationMenuLink,
        MenubarMenu as NavigationMenuList,
        navigationMenuTriggerStyle,
    } from '@/components/ui/menubar';
    import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
    import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
    import UserMenuContent from '@/components/UserMenuContent.svelte';
    import { getInitials } from '@/hooks/useInitials';
    import type { BreadcrumbItem } from '@/types';
    import { Link, page } from '@inertiajs/svelte';
    import { BookOpen, Folder, LayoutGrid, Menu, Search } from 'lucide-svelte';

    interface NavItem {
        title: string;
        href: string;
        icon?: any;
    }

    interface Props {
        breadcrumbs?: BreadcrumbItem[];
    }

    let { breadcrumbs = [] }: Props = $props();

    let user = $derived($page.props.auth.user);

    const isCurrentRoute = $derived((url: string) => $page.url === url);

    const activeItemStyles = $derived((url: string) => (isCurrentRoute(url) ? 'text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100' : ''));

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
            icon: LayoutGrid,
        },
    ];

    const rightNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/oseughu/svelte-starter-kit',
            icon: Folder,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits',
            icon: BookOpen,
        },
    ];
</script>

<div>
    <div class="border-b border-sidebar-border/80">
        <div class="mx-auto flex h-16 items-center px-4 md:max-w-7xl">
            <div class="lg:hidden">
                <Sheet>
                    <SheetTrigger>
                        <Button variant="ghost" size="icon" class="mr-2 h-9 w-9">
                            <Menu class="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" class="w-[300px] p-6">
                        <SheetTitle class="sr-only">Navigation Menu</SheetTitle>
                        <SheetHeader class="flex justify-start text-left">
                            <AppLogoIcon class="size-6 fill-current text-black dark:text-white" />
                        </SheetHeader>
                        <div class="flex h-full flex-1 flex-col justify-between space-y-4 py-6">
                            <nav class="-mx-3 space-y-1">
                                {#each mainNavItems as item (item.title)}
                                    <a
                                        href={item.href}
                                        class="flex items-center gap-x-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent {activeItemStyles(
                                            item.href,
                                        )}"
                                    >
                                        {#if item.icon}
                                            <item.icon class="h-5 w-5" />
                                        {/if}
                                        {item.title}
                                    </a>
                                {/each}
                            </nav>
                            <div class="flex flex-col space-y-4">
                                {#each rightNavItems as item (item.title)}
                                    <Link href={item.href} class="flex items-center space-x-2 text-sm font-medium">
                                        {#if item.icon}
                                            <item.icon class="h-5 w-5" />
                                        {/if}
                                        <span>{item.title}</span>
                                    </Link>
                                {/each}
                            </div>
                        </div>
                    </SheetContent>
                </Sheet>
            </div>

            <Link href={route('dashboard')} class="flex items-center gap-x-2">
                <AppLogo class="hidden h-6 xl:block" />
            </Link>

            <!-- Desktop Menu -->
            <div class="hidden h-full lg:flex lg:flex-1">
                <NavigationMenu class="ml-10 flex h-full items-stretch">
                    <div class="flex h-full items-stretch space-x-2">
                        <NavigationMenuList>
                            {#each mainNavItems as item, index (index)}
                                <NavigationMenuItem class="relative flex h-full items-center">
                                    <a href={item.href}>
                                        <NavigationMenuLink
                                            class="{navigationMenuTriggerStyle()} {activeItemStyles(item.href)} h-9 cursor-pointer px-3"
                                        >
                                            {#if item.icon}
                                                <item.icon class="mr-2 h-4 w-4" />
                                            {/if}
                                            {item.title}
                                        </NavigationMenuLink>
                                    </a>
                                    {#if isCurrentRoute(item.href)}
                                        <div class="absolute bottom-0 left-0 h-0.5 w-full translate-y-px bg-black dark:bg-white"></div>
                                    {/if}
                                </NavigationMenuItem>
                            {/each}
                        </NavigationMenuList>
                    </div></NavigationMenu
                >
            </div>

            <div class="ml-auto flex items-center space-x-2">
                <div class="relative flex items-center space-x-1">
                    <Button variant="ghost" size="icon" class="group h-9 w-9 cursor-pointer">
                        <Search class="size-5 opacity-80 group-hover:opacity-100" />
                    </Button>

                    <div class="hidden space-x-1 lg:flex">
                        {#each rightNavItems as item (item.title)}
                            <TooltipProvider delayDuration={0}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Button variant="ghost" size="icon" class="group h-9 w-9 cursor-pointer">
                                            <a href={item.href} target="_blank" rel="noopener noreferrer">
                                                <span class="sr-only">{item.title}</span>
                                                <item.icon class="size-5 opacity-80 group-hover:opacity-100" />
                                            </a>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        {/each}
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button
                            variant="ghost"
                            size="icon"
                            class="relative size-10 w-auto rounded-full p-1 focus-within:ring-2 focus-within:ring-primary"
                        >
                            <Avatar class="size-8 overflow-hidden rounded-full">
                                {#if user.avatar}
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                {:else}
                                    <AvatarFallback class="rounded-lg bg-neutral-200 font-semibold text-black dark:bg-neutral-700 dark:text-white">
                                        {getInitials(user.name || '')}
                                    </AvatarFallback>
                                {/if}
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" class="w-56">
                        <UserMenuContent {user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </div>

    {#if breadcrumbs.length > 1}
        <div class="flex w-full border-b border-sidebar-border/70">
            <div class="mx-auto flex h-12 w-full items-center justify-start px-4 text-neutral-500 md:max-w-7xl">
                <Breadcrumbs {breadcrumbs} />
            </div>
        </div>
    {/if}
</div>
