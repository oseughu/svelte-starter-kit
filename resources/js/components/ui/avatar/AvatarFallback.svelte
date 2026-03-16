<script lang="ts">
    import type { Snippet } from 'svelte';
    import { cn } from '@/lib/utils';

    let { class: className = '', children, ...rest }: { class?: string; children?: Snippet } = $props();
</script>

<div
    class={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground',
        className,
    )}
    {...rest}
>
    {@render children?.()}
</div>
