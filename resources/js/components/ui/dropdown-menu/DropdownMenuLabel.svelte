<script lang="ts">
    import type { Snippet } from 'svelte';
    import { cn } from '@/lib/utils';
    let { class: className = '', children }: { class?: string; children?: Snippet } = $props();
</script>

<div class={cn('px-2 py-1.5 text-sm font-semibold', className)}>
    {@render children?.()}
</div>
