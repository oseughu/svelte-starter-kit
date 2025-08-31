<script lang="ts">
    import PasswordResetLinkController from '@/actions/App/Http/Controllers/Auth/PasswordResetLinkController';
    import InputError from '@/components/InputError.svelte';
    import TextLink from '@/components/TextLink.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import AuthLayout from '@/layouts/AuthLayout.svelte';
    import { login } from '@/routes';
    import { Form } from '@inertiajs/svelte';
    import { LoaderCircle } from 'lucide-svelte';

    interface Props {
        status?: string;
    }

    let { status }: Props = $props();
</script>

<svelte:head>
    <title>Forgot Password</title>
</svelte:head>

<AuthLayout title="Forgot password" description="Enter your email to receive a password reset link">
    {#if status}
        <div class="mb-4 text-center text-sm font-medium text-green-600">
            {status}
        </div>
    {/if}

    <div class="space-y-6">
        <Form {...PasswordResetLinkController.store.form()}>
            {#snippet children({ errors, processing }: { errors: Record<string, string>; processing: boolean })}
                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input id="email" type="email" name="email" autocomplete="off" autofocus placeholder="email@example.com" />
                    <InputError message={errors.email} />
                </div>

                <div class="my-6 flex items-center justify-start">
                    <Button type="submit" class="w-full" disabled={processing}>
                        {#if processing}
                            <LoaderCircle class="h-4 w-4 animate-spin" />
                        {/if}
                        Email password reset link
                    </Button>
                </div>
            {/snippet}
        </Form>

        <div class="space-x-1 text-center text-sm text-muted-foreground">
            <span>Or, return to</span>
            <TextLink href={login()}>log in</TextLink>
        </div>
    </div>
</AuthLayout>
