<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getContext } from 'svelte';
    import { DROPDOWN_MENU_CONTEXT, type DropdownMenuContext } from './context';

    type TriggerProps = {
        onclick?: (event: MouseEvent) => void;
        'aria-expanded'?: boolean;
        'data-state'?: 'open' | 'closed';
        [key: string]: any;
    };

    let {
        asChild = false,
        children,
    }: { asChild?: boolean; children?: Snippet<[TriggerProps]> } = $props();

    const { open, setOpen } = getContext<DropdownMenuContext>(DROPDOWN_MENU_CONTEXT);

    const handleClick = () => setOpen(!open());
</script>

{#if asChild}
    {@render children?.({ onclick: handleClick, 'aria-expanded': open(), 'data-state': open() ? 'open' : 'closed' })}
{:else}
    <button type="button" onclick={handleClick} aria-expanded={open()}>
        {@render children?.({})}
    </button>
{/if}
