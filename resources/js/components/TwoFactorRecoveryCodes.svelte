<script lang="ts">
    import { Button } from '@/components/ui/button';
    import {
        Card,
        CardContent,
        CardDescription,
        CardHeader,
        CardTitle,
    } from '@/components/ui/card';
    import { regenerateRecoveryCodes } from '@/routes/two-factor';
    import { Form } from '@inertiajs/svelte';
    import { Eye, EyeOff, LockKeyhole, RefreshCw } from 'lucide-svelte';
    import { onMount } from 'svelte';
    import AlertError from './AlertError.svelte';

    interface Props {
        recoveryCodesList: string[];
        fetchRecoveryCodes: () => Promise<void>;
        errors: string[];
    }

    let { recoveryCodesList = $bindable(), fetchRecoveryCodes, errors }: Props = $props();

    let codesAreVisible = $state(false);
    let codesSectionRef = $state<HTMLDivElement | null>(null);

    const canRegenerateCodes = $derived(recoveryCodesList.length > 0 && codesAreVisible);

    async function toggleCodesVisibility() {
        if (!codesAreVisible && !recoveryCodesList.length) {
            await fetchRecoveryCodes();
        }

        codesAreVisible = !codesAreVisible;

        if (codesAreVisible) {
            setTimeout(() => {
                codesSectionRef?.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                });
            });
        }
    }

    onMount(() => {
        if (!recoveryCodesList.length) {
            fetchRecoveryCodes();
        }
    });
</script>

<Card>
    <CardHeader>
        <CardTitle class="flex gap-3">
            <LockKeyhole class="size-4" aria-hidden="true" />
            2FA Recovery Codes
        </CardTitle>
        <CardDescription>
            Recovery codes let you regain access if you lose your 2FA device. Store them in a secure password manager.
        </CardDescription>
    </CardHeader>
    <CardContent>
        <div class="flex flex-col gap-3 select-none sm:flex-row sm:items-center sm:justify-between">
            <Button
                onclick={toggleCodesVisibility}
                class="w-fit"
                aria-expanded={codesAreVisible}
                aria-controls="recovery-codes-section"
            >
                {#if codesAreVisible}
                    <EyeOff class="size-4" aria-hidden="true" />
                {:else}
                    <Eye class="size-4" aria-hidden="true" />
                {/if}
                {codesAreVisible ? 'Hide' : 'View'} Recovery Codes
            </Button>

            {#if canRegenerateCodes}
                <Form
                    {...regenerateRecoveryCodes.form()}
                    options={{ preserveScroll: true }}
                    onSuccess={fetchRecoveryCodes}
                >
                    {#snippet children({ processing }: { processing: boolean })}
                        <Button
                            variant="secondary"
                            type="submit"
                            disabled={processing}
                            aria-describedby="regenerate-warning"
                        >
                            <RefreshCw class="size-4" />
                            Regenerate Codes
                        </Button>
                    {/snippet}
                </Form>
            {/if}
        </div>
        <div
            id="recovery-codes-section"
            class="relative overflow-hidden transition-all duration-300 {codesAreVisible ? 'h-auto opacity-100' : 'h-0 opacity-0'}"
            aria-hidden={!codesAreVisible}
        >
            <div class="mt-3 space-y-3">
                {#if errors?.length}
                    <AlertError {errors} />
                {:else}
                    <div
                        bind:this={codesSectionRef}
                        class="grid gap-1 rounded-lg bg-muted p-4 font-mono text-sm"
                        role="list"
                        aria-label="Recovery codes"
                    >
                        {#if recoveryCodesList.length}
                            {#each recoveryCodesList as code}
                                <div role="listitem" class="select-text">
                                    {code}
                                </div>
                            {/each}
                        {:else}
                            <div class="space-y-2" aria-label="Loading recovery codes">
                                {#each Array.from({ length: 8 }) as _}
                                    <div
                                        class="h-4 animate-pulse rounded bg-muted-foreground/20"
                                        aria-hidden="true"
                                    ></div>
                                {/each}
                            </div>
                        {/if}
                    </div>

                    <div class="text-xs text-muted-foreground select-none">
                        <p id="regenerate-warning">
                            Each recovery code can be used once to access your account and will be removed
                            after use. If you need more, click <span class="font-bold">Regenerate Codes</span> above.
                        </p>
                    </div>
                {/if}
            </div>
        </div>
    </CardContent>
</Card>
