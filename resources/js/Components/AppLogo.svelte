<script lang="ts">
    import AppLogoIcon from '@/components/AppLogoIcon.svelte';

    interface Props {
        class?: string;
    }

    let { class: className }: Props = $props();
</script>

<div class="flex items-center gap-2 {className}">
    <div class="flex aspect-square size-8 items-center justify-center rounded-md bg-sidebar-primary">
        <AppLogoIcon class="size-5 fill-current text-white! dark:text-black!" />
    </div>
    <div class="ml-1 grid flex-1 text-left text-sm">
        <span class="mb-0.5 truncate font-semibold leading-none">Laravel Starter Kit</span>
    </div>
</div>
