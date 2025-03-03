<script lang="ts">
    import type { Appearance } from '@/hooks/useAppearance.svelte';
    import { useAppearance } from '@/hooks/useAppearance.svelte';
    import { Monitor, Moon, Sun } from 'lucide-svelte';

    interface Props {
        class?: string;
    }

    const appearanceManager = useAppearance();
    // Create a local reactive variable that tracks the hook's value
    let currentAppearance = $state(appearanceManager.appearance);

    // Update the local state when the appearance changes
    function handleUpdateAppearance(value: Appearance) {
        appearanceManager.updateAppearance(value);
        // Immediately update local state to ensure UI reflects the change
        currentAppearance = value;
    }

    const tabs = [
        { value: 'light', Icon: Sun, label: 'Light' },
        { value: 'dark', Icon: Moon, label: 'Dark' },
        { value: 'system', Icon: Monitor, label: 'System' },
    ] as const;

    let { class: className }: Props = $props();
</script>

<div class="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800 {className}">
    {#each tabs as { value, Icon, label } (value)}
        <button
            onclick={() => handleUpdateAppearance(value)}
            class="flex items-center rounded-md px-3.5 py-1.5 transition-colors
            {currentAppearance === value
                ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60'}"
        >
            <Icon class="-ml-1 h-4 w-4" />
            <span class="ml-1.5 text-sm">{label}</span>
        </button>
    {/each}
</div>
