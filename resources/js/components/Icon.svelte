<script lang="ts">
    import * as icons from 'lucide-svelte';

    interface Props {
        name: string;
        class?: string;
        size?: number | string;
        color?: string;
        strokeWidth?: number | string;
    }

    let { name, class: className, size = 16, color, strokeWidth = 2 }: Props = $props();

    const Component = $derived(() => {
        const iconName = name.charAt(0).toUpperCase() + name.slice(1);
        return (icons as Record<string, any>)[iconName];
    });

    const styles = $derived(['h-4 w-4', className]);
</script>

<Component class={styles} {size} {color} {strokeWidth} />
