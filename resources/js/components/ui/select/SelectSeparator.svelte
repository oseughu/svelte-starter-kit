<script lang="ts">
	import { Separator } from '@/components/ui/separator';
	import { cn } from '@/lib/utils';
	import type { ComponentProps } from 'svelte';

	let {
		class: className,
		...restProps
	}: ComponentProps<typeof Separator> = $props();
</script>

<Separator
	data-slot="select-separator"
	class={cn("bg-border pointer-events-none -mx-1 my-1 h-px", className)}
	{...restProps}
/>
