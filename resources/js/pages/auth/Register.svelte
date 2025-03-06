<script lang="ts">
    import InputError from '@/components/InputError.svelte';
    import TextLink from '@/components/TextLink.svelte';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import AuthBase from '@/layouts/AuthLayout.svelte';
    import { useForm } from '@inertiajs/svelte';
    import { LoaderCircle } from 'lucide-svelte';

    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: Event) => {
        e.preventDefault();
        $form.post(route('register'), {
            onFinish: () => $form.reset('password', 'password_confirmation'),
        });
    };
</script>

<svelte:head>
    <title>Register</title>
</svelte:head>

<AuthBase title="Create an account" description="Enter your details below to create your account">
    <form onsubmit={submit} class="flex flex-col gap-6">
        <div class="grid gap-6">
            <div class="grid gap-2">
                <Label for="name">Name</Label>
                <Input id="name" type="text" required autofocus tabindex={1} autocomplete="name" bind:value={$form.name} placeholder="Full name" />
                <InputError message={$form.errors.name} />
            </div>

            <div class="grid gap-2">
                <Label for="email">Email address</Label>
                <Input id="email" type="email" required tabindex={2} autocomplete="email" bind:value={$form.email} placeholder="email@example.com" />
                <InputError message={$form.errors.email} />
            </div>

            <div class="grid gap-2">
                <Label for="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    required
                    tabindex={3}
                    autocomplete="new-password"
                    bind:value={$form.password}
                    placeholder="Password"
                />
                <InputError message={$form.errors.password} />
            </div>

            <div class="grid gap-2">
                <Label for="password_confirmation">Confirm password</Label>
                <Input
                    id="password_confirmation"
                    type="password"
                    required
                    tabindex={4}
                    autocomplete="new-password"
                    bind:value={$form.password_confirmation}
                    placeholder="Confirm password"
                />
                <InputError message={$form.errors.password_confirmation} />
            </div>

            <Button type="submit" class="mt-2 w-full" tabindex={5} disabled={$form.processing}>
                {#if $form.processing}
                    <LoaderCircle class="h-4 w-4 animate-spin" />
                {/if}
                Create account
            </Button>
        </div>

        <div class="text-center text-sm text-muted-foreground">
            Already have an account?
            <TextLink href={route('login')} class="underline underline-offset-4" tabindex={6}>Log in</TextLink>
        </div>
    </form>
</AuthBase>
