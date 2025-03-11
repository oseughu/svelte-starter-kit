<script lang="ts">
    import HeadingSmall from '@/components/HeadingSmall.svelte';
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import AppLayout from '@/layouts/AppLayout.svelte';
    import SettingsLayout from '@/layouts/settings/Layout.svelte';
    import { type BreadcrumbItem } from '@/types';
    import { useForm } from '@inertiajs/svelte';
    import { fade } from 'svelte/transition';

    const breadcrumbItems: BreadcrumbItem[] = [
        {
            title: 'Password settings',
            href: '/settings/password',
        },
    ];

    let passwordInput = $state(null as unknown as HTMLInputElement);
    let currentPasswordInput = $state(null as unknown as HTMLInputElement);

    const form = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e: Event) => {
        e.preventDefault();
        $form.put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => $form.reset(),
            onError: (errors: any) => {
                if (errors.password) {
                    $form.reset('password', 'password_confirmation');
                    if (passwordInput) {
                        passwordInput.focus();
                    }
                }

                if (errors.current_password) {
                    $form.reset('current_password');
                    if (currentPasswordInput) {
                        currentPasswordInput.focus();
                    }
                }
            },
        });
    };
</script>

<svelte:head>
    <title>Password Settings</title>
</svelte:head>

<AppLayout breadcrumbs={breadcrumbItems}>
    <SettingsLayout>
        <div class="space-y-6">
            <HeadingSmall title="Update Password" description="Ensure your account is using a long, random password to stay secure" />

            <form onsubmit={updatePassword} class="space-y-6">
                <div class="grid gap-2">
                    <Label for="current_password">Current password</Label>
                    <Input
                        id="current_password"
                        bind:value={$form.current_password}
                        type="password"
                        class="mt-1 block w-full"
                        autocomplete="current-password"
                        placeholder="Current password"
                    />
                    <InputError message={$form.errors.current_password} />
                </div>

                <div class="grid gap-2">
                    <Label for="password">New password</Label>
                    <Input
                        id="password"
                        bind:value={$form.password}
                        type="password"
                        class="mt-1 block w-full"
                        autocomplete="new-password"
                        placeholder="New password"
                    />
                    <InputError message={$form.errors.password} />
                </div>

                <div class="grid gap-2">
                    <Label for="password_confirmation">Confirm password</Label>
                    <Input
                        id="password_confirmation"
                        bind:value={$form.password_confirmation}
                        type="password"
                        class="mt-1 block w-full"
                        autocomplete="new-password"
                        placeholder="Confirm password"
                    />
                    <InputError message={$form.errors.password_confirmation} />
                </div>

                <div class="flex items-center gap-4">
                    <Button type="submit" disabled={$form.processing}>Save Password</Button>

                    {#if $form.recentlySuccessful}
                        <p class="text-sm text-neutral-600" transition:fade={{ duration: 150 }}>Saved.</p>
                    {/if}
                </div>
            </form>
        </div>
    </SettingsLayout>
</AppLayout>
