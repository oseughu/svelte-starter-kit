<script lang="ts">
    import InputError from '@/components/InputError.svelte'
    import TextLink from '@/components/TextLink.svelte'
    import { Button } from '@/components/ui/button'
    import { Checkbox } from '@/components/ui/checkbox'
    import { Input } from '@/components/ui/input'
    import { Label } from '@/components/ui/label'
    import AuthBase from '@/layouts/AuthLayout.svelte'
    import { useForm } from '@inertiajs/svelte'
    import { LoaderCircle } from 'lucide-svelte'

    interface Props {
        status?: string
        canResetPassword: boolean
    }

    const form = useForm({
        email: '',
        password: '',
        remember: false
    })

    let { status, canResetPassword }: Props = $props()

    const submit = (e: Event) => {
        e.preventDefault()
        $form.post(route('login'), {
            onFinish: () => $form.reset('password')
        })
    }
</script>

<svelte:head>
    <title>Login</title>
</svelte:head>

<AuthBase
    title="Log in to your account"
    description="Enter your email and password below to log in"
>
    {#if status}
        <div class="mb-4 text-center text-sm font-medium text-green-600">
            {status}
        </div>
    {/if}

    <form onsubmit={submit} class="flex flex-col gap-6">
        <div class="grid gap-6">
            <div class="grid gap-2">
                <Label for="email">Email address</Label>
                <Input
                    id="email"
                    type="email"
                    required
                    autofocus
                    tabindex={1}
                    autocomplete="email"
                    bind:value={$form.email}
                    placeholder="email@example.com"
                />
                <InputError message={$form.errors.email} />
            </div>

            <div class="grid gap-2">
                <div class="flex items-center justify-between">
                    <Label for="password">Password</Label>
                    {#if canResetPassword}
                        <TextLink href={route('password.request')} class="text-sm" tabindex={5}
                            >Forgot password?</TextLink
                        >
                    {/if}
                </div>
                <Input
                    id="password"
                    type="password"
                    required
                    tabindex={2}
                    autocomplete="current-password"
                    bind:value={$form.password}
                    placeholder="Password"
                />
                <InputError message={$form.errors.password} />
            </div>

            <div class="flex items-center justify-between">
                <Label for="remember" class="flex items-center space-x-3">
                    <Checkbox id="remember" bind:checked={$form.remember} tabindex={3} />
                    <span>Remember me</span>
                </Label>
            </div>

            <Button type="submit" class="mt-4 w-full" tabindex={4} disabled={$form.processing}>
                {#if $form.processing}
                    <LoaderCircle class="h-4 w-4 animate-spin" />
                {/if}
                Log in
            </Button>
        </div>

        <div class="text-center text-sm text-muted-foreground">
            Don't have an account?
            <TextLink href={route('register')} tabindex={5}>Sign up</TextLink>
        </div>
    </form>
</AuthBase>
