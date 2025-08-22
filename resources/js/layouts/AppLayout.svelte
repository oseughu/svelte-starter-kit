<script lang="ts">
    import AppLayout from '@/layouts/app/AppSidebarLayout.svelte';
    import type { BreadcrumbItemType } from '@/types';
    import type { Snippet } from 'svelte';

    interface Props {
        breadcrumbs?: BreadcrumbItemType[];
        children?: Snippet;
    }

    let { breadcrumbs = [], children }: Props = $props();
</script>

<AppLayout {breadcrumbs}>
    {@render children?.()}
</AppLayout>
