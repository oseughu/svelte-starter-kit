<script lang="ts">
    import Eye from 'lucide-svelte/icons/eye';
    import EyeOff from 'lucide-svelte/icons/eye-off';
    import { Input } from '@/components/ui/input';
    import { cn } from '@/lib/utils';

    let { class: className = '', ...rest } = $props();

    let showPassword = $state(false);
</script>

<div class="relative">
    <Input
        type={showPassword ? 'text' : 'password'}
        class={cn('pr-10', className)}
        {...rest}
    />
    <button
        type="button"
        onclick={() => (showPassword = !showPassword)}
        class="text-muted-foreground hover:text-foreground focus-visible:ring-ring absolute inset-y-0 right-0 flex items-center rounded-r-md px-3 focus-visible:outline-none focus-visible:ring-[3px]"
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        tabindex={-1}
    >
        {#if showPassword}
            <EyeOff class="size-4" />
        {:else}
            <Eye class="size-4" />
        {/if}
    </button>
</div>
