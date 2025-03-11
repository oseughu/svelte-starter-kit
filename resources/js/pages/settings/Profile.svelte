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
    import { Link, page, useForm } from '@inertiajs/svelte';
    import { fade } from 'svelte/transition';

    interface Props {
        mustVerifyEmail: boolean;
        status?: string;
    }

    let { mustVerifyEmail, status }: Props = $props();

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Profile settings',
            href: '/settings/profile',
        },
    ];

    const user = $page.props.auth.user as User;

    const form = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e: Event) => {
        e.preventDefault();
        $form.patch(route('profile.update'), {
            preserveScroll: true,
        });
    };
</script>

<svelte:head>
    <title>Profile Settings</title>
</svelte:head>

<AppLayout {breadcrumbs}>
    <SettingsLayout>
        <div class="flex flex-col space-y-6">
            <HeadingSmall title="Profile Information" description="Update your name and email address" />

            <form onsubmit={submit} class="space-y-6">
                <div class="grid gap-2">
                    <Label for="name">Name</Label>
                    <Input id="name" class="mt-1 block w-full" bind:value={$form.name} required autocomplete="name" placeholder="Full name" />
                    <InputError class="mt-2" message={$form.errors.name} />
                </div>

                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        class="mt-1 block w-full"
                        bind:value={$form.email}
                        required
                        autocomplete="username"
                        placeholder="Email address"
                    />
                    <InputError class="mt-2" message={$form.errors.email} />
                </div>

                {#if mustVerifyEmail && !user.email_verified_at}
                    <div>
                        <p class="-mt-4 text-sm text-muted-foreground">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                class="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:!decoration-current dark:decoration-neutral-500"
                            >
                                Click here to resend the verification email.
                            </Link>
                        </p>

                        {#if status === 'verification-link-sent'}
                            <div class="mt-2 text-sm font-medium text-green-600">A new verification link has been sent to your email address.</div>
                        {/if}
                    </div>
                {/if}

                <div class="flex items-center gap-4">
                    <Button type="submit" disabled={$form.processing}>Save</Button>

                    {#if $form.recentlySuccessful}
                        <p class="text-sm text-neutral-600" transition:fade={{ duration: 150 }}>Saved.</p>
                    {/if}
                </div>
            </form>
        </div>

        <DeleteUser />
    </SettingsLayout>
</AppLayout>
