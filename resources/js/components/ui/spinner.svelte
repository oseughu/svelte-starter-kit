<script lang="ts">
    import { Loader2 } from 'lucide-svelte';
    import { cn } from '@/lib/utils';

    interface Props {
        class?: string;
    }

    let { class: className, ...props }: Props = $props();
</script>

<Loader2
    role="status"
    aria-label="Loading"
    class={cn('size-4 animate-spin', className)}
    {...props}
/>
