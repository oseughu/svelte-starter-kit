<script lang="ts">
    import type { Snippet } from 'svelte';

    let {
        open = $bindable(false),
        disabled = false,
        children,
    }: {
        open?: boolean;
        disabled?: boolean;
        children?: Snippet;
    } = $props();
</script>

<div data-slot="collapsible" data-state={open ? 'open' : 'closed'} data-disabled={disabled || undefined}>
    {@render children?.()}
</div>
