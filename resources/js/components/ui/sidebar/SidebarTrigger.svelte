<script lang="ts">
    import { getContext } from 'svelte';
    import { PanelLeftClose, PanelLeftOpen } from 'lucide-svelte';
    import { Button } from '@/components/ui/button';
    import { cn } from '@/lib/utils';
    import { SIDEBAR_CONTEXT, type SidebarContext } from './context';

    let { class: className = '' } = $props();

    const { isMobile, state, toggleSidebar } = getContext<SidebarContext>(SIDEBAR_CONTEXT);
</script>

<Button
    data-sidebar="trigger"
    data-slot="sidebar-trigger"
    variant="ghost"
    size="icon"
    class={cn('h-7 w-7', className)}
    onclick={toggleSidebar}
>
    {#if $isMobile || $state === 'collapsed'}
        <PanelLeftOpen class="size-4" />
    {:else}
        <PanelLeftClose class="size-4" />
    {/if}
    <span class="sr-only">Toggle sidebar</span>
</Button>
