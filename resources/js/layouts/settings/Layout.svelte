<script lang="ts">
    import Heading from '@/components/Heading.svelte';
    import { Button } from '@/components/ui/button';
    import { Separator } from '@/components/ui/separator';
    import { cn } from '@/lib/utils';
    import { type NavItem } from '@/types';
    import { Link, page } from '@inertiajs/svelte';
    import type { Snippet } from 'svelte';

    const sidebarNavItems: NavItem[] = [
        {
            title: 'Profile',
            href: '/settings/profile',
        },
        {
            title: 'Password',
            href: '/settings/password',
        },
        {
            title: 'Appearance',
            href: '/settings/appearance',
        },
    ];

    const currentPath = $page.props.ziggy?.location ? new URL($page.props.ziggy.location).pathname : '';

    interface Props {
        children?: Snippet;
    }

    let { children }: Props = $props();
</script>

<div class="px-4 py-6">
    <Heading title="Settings" description="Manage your profile and account settings" />

    <div class="flex flex-col lg:flex-row lg:space-x-12">
        <aside class="w-full max-w-xl lg:w-48">
            <nav class="flex flex-col space-x-0 space-y-1">
                {#each sidebarNavItems as item (item.href)}
                    <Link href={item.href}>
                        <Button
                            variant="ghost"
                            class={cn('w-full justify-start', {
                                'bg-muted': currentPath === item.href,
                            })}
                        >
                            {item.title}
                        </Button>
                    </Link>
                {/each}
            </nav>
        </aside>

        <Separator class="my-6 lg:hidden" />

        <div class="flex-1 md:max-w-2xl">
            <section class="max-w-xl space-y-12">
                {@render children?.()}
            </section>
        </div>
    </div>
</div>
