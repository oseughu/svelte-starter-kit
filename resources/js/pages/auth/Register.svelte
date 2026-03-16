<script lang="ts">
    import { Form } from '@inertiajs/svelte';
    import AppHead from '@/components/AppHead.svelte';
    import InputError from '@/components/InputError.svelte';
    import PasswordInput from '@/components/PasswordInput.svelte';
    import TextLink from '@/components/TextLink.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Spinner } from '@/components/ui/spinner';
    import AuthBase from '@/layouts/AuthLayout.svelte';
    import { login } from '@/routes';
    import { store } from '@/routes/register';
</script>

<AppHead title="Register" />

<AuthBase
    title="Create an account"
    description="Enter your details below to create your account"
>
    <Form
        {...store.form()}
        resetOnSuccess={['password', 'password_confirmation']}
        class="flex flex-col gap-6"
    >
        {#snippet children({ errors, processing })}
            <div class="grid gap-6">
                <div class="grid gap-2">
                    <Label for="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        required
                        autocomplete="name"
                        name="name"
                        placeholder="Full name"
                    />
                    <InputError message={errors.name} />
                </div>

                <div class="grid gap-2">
                    <Label for="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        required
                        autocomplete="email"
                        name="email"
                        placeholder="email@example.com"
                    />
                    <InputError message={errors.email} />
                </div>

                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <PasswordInput
                        id="password"
                        required
                        autocomplete="new-password"
                        name="password"
                        placeholder="Password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div class="grid gap-2">
                    <Label for="password_confirmation">Confirm password</Label>
                    <PasswordInput
                        id="password_confirmation"
                        required
                        autocomplete="new-password"
                        name="password_confirmation"
                        placeholder="Confirm password"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <Button
                    type="submit"
                    class="mt-2 w-full"
                    disabled={processing}
                    data-test="register-user-button"
                >
                    {#if processing}<Spinner />{/if}
                    Create account
                </Button>
            </div>

            <div class="text-center text-sm text-muted-foreground">
                Already have an account?
                <TextLink href={login()} class="underline underline-offset-4">
                    Log in
                </TextLink>
            </div>
        {/snippet}
    </Form>
</AuthBase>
