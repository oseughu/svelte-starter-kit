<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getContext } from 'svelte';
    import { cubicOut } from 'svelte/easing';
    import { fade, fly } from 'svelte/transition';
    import { cn } from '@/lib/utils';
    import {
        SIDEBAR_CONTEXT,
        SIDEBAR_WIDTH_MOBILE,
        type SidebarContext,
    } from './context';

    let {
        side = 'left',
        variant = 'sidebar',
        collapsible = 'offcanvas',
        class: className = '',
        children,
    }: {
        side?: 'left' | 'right';
        variant?: 'sidebar' | 'floating' | 'inset';
        collapsible?: 'offcanvas' | 'icon' | 'none';
        class?: string;
        children?: Snippet;
    } = $props();

    const { isMobile, state, openMobile, setOpenMobile } = getContext<SidebarContext>(SIDEBAR_CONTEXT);
</script>

{#if collapsible === 'none'}
    <div
        data-slot="sidebar"
        class={cn('bg-sidebar text-sidebar-foreground flex h-full w-(--sidebar-width) flex-col', className)}
    >
        {@render children?.()}
    </div>
{:else if $isMobile}
    {#if $openMobile}
        <div class="fixed inset-0 z-50">
            <button
                type="button"
                class="fixed inset-0 bg-black/50"
                aria-label="Close"
                onclick={() => setOpenMobile(false)}
                transition:fade={{ duration: 200 }}
            ></button>
            <div
                data-sidebar="sidebar"
                data-slot="sidebar"
                data-mobile="true"
                class={cn(
                    'fixed inset-y-0 bg-sidebar text-sidebar-foreground h-svh w-(--sidebar-width) p-0',
                    side === 'left' ? 'left-0 border-r' : 'right-0 border-l',
                    className,
                )}
                style={`--sidebar-width: ${SIDEBAR_WIDTH_MOBILE};`}
                transition:fly={{ x: side === 'left' ? -320 : 320, duration: 300, opacity: 1, easing: cubicOut }}
            >
                <div class="flex h-full w-full flex-col">
                    {@render children?.()}
                </div>
            </div>
        </div>
    {/if}
{:else}
    <div
        class="group peer text-sidebar-foreground hidden md:block"
        data-slot="sidebar"
        data-state={$state}
        data-collapsible={$state === 'collapsed' ? collapsible : ''}
        data-variant={variant}
        data-side={side}
    >
        <div
            class={cn(
                'relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear',
                'group-data-[collapsible=offcanvas]:w-0',
                'group-data-[side=right]:rotate-180',
                variant === 'floating' || variant === 'inset'
                    ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4)))]'
                    : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon)',
            )}
        ></div>
        <div
            class={cn(
                'fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex',
                side === 'left'
                    ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]'
                    : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]',
                variant === 'floating' || variant === 'inset'
                    ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+(--spacing(4))+2px)]'
                    : 'group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l',
                className,
            )}
        >
            <div
                data-sidebar="sidebar"
                class="bg-sidebar group-data-[variant=floating]:border-sidebar-border flex h-full w-full flex-col group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:shadow-sm"
            >
                {@render children?.()}
            </div>
        </div>
    </div>
{/if}
