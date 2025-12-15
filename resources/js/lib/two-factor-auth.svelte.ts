const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    return response.json();
};

export function createTwoFactorAuth() {
    let errors = $state<string[]>([]);
    let manualSetupKey = $state<string | null>(null);
    let qrCodeSvg = $state<string | null>(null);
    let recoveryCodesList = $state<string[]>([]);

    const hasSetupData = $derived(qrCodeSvg !== null && manualSetupKey !== null);

    async function fetchQrCode(): Promise<void> {
        try {
            const { svg } = await fetchJson<{ svg: string; url: string }>(
                route('two-factor.qr-code')
            );

            qrCodeSvg = svg;
        } catch {
            errors.push('Failed to fetch QR code');
            qrCodeSvg = null;
        }
    }

    async function fetchSetupKey(): Promise<void> {
        try {
            const { secretKey: key } = await fetchJson<{ secretKey: string }>(
                route('two-factor.secret-key')
            );

            manualSetupKey = key;
        } catch {
            errors.push('Failed to fetch a setup key');
            manualSetupKey = null;
        }
    }

    function clearSetupData(): void {
        manualSetupKey = null;
        qrCodeSvg = null;
        clearErrors();
    }

    function clearErrors(): void {
        errors = [];
    }

    function clearTwoFactorAuthData(): void {
        clearSetupData();
        clearErrors();
        recoveryCodesList = [];
    }

    async function fetchRecoveryCodes(): Promise<void> {
        try {
            clearErrors();
            recoveryCodesList = await fetchJson<string[]>(
                route('two-factor.recovery-codes')
            );
        } catch {
            errors.push('Failed to fetch recovery codes');
            recoveryCodesList = [];
        }
    }

    async function fetchSetupData(): Promise<void> {
        try {
            clearErrors();
            await Promise.all([fetchQrCode(), fetchSetupKey()]);
        } catch {
            qrCodeSvg = null;
            manualSetupKey = null;
        }
    }

    return {
        get errors() { return errors; },
        get manualSetupKey() { return manualSetupKey; },
        get qrCodeSvg() { return qrCodeSvg; },
        get recoveryCodesList() { return recoveryCodesList; },
        get hasSetupData() { return hasSetupData; },
        clearSetupData,
        clearErrors,
        clearTwoFactorAuthData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes,
    };
}