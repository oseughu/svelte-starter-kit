<script lang="ts">
    interface Props {
        message?: string;
        class?: string;
    }

    let { message, class: className }: Props = $props();
</script>

{#if message}
    <p class="text-sm text-red-600 dark:text-red-500 {className}">
        {message}
    </p>
{/if}
