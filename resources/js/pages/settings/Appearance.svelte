<script lang="ts">
    import AppearanceTabs from '@/components/AppearanceTabs.svelte';
    import AppHead from '@/components/AppHead.svelte';
    import Heading from '@/components/Heading.svelte';
    import AppLayout from '@/layouts/AppLayout.svelte';
    import SettingsLayout from '@/layouts/settings/Layout.svelte';
    import { edit as editAppearance } from '@/routes/appearance';
    import type { BreadcrumbItem } from '@/types';

    const breadcrumbItems: BreadcrumbItem[] = [
        {
            title: 'Appearance settings',
            href: editAppearance(),
        },
    ];
</script>

<AppHead title="Appearance settings" />

<AppLayout breadcrumbs={breadcrumbItems}>
    <h1 class="sr-only">Appearance settings</h1>

    <SettingsLayout>
        <div class="space-y-6">
            <Heading
                variant="small"
                title="Appearance settings"
                description="Update your account's appearance settings"
            />
            <AppearanceTabs />
        </div>
    </SettingsLayout>
</AppLayout>
