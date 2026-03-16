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

<p data-slot="card-description" class={cn('text-muted-foreground text-sm', className)}>
    {@render children?.()}
</p>
