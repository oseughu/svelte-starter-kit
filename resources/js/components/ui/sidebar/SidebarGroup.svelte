<script lang="ts">
    import type { Snippet } from 'svelte';
    import { cn } from '@/lib/utils';

    let { class: className = '', children }: { class?: string; children?: Snippet } = $props();
</script>

<div data-slot="sidebar-group" data-sidebar="group" class={cn('relative flex w-full min-w-0 flex-col p-2', className)}>
    {@render children?.()}
</div>
