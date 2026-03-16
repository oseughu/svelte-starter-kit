<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        href = '#',
        class: className = 'inline-flex items-center',
        children,
        ...rest
    }: {
        href?: string;
        class?: string;
        children?: Snippet;
        [key: string]: unknown;
    } = $props();
</script>

<a {href} class={className} {...rest}>
    {@render children?.()}
</a>
