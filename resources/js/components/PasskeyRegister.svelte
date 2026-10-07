<script lang="ts">
    import { usePasskeyRegister } from '@laravel/passkeys/svelte';
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';

    let {
        onSuccess,
    }: {
        onSuccess?: () => void;
    } = $props();

    const getDefaultPasskeyName = () => {
        const ua = navigator.userAgent;

        const browser = [
            { pattern: /Edg|Edge/, name: 'Edge' },
            { pattern: /OPR|Opera|OPiOS/, name: 'Opera' },
            { pattern: /Firefox|FxiOS/, name: 'Firefox' },
            { pattern: /Chrome|CriOS/, name: 'Chrome' },
            { pattern: /Safari/, name: 'Safari' },
        ].find(({ pattern }) => pattern.test(ua))?.name;

        const os = [
            { pattern: /iPhone/, name: 'iPhone' },
            { pattern: /iPad|Macintosh(?=.*Mobile)/, name: 'iPad' },
            { pattern: /Android/, name: 'Android' },
            { pattern: /Mac/, name: 'Mac' },
            { pattern: /Windows/, name: 'Windows' },
        ].find(({ pattern }) => pattern.test(ua))?.name;

        return [browser, os].filter(Boolean).join(' on ') || '';
    };

    let name = $state(getDefaultPasskeyName());
    let showForm = $state(false);
    const passkeyRegister = usePasskeyRegister({
        onSuccess: () => {
            name = '';
            showForm = false;
            onSuccess?.();
        },
    });

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();

        if (!name.trim()) {
            return;
        }

        await passkeyRegister.register(name.trim());
    };

    const handleCancel = () => {
        showForm = false;
        name = '';
    };
</script>

{#if !passkeyRegister.isSupported}
    <div class="text-sm text-muted-foreground">
        Passkeys are not supported in this browser.
    </div>
{:else if !showForm}
    <Button variant="outline" onclick={() => (showForm = true)}>
        Add passkey
    </Button>
{:else}
    <form
        onsubmit={handleSubmit}
        class="space-y-4 rounded-lg border border-border bg-muted/50 p-4"
    >
        <div class="grid gap-2">
            <Label for="passkey-name">Passkey name</Label>
            <Input
                id="passkey-name"
                type="text"
                bind:value={name}
                placeholder="e.g., MacBook Pro, iPhone"
                class="mt-1 block w-full border-foreground/20"
                autofocus
            />
            <p class="text-xs text-muted-foreground">
                A name helps you identify this passkey later.
            </p>
        </div>

        {#if passkeyRegister.error}
            <InputError message={passkeyRegister.error} />
        {/if}

        <div class="flex gap-2">
            <Button
                type="submit"
                disabled={passkeyRegister.isLoading || !name.trim()}
            >
                {passkeyRegister.isLoading
                    ? 'Registering...'
                    : 'Register passkey'}
            </Button>
            <Button type="button" variant="ghost" onclick={handleCancel}>
                Cancel
            </Button>
        </div>
    </form>
{/if}
