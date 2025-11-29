<script lang="ts">
    import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
    import { AlertCircle } from 'lucide-svelte';

    interface Props {
        errors: string[];
        title?: string;
    }

    let { errors, title = 'Something went wrong.' }: Props = $props();
</script>

<Alert variant="destructive">
    <AlertCircle class="h-4 w-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>
        <ul class="list-inside list-disc text-sm">
            {#each Array.from(new Set(errors)) as error, index}
                <li key={index}>{error}</li>
            {/each}
        </ul>
    </AlertDescription>
</Alert>
