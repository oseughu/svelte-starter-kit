<script lang="ts">
    import { Form } from '@inertiajs/svelte';
    import AppHead from '@/components/AppHead.svelte';
    import InputError from '@/components/InputError.svelte';
    import PasswordInput from '@/components/PasswordInput.svelte';
    import { Button } from '@/components/ui/button';
    import { Label } from '@/components/ui/label';
    import { Spinner } from '@/components/ui/spinner';
    import AuthLayout from '@/layouts/AuthLayout.svelte';
    import { store } from '@/routes/password/confirm';
</script>

<AppHead title="Confirm password" />

<AuthLayout
    title="Confirm your password"
    description="This is a secure area of the application. Please confirm your password before continuing."
>
    <Form {...store.form()} resetOnSuccess>
        {#snippet children({ errors, processing })}
            <div class="space-y-6">
                <div class="grid gap-2">
                    <Label for="password">Password</Label>
                    <PasswordInput
                        id="password"
                        name="password"
                        class="mt-1 block w-full"
                        required
                        autocomplete="current-password"
                    />
                    <InputError message={errors.password} />
                </div>

                <div class="flex items-center">
                    <Button
                        type="submit"
                        class="w-full"
                        disabled={processing}
                        data-test="confirm-password-button"
                    >
                        {#if processing}<Spinner />{/if}
                        Confirm password
                    </Button>
                </div>
            </div>
        {/snippet}
    </Form>
</AuthLayout>
