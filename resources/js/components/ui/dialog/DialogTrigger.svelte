<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getContext } from 'svelte';
    import { DIALOG_CONTEXT, type DialogContext } from './context';

    let { asChild = false, children }: { asChild?: boolean; children?: Snippet<[Record<string, unknown>]> } = $props();

    const { setOpen, open } = getContext<DialogContext>(DIALOG_CONTEXT);

    const handleClick = () => setOpen(true);
</script>

{#if asChild}
    {@render children?.({ onClick: handleClick, 'aria-expanded': open() })}
{:else}
    <button type="button" onclick={handleClick} aria-expanded={open()}>
        {@render children?.({})}
    </button>
{/if}
