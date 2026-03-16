<script lang="ts">
    import type { Snippet } from 'svelte';
    import { setContext } from 'svelte';
    import { SHEET_CONTEXT, type SheetContext } from './context';

    let { open = $bindable(false), children }: { open?: boolean; children?: Snippet } = $props();

    const context: SheetContext = {
        open: () => open,
        setOpen: (value: boolean) => {
            open = value;
        },
    };

    setContext(SHEET_CONTEXT, context);
</script>

{@render children?.()}
