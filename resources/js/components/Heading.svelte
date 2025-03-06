<script lang="ts">
    interface Props {
        title: string;
        description?: string;
    }

    let { title, description }: Props = $props();
</script>

<div class="mb-8 space-y-0.5">
    <h2 class="text-xl font-semibold tracking-tight">{title}</h2>
    {#if description}
        <p class="text-sm text-muted-foreground">{description}</p>
    {/if}
</div>
