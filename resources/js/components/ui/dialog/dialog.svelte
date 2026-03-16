<script lang="ts">
    import type { Snippet } from 'svelte';
    import { setContext } from 'svelte';
    import { DIALOG_CONTEXT, type DialogContext } from './context';

    let { open = $bindable(false), children }: { open?: boolean; children?: Snippet } = $props();

    const context: DialogContext = {
        open: () => open,
        setOpen: (value: boolean) => {
            open = value;
        },
    };

    setContext(DIALOG_CONTEXT, context);
</script>

{@render children?.()}
