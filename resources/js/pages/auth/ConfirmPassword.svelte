<script lang="ts">
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import AuthLayout from '@/layouts/AuthLayout.svelte';
    import { useForm } from '@inertiajs/svelte';
    import { LoaderCircle } from 'lucide-svelte';

    const form = useForm({
        password: '',
    });

    const submit = (e: Event) => {
        e.preventDefault();
        $form.post(route('password.confirm'), {
            onFinish: () => {
                $form.reset();
            },
        });
    };
</script>

<svelte:head>
    <title>Confirm Password</title>
</svelte:head>

<AuthLayout title="Confirm your password" description="This is a secure area of the application. Please confirm your password before continuing.">
    <form onsubmit={submit}>
        <div class="space-y-6">
            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    class="mt-1 block w-full"
                    bind:value={$form.password}
                    required
                    autocomplete="current-password"
                    autofocus
                />

                <InputError message={$form.errors.password} />
            </div>

            <div class="flex items-center">
                <Button type="submit" class="w-full" disabled={$form.processing}>
                    {#if $form.processing}
                        <LoaderCircle class="h-4 w-4 animate-spin" />
                    {/if}
                    Confirm Password
                </Button>
            </div>
        </div>
    </form>
</AuthLayout>
