<script lang="ts">
    import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
    import { CircleAlert } from 'lucide-svelte';

    interface Props {
        errors: string[];
        title?: string;
    }

    let { errors, title = 'Something went wrong.' }: Props = $props();

    const uniqueErrors = $derived([...new Set(errors)]);
</script>

<Alert variant="destructive">
    <CircleAlert class="size-4" />
    <AlertTitle>{title}</AlertTitle>
    <AlertDescription>
        <ul class="list-inside list-disc text-sm">
            {#each uniqueErrors as error, index (index)}
                <li>{error}</li>
            {/each}
        </ul>
    </AlertDescription>
</Alert>
