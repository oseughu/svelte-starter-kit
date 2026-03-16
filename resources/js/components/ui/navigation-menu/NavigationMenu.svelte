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

<nav class={cn('group/navigation-menu relative flex max-w-max flex-1 items-center justify-center', className)}>
    {@render children?.()}
</nav>
