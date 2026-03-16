<script lang="ts">
    import { page } from '@inertiajs/svelte';
    import ChevronsUpDown from 'lucide-svelte/icons/chevrons-up-down';
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

    const user = $derived($page.props.auth.user);
    const { isMobile, state: sidebarState } = useSidebar();
</script>

<SidebarMenu>
    <SidebarMenuItem>
        <DropdownMenu class="w-full">
            <DropdownMenuTrigger asChild>
                {#snippet children(props)}
                    <SidebarMenuButton
                        size="lg"
                        class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        data-test="sidebar-menu-button"
                        onclick={props.onclick}
                        aria-expanded={props['aria-expanded']}
                        data-state={props['data-state']}
                    >
                        <UserInfo {user} />
                        <ChevronsUpDown class="ml-auto size-4" />
                    </SidebarMenuButton>
                {/snippet}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                class="w-full min-w-0 rounded-lg"
                side={$sidebarState === 'collapsed' && !$isMobile
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
