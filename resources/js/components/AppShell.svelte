<script lang="ts">
    import { SidebarProvider } from '@/components/ui/sidebar';
    import type { Snippet } from 'svelte';

    interface Props {
        variant?: 'header' | 'sidebar';
        class?: string;
        children?: Snippet;
    }

    let { variant = 'sidebar', class: className, children }: Props = $props();

    let isOpen: boolean = $state(true);

    $effect(() => {
        isOpen = localStorage.getItem('sidebar') !== 'false';
    });

    const handleSidebarChange = (open: boolean) => {
        isOpen = open;
        localStorage.setItem('sidebar', String(open));
    };
</script>

{#if variant === 'header'}
    <div class="flex min-h-screen w-full flex-col {className}">
        {@render children?.()}
    </div>
{:else}
    <SidebarProvider bind:open={isOpen} onOpenChange={handleSidebarChange}>
        {@render children?.()}
    </SidebarProvider>
{/if}
