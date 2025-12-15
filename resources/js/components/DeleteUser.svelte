<script lang="ts">
    import HeadingSmall from '@/components/HeadingSmall.svelte';
    import InputError from '@/components/InputError.svelte';
    import { Button } from '@/components/ui/button';
    import {
        Dialog,
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
    } from '@/components/ui/dialog';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Form } from '@inertiajs/svelte';

    let passwordInput: HTMLInputElement | undefined;
</script>

<div class="space-y-6">
    <HeadingSmall title="Delete account" description="Delete your account and all of its resources" />
    <div class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10">
        <div class="relative space-y-0.5 text-red-600 dark:text-red-100">
            <p class="font-medium">Warning</p>
            <p class="text-sm">Please proceed with caution, this cannot be undone.</p>
        </div>
        <Dialog>
            <DialogTrigger>
                <Button variant="destructive">Delete account</Button>
            </DialogTrigger>
            <DialogContent>
                <Form
                    method="delete"
                    action={route('profile.destroy')}
                    class="space-y-6"
                    resetOnSuccess
                    onError={(errors) => {
                        if (errors.password) {
                            passwordInput?.focus();
                        }
                    }}
                >
                    {#snippet children({
                        errors,
                        processing,
                        reset,
                        clearErrors,
                    }: {
                        errors: Record<string, string>;
                        processing: boolean;
                        reset: () => void;
                        clearErrors: () => void;
                    })}
                        <DialogHeader class="space-y-3">
                            <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                            <DialogDescription>
                                Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your
                                password to confirm you would like to permanently delete your account.
                            </DialogDescription>
                        </DialogHeader>

                        <div class="grid gap-2">
                            <Label for="password" class="sr-only">Password</Label>
                            <Input id="password" type="password" name="password" bind:ref={passwordInput} placeholder="Password" />
                            <InputError message={errors.password} />
                        </div>

                        <DialogFooter class="gap-2">
                            <DialogClose>
                                <Button
                                    variant="secondary"
                                    onclick={() => {
                                        clearErrors();
                                        reset();
                                    }}>Cancel</Button
                                >
                            </DialogClose>

                            <Button type="submit" variant="destructive" disabled={processing}>Delete account</Button>
                        </DialogFooter>
                    {/snippet}
                </Form>
            </DialogContent>
        </Dialog>
    </div>
</div>
