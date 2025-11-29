<script lang="ts">
    import TwoFactorAuthenticatedSessionController from '@/actions/Laravel/Fortify/Http/Controllers/TwoFactorAuthenticatedSessionController';
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
    import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth.svelte';
    import AuthLayout from '@/layouts/AuthLayout.svelte';
    import { Form } from '@inertiajs/svelte';

    let showRecoveryInput = $state(false);
    let code = $state('');

    const authConfigContent = $derived.by(() => {
        if (showRecoveryInput) {
            return {
                title: 'Recovery Code',
                description:
                    'Please confirm access to your account by entering one of your emergency recovery codes.',
                toggleText: 'login using an authentication code',
            };
        }

        return {
            title: 'Authentication Code',
            description:
                'Enter the authentication code provided by your authenticator application.',
            toggleText: 'login using a recovery code',
        };
    });

    function toggleRecoveryMode(clearErrors: () => void) {
        showRecoveryInput = !showRecoveryInput;
        clearErrors();
        code = '';
    }
</script>

<svelte:head>
    <title>Two-Factor Authentication</title>
</svelte:head>

<AuthLayout
    title={authConfigContent.title}
    description={authConfigContent.description}
>
    <div class="space-y-6">
        <Form
            {...TwoFactorAuthenticatedSessionController.store.form()}
            class="space-y-4"
            resetOnError={true}
            resetOnSuccess={!showRecoveryInput}
        >
            {#snippet children({ errors, processing, clearErrors }: {
                errors: Record<string, string>;
                processing: boolean;
                clearErrors: () => void;
            })}
                {#if showRecoveryInput}
                    <Input
                        name="recovery_code"
                        type="text"
                        placeholder="Enter recovery code"
                        autofocus={showRecoveryInput}
                        required
                    />
                    <InputError message={errors.recovery_code} />
                {:else}
                    <div class="flex flex-col items-center justify-center space-y-3 text-center">
                        <div class="flex w-full items-center justify-center">
                            <InputOTP
                                name="code"
                                maxLength={OTP_MAX_LENGTH}
                                bind:value={code}
                                disabled={processing}
                            >
                                {#snippet children({ cells })}
                                    <InputOTPGroup>
                                        {#each cells as cell}
                                            <InputOTPSlot {cell} />
                                        {/each}
                                    </InputOTPGroup>
                                {/snippet}
                            </InputOTP>
                        </div>
                        <InputError message={errors.code} />
                    </div>
                {/if}

                <Button type="submit" class="w-full" disabled={processing}>
                    Continue
                </Button>

                <div class="text-center text-sm text-muted-foreground">
                    <span>or you can </span>
                    <button
                        type="button"
                        class="cursor-pointer text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                        onclick={() => toggleRecoveryMode(clearErrors)}
                    >
                        {authConfigContent.toggleText}
                    </button>
                </div>
            {/snippet}
        </Form>
    </div>
</AuthLayout>
