<script lang="ts">
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import {
        Dialog,
        DialogContent,
        DialogDescription,
        DialogHeader,
        DialogTitle,
    } from '@/components/ui/dialog';
    import {
        InputOTP,
        InputOTPGroup,
        InputOTPSlot,
    } from '@/components/ui/input-otp';
    import { useClipboard } from '@/hooks/use-clipboard.svelte';
    import { OTP_MAX_LENGTH } from '@/hooks/use-two-factor-auth.svelte';
    import { confirm } from '@/routes/two-factor';
    import { Form } from '@inertiajs/svelte';
    import { Check, Copy, ScanLine } from 'lucide-svelte';
    import AlertError from './AlertError.svelte';
    import Spinner from './ui/spinner.svelte';

    interface Props {
        isOpen: boolean;
        onClose: () => void;
        requiresConfirmation: boolean;
        twoFactorEnabled: boolean;
        qrCodeSvg: string | null;
        manualSetupKey: string | null;
        clearSetupData: () => void;
        fetchSetupData: () => Promise<void>;
        errors: string[];
    }

    let {
        isOpen = $bindable(),
        onClose,
        requiresConfirmation,
        twoFactorEnabled,
        qrCodeSvg,
        manualSetupKey,
        clearSetupData,
        fetchSetupData,
        errors,
    }: Props = $props();

    let showVerificationStep = $state(false);
    let code = $state('');

    const clipboard = useClipboard();

    const modalConfig = $derived.by(() => {
        if (twoFactorEnabled) {
            return {
                title: 'Two-Factor Authentication Enabled',
                description:
                    'Two-factor authentication is now enabled. Scan the QR code or enter the setup key in your authenticator app.',
            };
        }

        if (showVerificationStep) {
            return {
                title: 'Verify Authentication Code',
                description: 'Enter the 6-digit code from your authenticator app',
            };
        }

        return {
            title: 'Enable Two-Factor Authentication',
            description:
                'To finish enabling two-factor authentication, scan the QR code or enter the setup key in your authenticator app',
        };
    });

    function handleContinue() {
        if (requiresConfirmation) {
            showVerificationStep = true;
            return;
        }

        clearSetupData();
        onClose();
    }

    function handleBack() {
        showVerificationStep = false;
        code = '';
    }

    function handleClose() {
        showVerificationStep = false;
        code = '';

        if (twoFactorEnabled) {
            clearSetupData();
        }

        onClose();
    }

    function handleOpenChange(open: boolean) {
        if (!open) {
            handleClose();
        }
    }

    function handleFormSuccess() {
        showVerificationStep = false;
        code = '';
        onClose();
    }

    $effect(() => {
        if (isOpen && !qrCodeSvg) {
            fetchSetupData();
        }
    });
</script>

<Dialog bind:open={isOpen} onOpenChange={handleOpenChange}>
    <DialogContent class="sm:max-w-md">
        <DialogHeader class="flex items-center justify-center">
            <div class="mb-3 rounded-full border border-border bg-card p-0.5 shadow-sm">
                <div class="relative overflow-hidden rounded-full border border-border bg-muted p-2.5">
                    <div class="absolute inset-0 grid grid-cols-5 opacity-50">
                        {#each Array.from({ length: 5 }) as _}
                            <div class="border-r border-border last:border-r-0"></div>
                        {/each}
                    </div>
                    <div class="absolute inset-0 grid grid-rows-5 opacity-50">
                        {#each Array.from({ length: 5 }) as _}
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

        <div class="flex flex-col items-center space-y-5">
            {#if requiresConfirmation}
                <Form
                    {...confirm.form()}
                    onSuccess={handleFormSuccess}
                    resetOnError={true}
                    resetOnSuccess={true}
                >
                    {#snippet children({ processing, errors }: { processing: boolean; errors: Record<string, any> })}
                        {#if showVerificationStep}
                            {#key showVerificationStep}
                                <div class="relative w-full space-y-3">
                                    <div class="flex w-full flex-col items-center space-y-3 py-2">
                                        <InputOTP
                                            name="code"
                                            maxLength={OTP_MAX_LENGTH}
                                            bind:value={code}
                                            disabled={processing}
                                            autofocus={showVerificationStep}
                                        >
                                            {#snippet children({ cells })}
                                                <InputOTPGroup>
                                                    {#each cells as cell}
                                                        <InputOTPSlot {cell} />
                                                    {/each}
                                                </InputOTPGroup>
                                            {/snippet}
                                        </InputOTP>
                                        <InputError message={errors?.confirmTwoFactorAuthentication?.code} />
                                    </div>

                                    <div class="flex w-full space-x-5">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            class="flex-1"
                                            onclick={handleBack}
                                            disabled={processing}
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            type="submit"
                                            class="flex-1"
                                            disabled={processing || code.length < OTP_MAX_LENGTH}
                                        >
                                            Confirm
                                        </Button>
                                    </div>
                                </div>
                            {/key}
                        {:else}
                            {#if errors?.length}
                                <AlertError {errors} />
                            {:else}
                                <div class="mx-auto flex max-w-md overflow-hidden">
                                    <div class="mx-auto aspect-square w-64 rounded-lg border border-border">
                                        <div class="z-10 flex h-full w-full items-center justify-center p-5">
                                            {#if qrCodeSvg}
                                                {@html qrCodeSvg}
                                            {:else}
                                                <Spinner />
                                            {/if}
                                        </div>
                                    </div>
                                </div>

                                <div class="flex w-full space-x-5">
                                    <Button class="w-full" type="button" onclick={handleContinue}>
                                        Continue
                                    </Button>
                                </div>

                                <div class="relative flex w-full items-center justify-center">
                                    <div class="absolute inset-0 top-1/2 h-px w-full bg-border"></div>
                                    <span class="relative bg-card px-2 py-1">
                                        or, enter the code manually
                                    </span>
                                </div>

                                <div class="flex w-full space-x-2">
                                    <div class="flex w-full items-stretch overflow-hidden rounded-xl border border-border">
                                        {#if !manualSetupKey}
                                            <div class="flex h-full w-full items-center justify-center bg-muted p-3">
                                                <Spinner />
                                            </div>
                                        {:else}
                                            <input
                                                type="text"
                                                readonly
                                                value={manualSetupKey}
                                                class="h-full w-full bg-background p-3 text-foreground outline-none"
                                            />
                                            <button
                                                type="button"
                                                onclick={() => clipboard.copy(manualSetupKey!)}
                                                class="border-l border-border px-3 hover:bg-muted"
                                            >
                                                {#if clipboard.copiedText === manualSetupKey}
                                                    <Check class="w-4" />
                                                {:else}
                                                    <Copy class="w-4" />
                                                {/if}
                                            </button>
                                        {/if}
                                    </div>
                                </div>
                            {/if}
                        {/if}
                    {/snippet}
                </Form>
            {:else}
                {#if errors?.length}
                    <AlertError {errors} />
                {:else}
                    <div class="mx-auto flex max-w-md overflow-hidden">
                        <div class="mx-auto aspect-square w-64 rounded-lg border border-border">
                            <div class="z-10 flex h-full w-full items-center justify-center p-5">
                                {#if qrCodeSvg}
                                    {@html qrCodeSvg}
                                {:else}
                                    <Spinner />
                                {/if}
                            </div>
                        </div>
                    </div>

                    <div class="flex w-full space-x-5">
                        <Button class="w-full" onclick={handleContinue}>
                            Continue
                        </Button>
                    </div>

                    <div class="relative flex w-full items-center justify-center">
                        <div class="absolute inset-0 top-1/2 h-px w-full bg-border"></div>
                        <span class="relative bg-card px-2 py-1">
                            or, enter the code manually
                        </span>
                    </div>

                    <div class="flex w-full space-x-2">
                        <div class="flex w-full items-stretch overflow-hidden rounded-xl border border-border">
                            {#if !manualSetupKey}
                                <div class="flex h-full w-full items-center justify-center bg-muted p-3">
                                    <Spinner />
                                </div>
                            {:else}
                                <input
                                    type="text"
                                    readonly
                                    value={manualSetupKey}
                                    class="h-full w-full bg-background p-3 text-foreground outline-none"
                                />
                                <button
                                    onclick={() => clipboard.copy(manualSetupKey!)}
                                    class="border-l border-border px-3 hover:bg-muted"
                                >
                                    {#if clipboard.copiedText === manualSetupKey}
                                        <Check class="w-4" />
                                    {:else}
                                        <Copy class="w-4" />
                                    {/if}
                                </button>
                            {/if}
                        </div>
                    </div>
                {/if}
            {/if}
        </div>
    </DialogContent>
</Dialog>
