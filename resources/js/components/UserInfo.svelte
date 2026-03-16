<script lang="ts">
    import {
        Avatar,
        AvatarFallback,
        AvatarImage,
    } from '@/components/ui/avatar';
    import { getInitials } from '@/lib/initials';
    import type { User } from '@/types';

    let {
        user,
        showEmail = false,
    }: {
        user: User;
        showEmail?: boolean;
    } = $props();

    const showAvatar = $derived(user.avatar && user.avatar !== '');
</script>

<Avatar class="h-8 w-8 overflow-hidden rounded-lg">
    {#if showAvatar}
        <AvatarImage src={user.avatar!} alt={user.name} />
    {/if}
    <AvatarFallback class="rounded-lg text-black dark:text-white">
        {getInitials(user.name)}
    </AvatarFallback>
</Avatar>

<div class="grid flex-1 text-left text-sm leading-tight">
    <span class="truncate font-medium">{user.name}</span>
    {#if showEmail}
        <span class="truncate text-xs text-muted-foreground">{user.email}</span>
    {/if}
</div>
