<script lang="ts">
    import DeleteUser from '@/components/DeleteUser.svelte';
    import HeadingSmall from '@/components/HeadingSmall.svelte';
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import AppLayout from '@/layouts/AppLayout.svelte';
    import SettingsLayout from '@/layouts/settings/Layout.svelte';
    import { type BreadcrumbItem, type User } from '@/types';
    import type { ProfileFormSnippetProps } from '@/types/forms';
    import { Form, page } from '@inertiajs/svelte';
    import { fade } from 'svelte/transition';

    const breadcrumbItems: BreadcrumbItem[] = [
        {
            title: 'Profile settings',
            href: '/settings/profile',
        },
    ];

    const user = $page.props.auth.user as User;
</script>

<svelte:head>
    <title>Profile Settings</title>
</svelte:head>

<AppLayout breadcrumbs={breadcrumbItems}>
    <SettingsLayout>
        <div class="flex flex-col space-y-6">
            <HeadingSmall title="Profile Information" description="Update your name and email address" />

            <Form method="patch" action={route('profile.update')} class="space-y-6">
                {#snippet children({ errors, processing, recentlySuccessful }: ProfileFormSnippetProps)}
                    <div class="grid gap-2">
                        <Label for="name">Name</Label>
                        <Input name="name" defaultValue={user.name} class="mt-1 block w-full" required autocomplete="name" placeholder="Full name" />
                        <InputError class="mt-2" message={errors.name} />
                    </div>

                    <div class="grid gap-2">
                        <Label for="email">Email address</Label>
                        <Input
                            id="email"
                            name="email"
                            defaultValue={user.email}
                            class="mt-1 block w-full"
                            required
                            autocomplete="username"
                            placeholder="Email address"
                            disabled
                        />
                        <InputError class="mt-2" message={errors.email} />
                    </div>

                    <div class="flex items-center gap-4">
                        <Button type="submit" disabled={processing}>Save</Button>

                        {#if recentlySuccessful}
                            <p class="text-sm text-neutral-600" transition:fade={{ duration: 150 }}>Saved.</p>
                        {/if}
                    </div>
                {/snippet}
            </Form>
        </div>

        <DeleteUser />
    </SettingsLayout>
</AppLayout>
