<script lang="ts">
    import TextLink from '@/components/TextLink.svelte';
    import { Button } from '@/components/ui/button';
    import AuthLayout from '@/layouts/AuthLayout.svelte';
    import { useForm } from '@inertiajs/svelte';
    import { LoaderCircle } from 'lucide-svelte';

    interface Props {
        status?: string;
    }
    let { status }: Props = $props();

    const form = useForm({});

    const submit = (e: Event) => {
        e.preventDefault();
        $form.post(route('verification.send'));
    };
</script>

<svelte:head>
    <title>Verify Email</title>
</svelte:head>

<AuthLayout title="Verify email" description="Please verify your email address by clicking on the link we just emailed to you.">
    {#if status === 'verification-link-sent'}
        <div class="mb-4 text-center text-sm font-medium text-green-600">
            A new verification link has been sent to the email address you provided during registration.
        </div>
    {/if}

    <form onsubmit={submit} class="space-y-6 text-center">
        <Button type="submit" disabled={$form.processing} variant="secondary">
            {#if $form.processing}
                <LoaderCircle class="h-4 w-4 animate-spin" />
            {/if}
            Resend verification email
        </Button>

        <TextLink href={route('logout')} method="post" as="button" class="mx-auto block text-sm">Log out</TextLink>
    </form>
</AuthLayout>
