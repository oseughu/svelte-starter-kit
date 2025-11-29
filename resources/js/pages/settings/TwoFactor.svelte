<script lang="ts">
    import HeadingSmall from '@/components/HeadingSmall.svelte';
    import TwoFactorRecoveryCodes from '@/components/TwoFactorRecoveryCodes.svelte';
    import TwoFactorSetupModal from '@/components/TwoFactorSetupModal.svelte';
    import { Badge } from '@/components/ui/badge';
    import { Button } from '@/components/ui/button';
    import { useTwoFactorAuth } from '@/hooks/use-two-factor-auth.svelte';
    import AppLayout from '@/layouts/AppLayout.svelte';
    import SettingsLayout from '@/layouts/settings/Layout.svelte';
    import { disable, enable, show } from '@/routes/two-factor';
    import type { BreadcrumbItem } from '@/types';
    import { Form } from '@inertiajs/svelte';
    import { ShieldBan, ShieldCheck } from 'lucide-svelte';

    interface Props {
        requiresConfirmation?: boolean;
        twoFactorEnabled?: boolean;
    }

    let { requiresConfirmation = false, twoFactorEnabled = false }: Props = $props();

    const twoFactorAuth = useTwoFactorAuth();
    let showSetupModal = $state(false);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Two-Factor Authentication',
            href: show.url(),
        },
    ];
</script>

<svelte:head>
    <title>Two-Factor Authentication</title>
</svelte:head>

<AppLayout {breadcrumbs}>
    <SettingsLayout>
        <div class="space-y-6">
            <HeadingSmall
                title="Two-Factor Authentication"
                description="Manage your two-factor authentication settings"
            />
            {#if twoFactorEnabled}
                <div class="flex flex-col items-start justify-start space-y-4">
                    <Badge variant="default">Enabled</Badge>
                    <p class="text-muted-foreground">
                        With two-factor authentication enabled, you will
                        be prompted for a secure, random pin during
                        login, which you can retrieve from the
                        TOTP-supported application on your phone.
                    </p>

                    <TwoFactorRecoveryCodes
                        bind:recoveryCodesList={twoFactorAuth.recoveryCodesList}
                        fetchRecoveryCodes={twoFactorAuth.fetchRecoveryCodes}
                        errors={twoFactorAuth.errors}
                    />

                    <div class="relative inline">
                        <Form {...disable.form()}>
                            {#snippet children({ processing }: { processing: boolean })}
                                <Button
                                    variant="destructive"
                                    type="submit"
                                    disabled={processing}
                                >
                                    <ShieldBan class="size-4" />
                                    Disable 2FA
                                </Button>
                            {/snippet}
                        </Form>
                    </div>
                </div>
            {:else}
                <div class="flex flex-col items-start justify-start space-y-4">
                    <Badge variant="destructive">Disabled</Badge>
                    <p class="text-muted-foreground">
                        When you enable two-factor authentication, you
                        will be prompted for a secure pin during login.
                        This pin can be retrieved from a TOTP-supported
                        application on your phone.
                    </p>

                    <div>
                        {#if twoFactorAuth.hasSetupData}
                            <Button onclick={() => (showSetupModal = true)}>
                                <ShieldCheck class="size-4" />
                                Continue Setup
                            </Button>
                        {:else}
                            <Form
                                {...enable.form()}
                                onSuccess={() => (showSetupModal = true)}
                            >
                                {#snippet children({ processing }: { processing: boolean })}
                                    <Button type="submit" disabled={processing}>
                                        <ShieldCheck class="size-4" />
                                        Enable 2FA
                                    </Button>
                                {/snippet}
                            </Form>
                        {/if}
                    </div>
                </div>
            {/if}

            <TwoFactorSetupModal
                bind:isOpen={showSetupModal}
                onClose={() => (showSetupModal = false)}
                {requiresConfirmation}
                {twoFactorEnabled}
                qrCodeSvg={twoFactorAuth.qrCodeSvg}
                manualSetupKey={twoFactorAuth.manualSetupKey}
                clearSetupData={twoFactorAuth.clearSetupData}
                fetchSetupData={twoFactorAuth.fetchSetupData}
                errors={twoFactorAuth.errors}
            />
        </div>
    </SettingsLayout>
</AppLayout>
