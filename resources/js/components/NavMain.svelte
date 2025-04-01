<script lang="ts">
    import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
    import type { NavItem } from '@/types';
    import { Link, page } from '@inertiajs/svelte';

    interface Props {
        items: NavItem[];
    }

    let { items = [] }: Props = $props();
</script>

<SidebarGroup class="px-2 py-0">
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
        {#each items as item (item.title)}
            <SidebarMenuItem>
                <Link href={item.href} class="block w-full">
                    <SidebarMenuButton isActive={item.href === $page.url}>
                        {#snippet tooltipContent()}
                            {item.title}
                        {/snippet}
                        {#if item.icon}
                            {@const Icon = item.icon}
                            <Icon class="h-4 w-4 shrink-0" />
                        {/if}
                        <span>{item.title}</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        {/each}
    </SidebarMenu>
</SidebarGroup>
