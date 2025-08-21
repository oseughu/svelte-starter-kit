<script lang="ts">
    import HeadingSmall from '@/components/HeadingSmall.svelte';
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import AppLayout from '@/layouts/AppLayout.svelte';
    import SettingsLayout from '@/layouts/settings/Layout.svelte';
    import { type BreadcrumbItem } from '@/types';
    import { Form } from '@inertiajs/svelte';
    import { fade } from 'svelte/transition';

    const breadcrumbItems: BreadcrumbItem[] = [
        {
            title: 'Password settings',
            href: '/settings/password',
        },
    ];

    let passwordInput = $state(null as unknown as HTMLInputElement);
    let currentPasswordInput = $state(null as unknown as HTMLInputElement);
</script>

<svelte:head>
    <title>Password Settings</title>
</svelte:head>

<AppLayout breadcrumbs={breadcrumbItems}>
    <SettingsLayout>
        <div class="space-y-6">
            <HeadingSmall title="Update Password" description="Ensure your account is using a long, random password to stay secure" />

            <Form
                method="put"
                action={route('password.update')}
                options={{ preserveScroll: true }}
                onError={(errors) => {
                    if (errors.password) {
                        passwordInput?.focus();
                    }

                    if (errors.current_password) {
                        currentPasswordInput?.focus();
                    }
                }}
                resetOnSuccess
                resetOnError={['password', 'password_confirmation', 'current_password']}
                class="space-y-6"
            >
                {#snippet children({
                    errors,
                    processing,
                    recentlySuccessful,
                }: {
                    errors: Record<string, string>;
                    processing: boolean;
                    recentlySuccessful: boolean;
                })}
                    <div class="grid gap-2">
                        <Label for="current_password">Current password</Label>
                        <Input
                            ref={currentPasswordInput}
                            name="current_password"
                            type="password"
                            class="mt-1 block w-full"
                            autocomplete="current-password"
                            placeholder="Current password"
                        />

                            <InputError message={errors.current_password} />

                    </div>

                    <div class="grid gap-2">
                        <Label for="password">New password</Label>
                        <Input
                            ref={passwordInput}
                            name="password"
                            type="password"
                            class="mt-1 block w-full"
                            autocomplete="new-password"
                            placeholder="New password"
                        />

                        <InputError message={errors.password} />
                    </div>

                    <div class="grid gap-2">
                        <Label for="password_confirmation">Confirm password</Label>
                        <Input
                            name="password_confirmation"
                            type="password"
                            class="mt-1 block w-full"
                            autocomplete="new-password"
                            placeholder="Confirm password"
                        />

                        <InputError message={errors.password_confirmation} />
                    </div>

                    <div class="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>Save Password</Button>

                        {#if recentlySuccessful}
                            <p class="text-sm text-neutral-600" transition:fade={{ duration: 150 }}>Saved.</p>
                        {/if}
                    </div>
                {/snippet}
            </Form>
        </div>
    </SettingsLayout>
</AppLayout>
