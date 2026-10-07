<script lang="ts">
    import { page } from '@inertiajs/svelte';
    import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
    import {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuTrigger,
    } from '@/components/ui/dropdown-menu';
    import {
        SidebarMenu,
        SidebarMenuButton,
        SidebarMenuItem,
        useSidebar,
    } from '@/components/ui/sidebar';
    import UserInfo from '@/components/UserInfo.svelte';
    import UserMenuContent from '@/components/UserMenuContent.svelte';

    const user = $derived(page.props.auth.user);
    const sidebar = useSidebar();
</script>

{#if user}
    <SidebarMenu>
        <SidebarMenuItem>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    {#snippet child({ props })}
                        <SidebarMenuButton
                            {...props}
                            size="lg"
                            class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                            data-test="sidebar-menu-button"
                        >
                            <UserInfo {user} />
                            <ChevronsUpDown class="ml-auto size-4" />
                        </SidebarMenuButton>
                    {/snippet}
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    class="w-full min-w-0 rounded-lg"
                    side={sidebar.state === 'collapsed' && !sidebar.isMobile
                        ? 'left'
                        : 'top'}
                    align="end"
                    sideOffset={4}
                >
                    <UserMenuContent {user} />
                </DropdownMenuContent>
            </DropdownMenu>
        </SidebarMenuItem>
    </SidebarMenu>
{/if}
