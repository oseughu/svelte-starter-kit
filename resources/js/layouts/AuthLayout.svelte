<script lang="ts">
    import type { Snippet } from 'svelte';
    import AuthLayout from '@/layouts/auth/AuthSimpleLayout.svelte';

    let {
        title = '',
        description = '',
        children,
    }: {
        title?: string;
        description?: string;
        children?: Snippet;
    } = $props();
</script>

<AuthLayout {title} {description}>
    {@render children?.()}
</AuthLayout>
