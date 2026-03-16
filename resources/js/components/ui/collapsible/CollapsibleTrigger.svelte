<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        children,
        ...rest
    }: {
        children?: Snippet;
        [key: string]: unknown;
    } = $props();
</script>

<button type="button" data-slot="collapsible-trigger" {...rest}>
    {@render children?.()}
</button>
