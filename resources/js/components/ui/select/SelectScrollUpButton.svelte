<script lang="ts">
	import ChevronUpIcon from 'lucide-svelte/icons/chevron-up';
	import { Select as SelectPrimitive } from 'bits-ui';
	import { cn } from '@/lib/utils';
	import type { ComponentProps } from 'svelte';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: ComponentProps<typeof SelectPrimitive.ScrollUpButton> = $props();
</script>

<SelectPrimitive.ScrollUpButton
	bind:ref
	data-slot="select-scroll-up-button"
	class={cn("flex cursor-default items-center justify-center py-1", className)}
	{...restProps}
>
	<ChevronUpIcon class="size-4" />
</SelectPrimitive.ScrollUpButton>
