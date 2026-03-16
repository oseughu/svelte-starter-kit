<script lang="ts">
	import { Select as SelectPrimitive } from 'bits-ui';

type SelectProps = Omit<SelectPrimitive.RootProps, 'type' | 'value'> & {
	type?: 'single';
	value?: string;
	onValueChange?: (value: string) => void;
};

	let {
		open = $bindable(false),
		value = $bindable(''),
		type = 'single',
		...restProps
	}: SelectProps = $props();
</script>

<SelectPrimitive.Root {type} bind:open bind:value={value as never} {...restProps} />
