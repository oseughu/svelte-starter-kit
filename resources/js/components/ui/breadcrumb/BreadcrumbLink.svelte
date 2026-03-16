<script lang="ts">
    import type { Snippet } from 'svelte';
    import { cn } from '@/lib/utils';

    let {
        children,
        asChild = false,
        class: className = '',
        ...rest
    }: {
        children?: Snippet<[Record<string, unknown>]>;
        asChild?: boolean;
        class?: string;
        [key: string]: unknown;
    } = $props();

    const classes = () => cn('transition-colors hover:text-foreground', className);
</script>

{#if asChild}
    {@render children?.({ class: classes(), ...rest })}
{:else}
    <a class={classes()} {...rest}>
        {@render children?.({})}
    </a>
{/if}
