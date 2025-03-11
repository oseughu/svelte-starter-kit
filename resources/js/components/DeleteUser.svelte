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
    import { useForm } from '@inertiajs/svelte';

    let passwordInput = $state(null as unknown as HTMLInputElement);

    const form = useForm({
        password: '',
    });

    const deleteUser = (e: Event) => {
        e.preventDefault();

        $form.delete(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput?.focus(),
            onFinish: () => $form.reset(),
        });
    };

    const closeModal = () => {
        $form.clearErrors();
        $form.reset();
    };
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
                <form class="space-y-6" onsubmit={deleteUser}>
                    <DialogHeader class="space-y-3">
                        <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                        <DialogDescription>
                            Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password
                            to confirm you would like to permanently delete your account.
                        </DialogDescription>
                    </DialogHeader>

                    <div class="grid gap-2">
                        <Label for="password" class="sr-only">Password</Label>
                        <Input id="password" type="password" name="password" ref={passwordInput} bind:value={$form.password} placeholder="Password" />
                        <InputError message={$form.errors.password} />
                    </div>

                    <DialogFooter class="gap-2">
                        <DialogClose>
                            <Button variant="secondary" onclick={closeModal}>Cancel</Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={$form.processing}>
                            <button type="submit">Delete account</button>
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </div>
</div>
