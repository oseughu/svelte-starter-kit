<script lang="ts">
    import { Form } from '@inertiajs/svelte';
    import ShieldCheck from 'lucide-svelte/icons/shield-check';
    import { onDestroy } from 'svelte';
    import SecurityController from '@/actions/App/Http/Controllers/Settings/SecurityController';
    import AppHead from '@/components/AppHead.svelte';
    import Heading from '@/components/Heading.svelte';
    import InputError from '@/components/InputError.svelte';
    import PasswordInput from '@/components/PasswordInput.svelte';
    import TwoFactorRecoveryCodes from '@/components/TwoFactorRecoveryCodes.svelte';
    import TwoFactorSetupModal from '@/components/TwoFactorSetupModal.svelte';
    import { Button } from '@/components/ui/button';
    import { Label } from '@/components/ui/label';
    import AppLayout from '@/layouts/AppLayout.svelte';
    import SettingsLayout from '@/layouts/settings/Layout.svelte';
    import { twoFactorAuthState } from '@/lib/twoFactorAuth.svelte';
    import { edit } from '@/routes/security';
    import { disable, enable } from '@/routes/two-factor';
    import type { BreadcrumbItem } from '@/types';

    let {
        canManageTwoFactor = false,
        requiresConfirmation = false,
        twoFactorEnabled = false,
    }: {
        canManageTwoFactor?: boolean;
        requiresConfirmation?: boolean;
        twoFactorEnabled?: boolean;
    } = $props();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Security settings',
            href: edit(),
        },
    ];

    const twoFactorAuth = twoFactorAuthState();
    let showSetupModal = $state(false);

    onDestroy(() => twoFactorAuth.clearTwoFactorAuthData());
</script>

<AppHead title="Security settings" />

<AppLayout {breadcrumbs}>
    <h1 class="sr-only">Security settings</h1>

    <SettingsLayout>
        <div class="space-y-6">
            <Heading
                variant="small"
                title="Update password"
                description="Ensure your account is using a long, random password to stay secure"
            />

            <Form
                {...SecurityController.update.form()}
                class="space-y-6"
                options={{ preserveScroll: true }}
                resetOnSuccess
                resetOnError={[
                    'password',
                    'password_confirmation',
                    'current_password',
                ]}
            >
                {#snippet children({ errors, processing, recentlySuccessful })}
                    <div class="grid gap-2">
                        <Label for="current_password">Current password</Label>
                        <PasswordInput
                            id="current_password"
                            name="current_password"
                            class="mt-1 block w-full"
                            autocomplete="current-password"
                            placeholder="Current password"
                        />
                        <InputError message={errors.current_password} />
                    </div>

                    <div class="grid gap-2">
                        <Label for="password">New password</Label>
                        <PasswordInput
                            id="password"
                            name="password"
                            class="mt-1 block w-full"
                            autocomplete="new-password"
                            placeholder="New password"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div class="grid gap-2">
                        <Label for="password_confirmation"
                            >Confirm password</Label
                        >
                        <PasswordInput
                            id="password_confirmation"
                            name="password_confirmation"
                            class="mt-1 block w-full"
                            autocomplete="new-password"
                            placeholder="Confirm password"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div class="flex items-center gap-4">
                        <Button
                            type="submit"
                            disabled={processing}
                            data-test="update-password-button"
                        >
                            Save password
                        </Button>

                        {#if recentlySuccessful}
                            <p class="text-sm text-neutral-600">Saved.</p>
                        {/if}
                    </div>
                {/snippet}
            </Form>
        </div>

        {#if canManageTwoFactor}
            <div class="space-y-6">
                <Heading
                    variant="small"
                    title="Two-factor authentication"
                    description="Manage your two-factor authentication settings"
                />

                {#if !twoFactorEnabled}
                    <div
                        class="flex flex-col items-start justify-start space-y-4"
                    >
                        <p class="text-muted-foreground text-sm">
                            When you enable two-factor authentication, you will
                            be prompted for a secure pin during login. This pin
                            can be retrieved from a TOTP-supported application
                            on your phone.
                        </p>

                        <div>
                            {#if twoFactorAuth.hasSetupData()}
                                <Button onclick={() => (showSetupModal = true)}>
                                    <ShieldCheck class="size-4" />Continue setup
                                </Button>
                            {:else}
                                <Form
                                    {...enable.form()}
                                    onSuccess={() => (showSetupModal = true)}
                                >
                                    {#snippet children({ processing })}
                                        <Button
                                            type="submit"
                                            disabled={processing}
                                        >
                                            Enable 2FA
                                        </Button>
                                    {/snippet}
                                </Form>
                            {/if}
                        </div>
                    </div>
                {:else}
                    <div
                        class="flex flex-col items-start justify-start space-y-4"
                    >
                        <p class="text-muted-foreground text-sm">
                            You will be prompted for a secure, random pin during
                            login, which you can retrieve from the
                            TOTP-supported application on your phone.
                        </p>

                        <div class="relative inline">
                            <Form {...disable.form()}>
                                {#snippet children({ processing })}
                                    <Button
                                        variant="destructive"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Disable 2FA
                                    </Button>
                                {/snippet}
                            </Form>
                        </div>

                        <TwoFactorRecoveryCodes />
                    </div>
                {/if}

                <TwoFactorSetupModal
                    bind:isOpen={showSetupModal}
                    {requiresConfirmation}
                    {twoFactorEnabled}
                />
            </div>
        {/if}
    </SettingsLayout>
</AppLayout>
