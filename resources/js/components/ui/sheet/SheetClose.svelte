<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getContext } from 'svelte';
    import { SHEET_CONTEXT, type SheetContext } from './context';

    let { asChild = false, children }: { asChild?: boolean; children?: Snippet<[Record<string, unknown>]> } = $props();

    const { setOpen } = getContext<SheetContext>(SHEET_CONTEXT);

    const handleClick = () => setOpen(false);
</script>

{#if asChild}
    {@render children?.({ onClick: handleClick })}
{:else}
    <button type="button" onclick={handleClick}>
        {@render children?.({})}
    </button>
{/if}
