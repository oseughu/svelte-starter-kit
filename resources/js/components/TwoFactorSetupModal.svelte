<script lang="ts">
    import AlertError from '@/components/AlertError.svelte';
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
    import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
    import { Spinner } from '@/components/ui/spinner';
    import { createTwoFactorAuth } from '@/lib/two-factor-auth.svelte';
    import { Form } from '@inertiajs/svelte';
    import { Check, Copy, ScanLine } from 'lucide-svelte';
    import { tick } from 'svelte';

    interface Props {
        isOpen?: boolean;
        requiresConfirmation: boolean;
        twoFactorEnabled: boolean;
    }

    let { isOpen = $bindable(false), requiresConfirmation, twoFactorEnabled }: Props = $props();

    const twoFactorAuth = createTwoFactorAuth();

    let showVerificationStep = $state(false);
    let code = $state('');
    let copied = $state(false);
    let pinInputContainer = $state<HTMLDivElement>();

    const modalConfig = $derived(
        twoFactorEnabled
            ? {
                  title: 'Two-Factor Authentication Enabled',
                  description: 'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
                  buttonText: 'Close',
              }
            : showVerificationStep
              ? {
                    title: 'Verify Authentication Code',
                    description: 'Enter the 6-digit code from your authenticator app',
                    buttonText: 'Continue',
                }
              : {
                    title: 'Enable Two-Factor Authentication',
                    description: 'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
                    buttonText: 'Continue',
                },
    );

    const handleModalNextStep = async () => {
        if (requiresConfirmation) {
            showVerificationStep = true;

            await tick();
            pinInputContainer?.querySelector('input')?.focus();

            return;
        }

        twoFactorAuth.clearSetupData();
        isOpen = false;
    };

    const resetModalState = () => {
        if (twoFactorEnabled) {
            twoFactorAuth.clearSetupData();
        }

        showVerificationStep = false;
        code = '';
    };

    const copyToClipboard = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            copied = true;
            setTimeout(() => (copied = false), 2000);
        } catch {
            // Clipboard API not available
        }
    };

    $effect(() => {
        if (!isOpen) {
            resetModalState();
            return;
        }

        if (!twoFactorAuth.qrCodeSvg) {
            twoFactorAuth.fetchSetupData();
        }
    });
</script>

<Dialog open={isOpen} onOpenChange={(open) => (isOpen = open)}>
    <DialogContent class="sm:max-w-md">
        <DialogHeader class="flex items-center justify-center">
            <div class="mb-3 w-auto rounded-full border border-border bg-card p-0.5 shadow-sm">
                <div class="relative overflow-hidden rounded-full border border-border bg-muted p-2.5">
                    <div class="absolute inset-0 grid grid-cols-5 opacity-50">
                        {#each Array.from({ length: 5 }, (_, i) => i) as index (index)}
                            <div class="border-r border-border last:border-r-0"></div>
                        {/each}
                    </div>
                    <div class="absolute inset-0 grid grid-rows-5 opacity-50">
                        {#each Array.from({ length: 5 }, (_, i) => i) as index (index)}
                            <div class="border-b border-border last:border-b-0"></div>
                        {/each}
                    </div>
                    <ScanLine class="relative z-20 size-6 text-foreground" />
                </div>
            </div>
            <DialogTitle>{modalConfig.title}</DialogTitle>
            <DialogDescription class="text-center">
                {modalConfig.description}
            </DialogDescription>
        </DialogHeader>

        <div class="relative flex w-auto flex-col items-center justify-center space-y-5">
            {#if !showVerificationStep}
                {#if twoFactorAuth.errors.length}
                    <AlertError errors={twoFactorAuth.errors} />
                {:else}
                    <div class="relative mx-auto flex max-w-md items-center overflow-hidden">
                        <div class="relative mx-auto aspect-square w-64 overflow-hidden rounded-lg border border-border">
                            {#if !twoFactorAuth.qrCodeSvg}
                                <div
                                    class="absolute inset-0 z-10 flex aspect-square h-auto w-full animate-pulse items-center justify-center bg-background"
                                >
                                    <Spinner class="size-6" />
                                </div>
                            {:else}
                                <div class="relative z-10 overflow-hidden border p-5">
                                    <div class="aspect-square w-full justify-center rounded-lg bg-white p-2 [&_svg]:size-full">
                                        <!-- eslint-disable-next-line svelte/no-at-html-tags -->
                                        {@html twoFactorAuth.qrCodeSvg}
                                    </div>
                                </div>
                            {/if}
                        </div>
                    </div>

                    <div class="flex w-full items-center space-x-5">
                        <Button class="w-full" onclick={handleModalNextStep}>
                            {modalConfig.buttonText}
                        </Button>
                    </div>

                    <div class="relative flex w-full items-center justify-center">
                        <div class="absolute inset-0 top-1/2 h-px w-full bg-border"></div>
                        <span class="relative bg-card px-2 py-1">or, enter the code manually</span>
                    </div>

                    <div class="flex w-full items-center justify-center space-x-2">
                        <div class="flex w-full items-stretch overflow-hidden rounded-xl border border-border">
                            {#if !twoFactorAuth.manualSetupKey}
                                <div class="flex h-full w-full items-center justify-center bg-muted p-3">
                                    <Spinner />
                                </div>
                            {:else}
                                <input
                                    type="text"
                                    readonly
                                    value={twoFactorAuth.manualSetupKey}
                                    class="h-full w-full bg-background p-3 text-foreground"
                                />
                                <button
                                    onclick={() => copyToClipboard(twoFactorAuth.manualSetupKey || '')}
                                    class="relative block h-auto border-l border-border px-3 hover:bg-muted"
                                >
                                    {#if copied}
                                        <Check class="w-4 text-green-500" />
                                    {:else}
                                        <Copy class="w-4" />
                                    {/if}
                                </button>
                            {/if}
                        </div>
                    </div>
                {/if}
            {:else}
                <Form method="post" action={route('two-factor.confirm')} resetOnError onFinish={() => (code = '')} onSuccess={() => (isOpen = false)}>
                    {#snippet children({ errors: formErrors, processing }: { errors: Record<string, string>; processing: boolean })}
                        <input type="hidden" name="code" value={code} />
                        <div bind:this={pinInputContainer} class="relative w-full space-y-3">
                            <div class="flex w-full flex-col items-center justify-center space-y-3 py-2">
                                <InputOTP bind:value={code} maxlength={6} disabled={processing}>
                                    {#snippet children({ cells })}
                                        <InputOTPGroup>
                                            {#each cells as cell, index (index)}
                                                <InputOTPSlot {cell} />
                                            {/each}
                                        </InputOTPGroup>
                                    {/snippet}
                                </InputOTP>
                                <InputError message={formErrors['confirmTwoFactorAuthentication.code'] || formErrors.code} />
                            </div>

                            <div class="flex w-full items-center space-x-5">
                                <Button
                                    type="button"
                                    variant="outline"
                                    class="w-auto flex-1"
                                    onclick={() => (showVerificationStep = false)}
                                    disabled={processing}
                                >
                                    Back
                                </Button>
                                <Button type="submit" class="w-auto flex-1" disabled={processing || code.length < 6}>Confirm</Button>
                            </div>
                        </div>
                    {/snippet}
                </Form>
            {/if}
        </div>
    </DialogContent>
</Dialog>
