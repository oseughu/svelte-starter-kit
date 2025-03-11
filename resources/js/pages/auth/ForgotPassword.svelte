<script lang="ts">
    import InputError from '@/components/InputError.svelte';
    import TextLink from '@/components/TextLink.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import AuthLayout from '@/layouts/AuthLayout.svelte';
    import { useForm } from '@inertiajs/svelte';
    import { LoaderCircle } from 'lucide-svelte';

    interface Props {
        status?: string;
    }

    const form = useForm({
        email: '',
    });

    const submit = (e: Event) => {
        e.preventDefault();
        $form.post(route('password.email'));
    };

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
        <form onsubmit={submit}>
            <div class="grid gap-2">
                <Label for="email">Email address</Label>
                <Input id="email" type="email" name="email" autocomplete="off" bind:value={$form.email} autofocus placeholder="email@example.com" />
                <InputError message={$form.errors.email} />
            </div>

            <div class="my-6 flex items-center justify-start">
                <Button type="submit" class="w-full" disabled={$form.processing}>
                    {#if $form.processing}
                        <LoaderCircle class="h-4 w-4 animate-spin" />
                    {/if}
                    Email password reset link
                </Button>
            </div>
        </form>

        <div class="space-x-1 text-center text-sm text-muted-foreground">
            <span>Or, return to</span>
            <TextLink href={route('login')}>log in</TextLink>
        </div>
    </div>
</AuthLayout>
