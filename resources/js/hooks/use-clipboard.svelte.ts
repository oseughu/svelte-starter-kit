// Credit: https://usehooks-ts.com/

type CopiedValue = string | null;

export function useClipboard() {
    let copiedText = $state<CopiedValue>(null);

    async function copy(text: string): Promise<boolean> {
        if (!navigator?.clipboard) {
            console.warn('Clipboard not supported');
            return false;
        }

        try {
            await navigator.clipboard.writeText(text);
            copiedText = text;
            return true;
        } catch (error) {
            console.warn('Copy failed', error);
            copiedText = null;
            return false;
        }
    }

    return {
        get copiedText() {
            return copiedText;
        },
        copy,
    };
}
