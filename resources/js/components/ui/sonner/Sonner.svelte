<script lang="ts">
    import { themeState } from '@/lib/theme.svelte';
    import { Toaster as SonnerPrimitive, type ToasterProps } from 'svelte-sonner';

    let { ...restProps }: ToasterProps = $props();

    const { appearance } = themeState();
</script>

<SonnerPrimitive
    theme={appearance.value}
    class="toaster group"
    position="bottom-right"
    style="--normal-bg: var(--popover); --normal-text: var(--popover-foreground); --normal-border: var(--border);"
    {...restProps}
/>
