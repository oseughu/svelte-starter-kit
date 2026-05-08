<script module lang="ts">
    export const layout = {
        title: 'Verify email',
        description:
            'Please verify your email address by clicking on the link we just emailed to you.',
    };
</script>

<script lang="ts">
    import { Form } from '@inertiajs/svelte';
    import AppHead from '@/components/AppHead.svelte';
    import TextLink from '@/components/TextLink.svelte';
    import { Button } from '@/components/ui/button';
    import { Spinner } from '@/components/ui/spinner';
    import { logout } from '@/routes';
    import { send } from '@/routes/verification';

    let {
        status = '',
    }: {
        status?: string;
    } = $props();
</script>

<AppHead title="Email verification" />

{#if status === 'verification-link-sent'}
    <div class="mb-4 text-center text-sm font-medium text-green-600">
        A new verification link has been sent to the email address you provided
        during registration.
    </div>
{/if}

<Form {...send.form()} class="space-y-6 text-center">
    {#snippet children({ processing })}
        <Button type="submit" disabled={processing} variant="secondary">
            {#if processing}<Spinner />{/if}
            Resend verification email
        </Button>

        <TextLink href={logout()} as="button" class="mx-auto block text-sm">
            Log out
        </TextLink>
    {/snippet}
</Form>
