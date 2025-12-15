<script lang="ts">
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import AuthLayout from '@/layouts/AuthLayout.svelte';
    import type { BaseFormSnippetProps } from '@/types/forms';
    import { Form } from '@inertiajs/svelte';
    import { LoaderCircle } from 'lucide-svelte';

    interface Props {
        token: string;
        email: string;
    }

    let { token, email }: Props = $props();
</script>

<svelte:head>
    <title>Reset Password</title>
</svelte:head>

<AuthLayout title="Reset password" description="Please enter your new password below">
    <Form
        method="post"
        action={route('password.store')}
        transform={(data) => ({ ...data, token, email })}
        resetOnSuccess={['password', 'password_confirmation']}
    >
        {#snippet children({ errors, processing }: BaseFormSnippetProps)}
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="email">Email</Label>
                    <Input id="email" type="email" name="email" autocomplete="email" class="mt-1 block w-full" readonly />
                    <InputError message={errors.email} class="mt-2" />
                </div>

                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        autocomplete="new-password"
                        class="mt-1 block w-full"
                        autofocus
                        placeholder="Password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div class="grid gap-2">
                    <Label for="password_confirmation">Confirm Password</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        autocomplete="new-password"
                        class="mt-1 block w-full"
                        placeholder="Confirm password"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <Button type="submit" class="mt-4 w-full" disabled={processing}>
                    {#if processing}
                        <LoaderCircle class="h-4 w-4 animate-spin" />
                    {/if}
                    Reset password
                </Button>
            </div>
        {/snippet}
    </Form>
</AuthLayout>
