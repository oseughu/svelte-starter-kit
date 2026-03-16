<script lang="ts">
    import Monitor from 'lucide-svelte/icons/monitor';
    import Moon from 'lucide-svelte/icons/moon';
    import Sun from 'lucide-svelte/icons/sun';
    import type { Component, SvelteComponent } from 'svelte';
    import { themeState } from '@/lib/theme.svelte';
    import type { Appearance } from '@/types';

    const { appearance, updateAppearance } = themeState();

    type IconComponent =
        | Component<{ class?: string }>
        | (new (...args: any[]) => SvelteComponent<{ class?: string }>);

    const tabs: { value: Appearance; Icon: IconComponent; label: string }[] = [
        { value: 'light', Icon: Sun, label: 'Light' },
        { value: 'dark', Icon: Moon, label: 'Dark' },
        { value: 'system', Icon: Monitor, label: 'System' },
    ];

    function handleAppearanceChange(value: Appearance) {
        updateAppearance(value);
    }
</script>

<div
    class="inline-flex gap-1 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-800"
>
    {#each tabs as { value, Icon, label } (value)}
        <button
            onclick={() => handleAppearanceChange(value)}
            class="flex items-center rounded-md px-3.5 py-1.5 transition-colors {appearance.value ===
            value
                ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60'}"
        >
            <Icon class="-ml-1 h-4 w-4" />
            <span class="ml-1.5 text-sm">{label}</span>
        </button>
    {/each}
</div>
