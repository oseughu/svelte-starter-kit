<script lang="ts">
    import type { Snippet } from 'svelte';
    import { cn } from '@/lib/utils';

    let {
        class: className = '',
        children,
    }: {
        class?: string;
        children?: Snippet;
    } = $props();
</script>

<div data-slot="card-action" class={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}>
    {@render children?.()}
</div>
