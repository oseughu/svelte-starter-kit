<script lang="ts">
    import { Form } from '@inertiajs/svelte';
    import Heading from '@/components/Heading.svelte';
    import { Button } from '@/components/ui/button';
    import {
        Dialog,
        DialogClose,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogTitle,
        DialogTrigger,
    } from '@/components/ui/dialog';
</script>

<div class="space-y-6">
    <Heading
        variant="small"
        title="Delete account"
        description="Delete your account and all of its resources"
    />
    <div
        class="space-y-4 rounded-lg border border-red-100 bg-red-50 p-4 dark:border-red-200/10 dark:bg-red-700/10"
    >
        <div class="relative space-y-0.5 text-red-600 dark:text-red-100">
            <p class="font-medium">Warning</p>
            <p class="text-sm">
                Please proceed with caution, this cannot be undone.
            </p>
        </div>
        <Dialog>
            <DialogTrigger>
                <Button variant="destructive" data-test="delete-user-button"
                    >Delete account</Button
                >
            </DialogTrigger>
            <DialogContent>
                <Form
                    method="delete" action={route('profile.destroy')}
                    class="space-y-6"
                    options={{ preserveScroll: true }}
                >
                    {#snippet children({ processing, resetAndClearErrors })}
                        <div class="space-y-3">
                            <DialogTitle
                                >Are you sure you want to delete your account?</DialogTitle
                            >
                            <DialogDescription>
                                Once your account is deleted, all of its
                                resources and data will also be permanently
                                deleted. Please confirm you would like to
                                permanently delete your account.
                            </DialogDescription>
                        </div>

                        <DialogFooter class="gap-2">
                            <DialogClose>
                                <Button
                                    variant="secondary"
                                    onclick={() => resetAndClearErrors()}
                                >
                                    Cancel
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                variant="destructive"
                                disabled={processing}
                                data-test="confirm-delete-user-button"
                            >
                                Delete account
                            </Button>
                        </DialogFooter>
                    {/snippet}
                </Form>
            </DialogContent>
        </Dialog>
    </div>
</div>
