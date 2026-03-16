<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getContext } from 'svelte';
    import { DIALOG_CONTEXT, type DialogContext } from './context';

    let { asChild = false, children }: { asChild?: boolean; children?: Snippet<[Record<string, unknown>]> } = $props();

    const { setOpen } = getContext<DialogContext>(DIALOG_CONTEXT);

    const handleClick = () => setOpen(false);
</script>

{#if asChild}
    {@render children?.({ onClick: handleClick })}
{:else}
    <button type="button" onclick={handleClick}>
        {@render children?.({})}
    </button>
{/if}
