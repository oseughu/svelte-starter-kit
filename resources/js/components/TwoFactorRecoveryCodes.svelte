<script lang="ts">
    import AlertError from '@/components/AlertError.svelte';
    import { Button } from '@/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
    import { createTwoFactorAuth } from '@/lib/two-factor-auth.svelte';
    import { Form } from '@inertiajs/svelte';
    import { Eye, EyeOff, LockKeyhole, RefreshCw } from 'lucide-svelte';
    import { onMount, tick } from 'svelte';

    const twoFactorAuth = createTwoFactorAuth();
    const { fetchRecoveryCodes } = twoFactorAuth;
    let isRecoveryCodesVisible = $state(false);
    let recoveryCodeSection = $state<HTMLDivElement>();

    const toggleRecoveryCodesVisibility = async () => {
        if (!isRecoveryCodesVisible && !twoFactorAuth.recoveryCodesList.length) {
            await fetchRecoveryCodes();
        }

        isRecoveryCodesVisible = !isRecoveryCodesVisible;

        if (isRecoveryCodesVisible) {
            await tick();
            recoveryCodeSection?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    onMount(async () => {
        if (!twoFactorAuth.recoveryCodesList.length) {
            await fetchRecoveryCodes();
        }
    });
</script>

<Card class="w-full">
    <CardHeader>
        <CardTitle class="flex gap-3">
            <LockKeyhole class="size-4" />2FA Recovery Codes
        </CardTitle>
        <CardDescription>Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager.</CardDescription>
    </CardHeader>
    <CardContent>
        <div class="flex select-none flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button onclick={toggleRecoveryCodesVisibility} class="w-fit">
                {#if isRecoveryCodesVisible}
                    <EyeOff class="size-4" />
                {:else}
                    <Eye class="size-4" />
                {/if}
                {isRecoveryCodesVisible ? 'Hide' : 'View'} Recovery Codes
            </Button>

            {#if isRecoveryCodesVisible && twoFactorAuth.recoveryCodesList.length}
                <Form
                    method="post"
                    action={route('two-factor.recovery-codes')}
                    options={{ preserveScroll: true }}
                    onSuccess={() => fetchRecoveryCodes()}
                >
                    {#snippet children({ processing }: { processing: boolean })}
                        <Button variant="secondary" type="submit" disabled={processing}>
                            <RefreshCw class="size-4" /> Regenerate Codes
                        </Button>
                    {/snippet}
                </Form>
            {/if}
        </div>
        <div class="relative overflow-hidden transition-all duration-300 {isRecoveryCodesVisible ? 'h-auto opacity-100' : 'h-0 opacity-0'}">
            {#if twoFactorAuth.errors.length}
                <div class="mt-6">
                    <AlertError errors={twoFactorAuth.errors} />
                </div>
            {:else}
                <div class="mt-3 space-y-3">
                    <div bind:this={recoveryCodeSection} class="grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm">
                        {#if !twoFactorAuth.recoveryCodesList.length}
                            <div class="space-y-2">
                                {#each Array.from({ length: 8 }, (_, i) => i) as index (index)}
                                    <div class="h-4 animate-pulse rounded bg-muted-foreground/20"></div>
                                {/each}
                            </div>
                        {:else}
                            {#each twoFactorAuth.recoveryCodesList as recoveryCode, index (index)}
                                <div>{recoveryCode}</div>
                            {/each}
                        {/if}
                    </div>
                    <p class="select-none text-xs text-muted-foreground">
                        Each recovery code can be used once to access your account and will be removed after use. If you need more, click
                        <span class="font-bold">Regenerate Codes</span> above.
                    </p>
                </div>
            {/if}
        </div>
    </CardContent>
</Card>
