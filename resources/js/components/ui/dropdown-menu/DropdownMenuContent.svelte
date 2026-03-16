<script lang="ts">
    import type { Snippet } from 'svelte';
    import { getContext } from 'svelte';
    import { cn } from '@/lib/utils';
    import { DROPDOWN_MENU_CONTEXT, type DropdownMenuContext } from './context';

    let {
        align = 'start',
        side = 'bottom',
        sideOffset = 0,
        class: className = '',
        children,
    }: {
        align?: 'start' | 'center' | 'end';
        side?: 'top' | 'right' | 'bottom' | 'left';
        sideOffset?: number;
        class?: string;
        children?: Snippet;
    } = $props();

    const { open, setOpen } = getContext<DropdownMenuContext>(DROPDOWN_MENU_CONTEXT);

    const alignClasses: Record<string, string> = {
        start: 'left-0',
        center: 'left-1/2 -translate-x-1/2',
        end: 'right-0',
    };

    const sideClasses: Record<string, string> = {
        bottom: 'top-full',
        top: 'bottom-full',
        left: 'right-full',
        right: 'left-full',
    };

    const close = () => setOpen(false);

    const offsetStyle = () => {
        switch (side) {
            case 'top':
                return `margin-bottom: ${sideOffset}px;`;
            case 'left':
                return `margin-right: ${sideOffset}px;`;
            case 'right':
                return `margin-left: ${sideOffset}px;`;
            default:
                return `margin-top: ${sideOffset}px;`;
        }
    };
</script>

{#if open()}
    <div
        class={cn(
            'absolute z-50 min-w-48 rounded-md border bg-popover p-2 text-popover-foreground shadow-md',
            alignClasses[align] ?? alignClasses.start,
            sideClasses[side] ?? sideClasses.bottom,
            className,
        )}
        style={offsetStyle()}
        role="menu"
        tabindex="-1"
        onkeydown={(event) => event.key === 'Escape' && close()}
    >
        {@render children?.()}
    </div>
{/if}
