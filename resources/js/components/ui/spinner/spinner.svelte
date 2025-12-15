<script lang="ts">
    import { cn } from '@/lib/utils';
    import { Loader2 } from 'lucide-svelte';

    interface Props {
        class?: string;
    }

    let { class: className }: Props = $props();
</script>

<Loader2 role="status" aria-label="Loading" class={cn('size-4 animate-spin', className)} />
