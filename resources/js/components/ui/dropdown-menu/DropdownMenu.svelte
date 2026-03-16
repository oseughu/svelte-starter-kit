<script lang="ts">
    import type { Snippet } from 'svelte';
    import { onMount, setContext } from 'svelte';
    import { cn } from '@/lib/utils';
    import { DROPDOWN_MENU_CONTEXT, type DropdownMenuContext } from './context';

    let {
        open = $bindable(false),
        class: className = '',
        children,
    }: {
        open?: boolean;
        class?: string;
        children?: Snippet;
    } = $props();
    let menuElement: HTMLDivElement | null = null;

    const context: DropdownMenuContext = {
        open: () => open,
        setOpen: (value: boolean) => {
            open = value;
        },
    };

    setContext(DROPDOWN_MENU_CONTEXT, context);

    onMount(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (!open || !menuElement) return;

            const target = event.target as Node | null;
            if (target && !menuElement.contains(target)) {
                open = false;
            }
        };

        document.addEventListener('pointerdown', handlePointerDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
        };
    });
</script>

<div class={cn('relative', className)} bind:this={menuElement}>
    {@render children?.()}
</div>
