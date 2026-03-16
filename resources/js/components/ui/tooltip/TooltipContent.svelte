<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Tooltip } from 'bits-ui';
    import { cn } from '@/lib/utils';

    let {
        class: className,
        sideOffset = 4,
        children,
        ...restProps
    }: {
        class?: string;
        sideOffset?: number;
        children?: Snippet;
        [key: string]: unknown;
    } = $props();
</script>

<Tooltip.Portal>
    <Tooltip.Content
        {sideOffset}
        class={cn(
            'bg-foreground text-background animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-3 py-1.5 text-xs text-balance',
            className,
        )}
        {...restProps}
    >
        {@render children?.()}
        <Tooltip.Arrow class="fill-foreground" />
    </Tooltip.Content>
</Tooltip.Portal>
