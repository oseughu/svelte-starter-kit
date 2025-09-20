<script lang="ts">
    import { SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
    import type { NavItem } from '@/types';
    import { Link } from '@inertiajs/svelte';

    interface Props {
        items: NavItem[];
        class?: string;
    }

    let { items, class: className }: Props = $props();
</script>

<SidebarGroup class="group-data-[collapsible=icon]:p-0 {className}">
    <SidebarGroupContent>
        <SidebarMenu>
            {#each items as item, index (index)}
                <SidebarMenuItem>
                    <SidebarMenuButton class="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-neutral-100">
                        <Link href={item.href} target="_blank" rel="noopener noreferrer" class="block w-full">
                            <div class="flex items-center gap-2 w-full">
                                {#if item.icon}
                                    {@const Icon = item.icon}
                                    <Icon class="h-4 w-4 shrink-0" />
                                {/if}
                                <span>{item.title}</span>
                            </div>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            {/each}
        </SidebarMenu>
    </SidebarGroupContent>
</SidebarGroup>
