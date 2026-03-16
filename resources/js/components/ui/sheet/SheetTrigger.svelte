<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getContext } from 'svelte';
    import { SHEET_CONTEXT, type SheetContext } from './context';

    type TriggerProps = {
        onclick?: (event: MouseEvent) => void;
        'aria-expanded'?: boolean;
        [key: string]: unknown;
    };

    let { asChild = false, children }: { asChild?: boolean; children?: Snippet<[TriggerProps]> } = $props();

    const { setOpen, open } = getContext<SheetContext>(SHEET_CONTEXT);

    const handleClick = () => setOpen(!open());
</script>

{#if asChild}
    {@render children?.({ onclick: handleClick, 'aria-expanded': open() })}
{:else}
    <button type="button" onclick={handleClick} aria-expanded={open()}>
        {@render children?.({})}
    </button>
{/if}
