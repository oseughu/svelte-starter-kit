import { Tooltip as TooltipPrimitive } from 'bits-ui';

import TooltipContent from './TooltipContent.svelte';

const Tooltip = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;
const TooltipProvider = TooltipPrimitive.Provider;

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };
