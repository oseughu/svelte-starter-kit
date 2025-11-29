import { qrCode, recoveryCodes, secretKey } from '@/routes/two-factor';

interface TwoFactorSetupData {
    svg: string;
    url: string;
}

interface TwoFactorSecretKey {
    secretKey: string;
}

export const OTP_MAX_LENGTH = 6;

const fetchJson = async <T>(url: string): Promise<T> => {
    const response = await fetch(url, {
        headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch: ${response.status}`);
    }

    return response.json();
};

export function useTwoFactorAuth() {
    let qrCodeSvg = $state<string | null>(null);
    let manualSetupKey = $state<string | null>(null);
    let recoveryCodesList = $state<string[]>([]);
    let errors = $state<string[]>([]);

    const hasSetupData = $derived(qrCodeSvg !== null && manualSetupKey !== null);

    async function fetchQrCode(): Promise<void> {
        try {
            const { svg } = await fetchJson<TwoFactorSetupData>(qrCode.url());
            qrCodeSvg = svg;
        } catch {
            errors = [...errors, 'Failed to fetch QR code'];
            qrCodeSvg = null;
        }
    }

    async function fetchSetupKey(): Promise<void> {
        try {
            const { secretKey: key } = await fetchJson<TwoFactorSecretKey>(
                secretKey.url(),
            );
            manualSetupKey = key;
        } catch {
            errors = [...errors, 'Failed to fetch a setup key'];
            manualSetupKey = null;
        }
    }

    function clearErrors(): void {
        errors = [];
    }

    function clearSetupData(): void {
        manualSetupKey = null;
        qrCodeSvg = null;
        clearErrors();
    }

    async function fetchRecoveryCodesFn(): Promise<void> {
        try {
            clearErrors();
            const codes = await fetchJson<string[]>(recoveryCodes.url());
            recoveryCodesList = codes;
        } catch {
            errors = [...errors, 'Failed to fetch recovery codes'];
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
        get qrCodeSvg() {
            return qrCodeSvg;
        },
        get manualSetupKey() {
            return manualSetupKey;
        },
        get recoveryCodesList() {
            return recoveryCodesList;
        },
        get hasSetupData() {
            return hasSetupData;
        },
        get errors() {
            return errors;
        },
        clearErrors,
        clearSetupData,
        fetchQrCode,
        fetchSetupKey,
        fetchSetupData,
        fetchRecoveryCodes: fetchRecoveryCodesFn,
    };
}
